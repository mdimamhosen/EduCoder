import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { User as UserType, DefaultSession } from "next-auth";
import DatabaseConnection from "@/lib/DBconnect";

// Type declarations
declare module "next-auth" {
  interface User {
    _id?: string;
    token?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accountType?: string;
  }

  interface Session {
    user: {
      _id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      accountType?: string;
      isVerified?: boolean;
      token?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accountType?: string;
    // Add any other properties you may need
  }
}

async function login(
  email: string,
  password: string
): Promise<UserType | null> {
  console.log("login function");
  console.log("email: ", email);
  console.log("password: ", password);
  await DatabaseConnection();
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User is not registered. Please sign up.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password.");
    }

    user.password = undefined; // Prevent password from being returned

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials): Promise<UserType | null> {
        if (!credentials) return null;
        console.log(credentials);
        const user = await login(credentials.email, credentials.password);
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: UserType }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accountType = user.accountType;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (session.user) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.accountType = token.accountType;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
