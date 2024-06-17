import connectDB from "@/config/db";
import Property from "@/models/property.model";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    console.log(properties);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Error", { status: 500 });
  }
};
