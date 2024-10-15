import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import DatabaseConnection from "@/lib/DBconnect";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accountType?: string;
  }

  interface Session extends DefaultSession {
    user: {
      _id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      accountType?: string;
      token?: string;
    };
  }

  interface JWT {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accountType?: string;
  }
}

async function login(email: string, password: string) {
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

// NextAuth options
export const authOptions: NextAuthOptions = {
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
      async authorize(credentials) {
        if (!credentials) return null;
        console.log(credentials);
        const user = await login(credentials.email, credentials.password);
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accountType = user.accountType;
      }
      return token;
    },
    async session({ session, token }) {
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

// Export NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
