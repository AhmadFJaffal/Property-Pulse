import connectDB from "@/config/db";
import Property from "@/models/property.model";

// GET /api/properties
export const GET = async (req) => {
  try {
    await connectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Error", { status: 500 });
  }
};
