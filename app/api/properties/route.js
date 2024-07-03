import connectDB from "@/config/db";
import Property from "@/models/property.model";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (req) => {
  try {
    await connectDB();

    const page = req.nextUrl.searchParams.get("page") || 1;
    const pageSize = req.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize;

    const totalProperties = await Property.countDocuments({});

    const properties = await Property.find({})
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const results = {
      properties,
      totalProperties,
    };

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Error", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = sessionUser.userId;

    // Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly."),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Upload images to Cloudinary
    const imagePromises = images.map(async (image) => {
      const imageBuffer = await image.arrayBuffer();
      const imageBase64 = Buffer.from(new Uint8Array(imageBuffer)).toString(
        "base64"
      );
      // Upload to Cloudinary and return the promise
      return cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-pulse",
        }
      );
    });

    // Wait for all images to upload
    const uploadedImages = await Promise.all(imagePromises);
    // Extract `secure_url` from each upload result and assign to propertyData.images
    propertyData.images = uploadedImages.map(
      (uploadResult) => uploadResult.secure_url
    );

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.log(error);

    return new Response("Error", { status: 500 });
  }
};
