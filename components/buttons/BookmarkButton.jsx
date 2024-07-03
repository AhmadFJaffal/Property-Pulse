"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmark = async () => {
      try {
        const response = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsBookmarked(data.isBookmarked);
        } else {
          toast.error("An error occurred");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    checkBookmark();
  }, [property._id]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please sign in to bookmark this property");
      return;
    }
    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <button className="bg-gray-300 text-gray-700 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        Loading...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
      </button>
    </>
  );
};

export default BookmarkButton;
