import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			if (session.user) {
				const sessionUser = await User.findOne({ email: session.user.email });
				session.user.id = sessionUser._id.toString();
				return session;
			}
			return null;
		},
		async signIn({ profile }) {
			try {
				await connectDB();

				// check if a user already exists
				const userExists = await User.findOne({ email: profile.email });

				// if not, create a user
				if (!userExists) {
					const newUser = new User({
						email: profile.email,
						username: profile.name.replaceAll(/\s/g, "").toLowerCase(),
						image: profile.picture,
					});
					await newUser.save();
				}

				return true;
			} catch (err) {
				console.log(err.message);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
