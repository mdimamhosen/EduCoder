import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    _id?: string;
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
