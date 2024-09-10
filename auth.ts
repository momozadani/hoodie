import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { ADMIN_ROLE } from "./app/lib/data";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  callbacks: {
    jwt({ token }) {
      console.log("this is token ", token);
      if (ADMIN_ROLE.includes(token.email?.toLowerCase() || "")) {
        token.role = "admin";
        return token;
      }
      token.role = "user";
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role!;
      session.user.image = "https://xsgames.co/randomusers/avatar.php?g=pixel";
      return session;
    },
  },
});
