import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
  callbacks: {
    // on successfull sign in
    async signIn({ profile }) {
      await connectDB();
      console.log("profile is", profile);
      const user = await User.findOne({ email: profile.email });
      if (!user) {
        const username = profile.name.slice(0, 20);
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }
      return true;
    },
    // modifies session object
    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
};
