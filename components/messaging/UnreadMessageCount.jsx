"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context/GlobalContext";

const UnreadMessageCount = () => {
  const { data: session } = useSession();
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch("/api/messages/unread-count");
        const data = await response.json();
        if (response.ok) {
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchUnreadMessages();
  }, [session]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
