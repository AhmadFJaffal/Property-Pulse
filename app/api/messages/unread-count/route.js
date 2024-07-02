import connectDB from "@/config/db";
import Message from "@/models/message.model";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async (req) => {
  try {
    await connectDB();

    const sender = await getSessionUser();

    if (!sender) {
      return new Response(JSON.stringify({ message: "User not defined" }), {
        status: 401,
      });
    }

    const { userId } = sender;

    const unreadCount = await Message.countDocuments({
      recepient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadCount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching unread messages count:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
