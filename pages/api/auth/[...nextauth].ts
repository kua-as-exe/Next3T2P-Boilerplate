import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt'

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@db/prisma";
import { exclude } from "lib/utils/helpers";

const WithEnv = <T extends any, ENV extends string>(env: ENV[], callback: (env: { [k in ENV]: string }) => T) => env.map(key => process.env[key]).includes(undefined) ? [] : [callback(process.env as any)]

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
  return new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, function(err, res) {
      resolve(res);
    });
  })
}

const prisma = new PrismaClient();
export default NextAuth({

  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production'
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production' ? true : false
      }
    },
  },
  providers: [
    ...WithEnv(["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
      ({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }) => GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      })),

    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log(credentials)

        try {
          if (credentials == null) return null;

          const user = await db.user.findFirst({
            where: {
              username: credentials?.username
            }
          });

          if (user == null) {
            console.log("User not found")
            return null;
          }
          if (user.password === null) {
            console.log("User dont have password")
            return null;
          }

          const res = await confirmPasswordHash(credentials?.password, user.password);

          if (res === false) {
            console.log("Hash not matched logging in");
            return null;
          }
          console.log(user)
          return user

        }
        catch (err) {
          console.log("Authorize error:", err);
          return null;
        }

      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  events: {
    async signIn(message) { /* on successful sign in */ },
    async signOut(message) { /* on signout */ },
    async createUser(message) { /* user created */ },
    async updateUser(message) { /* user updated - e.g. their email was verified */ },
    async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    async session(message) { /* session is active */ },
  }
});
