import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });
          
          if (!admin) {
            if (process.env.NODE_ENV === 'development') {
              console.error(`[Auth] Admin not found: ${credentials.email}`);
            }
            return null;
          }
          
          const valid = await compare(credentials.password, admin.password);
          if (!valid) {
            if (process.env.NODE_ENV === 'development') {
              console.error(`[Auth] Invalid password for: ${credentials.email}`);
            }
            return null;
          }
          
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name ?? undefined,
          };
        } catch (error) {
          console.error('[Auth] Database error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/admin/login' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
