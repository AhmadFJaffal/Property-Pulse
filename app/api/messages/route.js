import connectDB from "@/config/db";
import Message from "@/models/message.model";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages

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

    const readMessages = await Message.find({
      recepient: userId,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recepient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

// POST /api/messages
export const POST = async (req) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recepient } =
      await req.json();
    const sender = await getSessionUser();

    if (!sender) {
      return new Response(JSON.stringify({ message: "User not defined" }), {
        status: 401,
      });
    }

    const { user } = sender;

    // cant send message to self
    if (user.id === recepient) {
      return new Response(
        JSON.stringify({ message: "Cannot send message to self" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recepient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
