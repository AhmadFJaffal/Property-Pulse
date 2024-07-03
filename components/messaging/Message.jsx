"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (response.ok) {
        const { read } = data;
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        read
          ? toast.success("Message marked as read")
          : toast.success("Message marked as new");
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("An error occurred");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message deleted");
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("An error occurred");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        {!isRead ? (
          <span className="bg-yellow-500 text-white absolute top-2 right-2 px-2 py-1 rounded-md">
            New
          </span>
        ) : null}
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString("en-US", {
            weekday: "long", // "Monday"
            year: "numeric", // "2023"
            month: "long", // "July"
            day: "numeric", // "20"
            hour: "2-digit", // "05"
            minute: "2-digit", // "35"
            hour12: true, // use AM/PM
          })}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        }  py-1 px-3 rounded-md`}
        onClick={handleReadClick}
      >
        {isRead ? "Mark Unread" : "Mark Read"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
