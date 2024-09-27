import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import User from "./models/User";
import { compare } from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import DatabaseConnection from "./lib/DBconnect";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Please enter your email and password");
        }

        // Connect to the database
        await DatabaseConnection();

        // Find the user by email
        const user = await User.findOne({ email }).select("+password +role");

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Compare passwords
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Return user data to be included in the JWT/session
        return {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/register",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({
              email,
              firstName: name,
              image,
              authProviderId: id,
            });
          }
          return true;
        } catch (error) {
          throw new Error("Google sign in failed" + error);
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
