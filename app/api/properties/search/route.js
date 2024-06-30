import connectDB from "@/config/db";
import Property from "@/models/property.model";

// GET /api/properties/search
export const GET = async (req) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    // Match any of the following fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: propertyType },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for propertyType if it's not "All"
    if (propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return {
      status: 500,
      data: { message: "Internal Server Error" },
    };
  }
};
