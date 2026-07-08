import type { NextAuthOptions, User } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface BackendUser {
  id?: number | string;
  email?: string;
  name?: string;
  nickname?: string;
  username?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}

interface BackendLoginResponse extends BackendUser {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: BackendUser;
}

const backendApiUrl =
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

const socialProviders: NextAuthOptions["providers"] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

function toAuthUser(data: BackendLoginResponse, email: string): User | null {
  const user = data.user ?? data;
  const accessToken = data.accessToken ?? data.token ?? user.accessToken;
  const refreshToken = data.refreshToken ?? user.refreshToken;
  const userEmail = user.email ?? email;
  const id = user.id ?? userEmail;

  if (!userEmail || !id) {
    return null;
  }

  return {
    id: String(id),
    accessToken,
    email: userEmail,
    name: user.name ?? user.nickname ?? user.username ?? userEmail,
    refreshToken,
    role: user.role ?? data.role,
  };
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "이메일",
          placeholder: "email@example.com",
          type: "email",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        try {
          const response = await fetch(`${backendApiUrl}/api/auth/login`, {
            body: JSON.stringify({ email, password }),
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });

          if (!response.ok) {
            return null;
          }

          const data = (await response.json()) as BackendLoginResponse;

          return toAuthUser(data, email);
        } catch {
          return null;
        }
      },
    }),
    ...socialProviders,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
