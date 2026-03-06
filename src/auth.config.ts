import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe NextAuth configuration.
 * This file must NOT import Prisma, bcrypt, or any Node-only modules
 * so it can be consumed by the Edge Middleware.
 */
export const authConfig = {
  pages: {
    signIn: "/portal/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPortal = nextUrl.pathname.startsWith("/portal");
      const isOnLogin = nextUrl.pathname === "/portal/login";

      if (isOnPortal && !isOnLogin) {
        // Trying to access a protected portal route
        return isLoggedIn; // false → middleware redirects to signIn page
      }

      if (isOnLogin && isLoggedIn) {
        // Already logged in, skip login page
        return Response.redirect(new URL("/portal", nextUrl));
      }

      // All other routes (public pages) → allow
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Providers are added in auth.ts (Node-only)
} satisfies NextAuthConfig;
