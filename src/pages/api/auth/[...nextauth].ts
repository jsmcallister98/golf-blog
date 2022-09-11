import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Email from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import nodemailer from "nodemailer";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: "Iv1.d3e2d93219b1fce5",
      clientSecret: "80f2323a052104168f86702a9f7977a97c10f1cf",
    }),
    Email({
      server: {
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
        auth: {
          user: "apikey",
          pass: "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",
        },
      },
      from: "jakemcallister@outlook.com",
      maxAge: 5 * 60,
      generateVerificationToken: async () => {
        // const token = await generateAuthtoken();
        const token = "123459";
        return token;
      },
      sendVerificationRequest: ({
        identifier: email,
        url,
        token,
        provider,
      }) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          // Strip protocol from URL and use domain as site name
          // const site = baseUrl.replace(/^https?:\/\//, '');
          const site = "example.com";
          console.log(`email: ${email}`);
          console.log(`url: ${url}`);
          console.log(`token: ${token}`);
          console.log(`provider: ${provider}`);

          nodemailer.createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Authentication code: ${token}`,
              text: `Authentication code: ${token}`,
              // text: text({ url, site, email, token }),
              // html: html({ url, site, email, token }),
            },
            (error) => {
              if (error) {
                // logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error);
                console.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
                return reject(
                  new Error(`SEND_VERIFICATION_EMAIL_ERROR ${error}`)
                );
              }
              return resolve();
            }
          );
        });
      },
    }),
    // ...add more providers here
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     name: {
    //       label: "Name",
    //       type: "text",
    //       placeholder: "Enter your name",
    //     },
    //   },
    //   async authorize(credentials, _req) {
    //     const user = { id: 1, name: credentials?.name ?? "J Smith" };
    //     return user;
    //   },
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
