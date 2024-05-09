import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getProfileByUserID } from "./data/profile";
import { getInventoryByUserId } from "./data/inventory";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: UserRole;
      inventory_id: string | null;
      profile_id: string | null;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      // if (!user.id) return false;
      // const existingUser = await getUserById(user.id);
      // if (!existingUser) return false;
      return true;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.inventory_id && session.user) {
        session.user.inventory_id = token.inventory_id as string;
      }

      if (token.profile_id && session.user) {
        session.user.profile_id = token.profile_id as string;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      const userProfile = await getProfileByUserID(token.sub);

      const userIventory = await getInventoryByUserId(token.sub);
      if (!existingUser) return token;

      token.inventory_id = userIventory?.id || null;
      token.profile_id = userProfile?.id || null;

      token.role = existingUser.role;

      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
