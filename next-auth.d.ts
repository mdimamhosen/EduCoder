// types/next-auth.d.ts
import "next-auth";

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
    isVerified?: boolean;
    token?: string;
  }
}
