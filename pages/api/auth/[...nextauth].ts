import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/prisma/db";
import GoogleProvider from "next-auth/providers/google";
import { getGoogleCredentials } from "@/lib/utils";

const authOptions: AuthOptions = {
  pages: { 
    signIn: "/signIn", 
    error: "/signin" 
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // If it's a new sign in, add additional information
      if (account && profile) {
        try {
          // Try to find or create user
          let db_user = await db.user.findUnique({
            where: { email: profile.email },
          });

          if (!db_user) {
            db_user = await db.user.create({
              data: {
                email: profile.email as string,
              }
            });
          }

          // Update token with user information
          token.id = db_user.id;
          token.name = db_user.name;
          token.picture = db_user.image;
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }

      return token;
    },
    async session({ session, token }:any) {
        console.log("sessionssss", session);
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  events: {
    async signIn(message) {
      console.log("Sign in successful", message);
    },
    async session(message) {
      console.log("Session created", message);
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXT_PUBLIC_ENV === "development",
};

export default NextAuth(authOptions);
export const getAuthSession = () => getServerSession(authOptions);