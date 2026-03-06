import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"]
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "dr@ejemplo.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Validación en duro para el desarrollo inicial hasta tener prisma
        const user = { id: "1", name: "Doctor", email: "admin@portal.com", role: "admin" }
        
        if (credentials?.email === "admin@portal.com" && credentials?.password === "admin123") {
          return user;
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Simplemente retornamos si hay sesión
      return !!auth;
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
    }
  },
});
