import connectDB from "@/config/db";
import Property from "@/models/property.model";

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("user id is required", { status: 400 });
    }

    const properties = await Property.find({
      owner: userId,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Error", { status: 500 });
  }
};
