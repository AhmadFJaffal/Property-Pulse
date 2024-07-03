"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../general_utils/Spinner";
import Message from "@/components/messaging/Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        const data = await response.json();
        if (response.ok) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>No messages</p>
            ) : (
              messages.map((message) => {
                return <Message key={message._id} message={message} />;
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
