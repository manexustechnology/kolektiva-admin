import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ account, profile }: any) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
        return true;
      }
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@manexus.xyz");
      }
      return true;
    },
  },
};
