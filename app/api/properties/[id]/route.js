import connectDB from "@/config/db";
import Property from "@/models/property.model";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);
    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }
    console.log(property);

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Error", { status: 500 });
  }
};
