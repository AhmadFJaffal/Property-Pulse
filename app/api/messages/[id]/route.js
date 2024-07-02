import connectDB from "@/config/db";
import Message from "@/models/message.model";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/[id]
export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sender = await getSessionUser();

    if (!sender) {
      return new Response(JSON.stringify({ message: "User not defined" }), {
        status: 401,
      });
    }

    const { userId } = sender;

    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }

    if (message.recepient.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    message.read = !message.read;
    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error("Error updating message:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};

// DELETE /api/messages/[id]
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sender = await getSessionUser();

    if (!sender) {
      return new Response(JSON.stringify({ message: "User not defined" }), {
        status: 401,
      });
    }

    const { userId } = sender;

    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }

    if (message.recepient.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await message.deleteOne();

    return new Response(JSON.stringify({ message: "Message deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
