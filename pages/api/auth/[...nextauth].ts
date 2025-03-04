import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/prisma/db";
import nodemailer from "nodemailer";

const authOptions: AuthOptions = {
  pages: { signIn: "/signIn", error: "/signin" },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT
          ? parseInt(process.env.EMAIL_SERVER_PORT)
          : undefined,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const subject = "Activate Your Account for Kridar-Paints";

        const transporter = nodemailer.createTransport(provider.server);
        await transporter.sendMail({
          from: provider.from as string,
          to: identifier,
          subject,
          html: `
                <div style="text-align: center; padding: 20px;">
                  <h2>Welcome to Our App</h2>
                  <p>Click the button below to log in:</p>
                  <a href="${url}" style="background: #0070f3; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px;">
                    Log in
                  </a>
                  <p>If you didn't request this, please ignore this email.</p>
                </div>
              `,
        });
      },
    }),
  ],
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code, metadata) {
      console.debug("NextAuth Debug:", code, metadata);
    },
  },
  callbacks: {
    async jwt({ token, user }) {
     console.log("JWT Callback Running! Token:", token, "User:", user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      console.log("Updated JWT Token:", token);
      return token;
    },

    async session({ session, token }: any) {
      console.log("Session Callback Running! Token:", token);

      if (token?.id) {
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXT_PUBLIC_ENV === "development",
};

export default NextAuth(authOptions);
export const getAuthSession = () => {
    return getServerSession(authOptions);
  };
