import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "../../../components/service/auth.service";
import jwt from 'jsonwebtoken';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const tokenResponse = await loginService({
            username: credentials?.username,
            password: credentials?.password,
          });
      
          const token = tokenResponse?.payload?.token;
      
          if (token) {
            const decodedToken = jwt.decode(token);
      
            if (decodedToken) {
              return {
                id: decodedToken.userId?.toString(),
                name: decodedToken.sub,
                role: decodedToken.role,
                accessToken: token,
              };
            } else {
              console.error("Failed to decode token:", token);
              return null;
            }
          }
      
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/admin/dashboard', 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.id = token.userId;
      }
      return session;
    },
  },

  pages: {
    signIn: '/admin/dashboard',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

};

export default NextAuth(authOptions);