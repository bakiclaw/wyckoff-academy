import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      if (session.user?.email) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
