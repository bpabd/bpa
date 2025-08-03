// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if credentials exist
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user) return null
        
        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        
        return {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    })
  ],
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }