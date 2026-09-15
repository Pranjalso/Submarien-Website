import { NextRequest, NextResponse } from "next/server";

export const ACCESS_COOKIE = "aethel_access_token";
export const REFRESH_COOKIE = "aethel_refresh_token";

export const EXPRESS_BACKEND_URL =
  process.env.EXPRESS_BACKEND_URL || "http://localhost:5050";

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export function setSessionCookies(response: NextResponse, tokens: SessionTokens): void {
  const isProd = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: ACCESS_COOKIE,
    value: tokens.accessToken,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expiresInSeconds || 15 * 60, // 15 mins
  });

  response.cookies.set({
    name: REFRESH_COOKIE,
    value: tokens.refreshToken,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function clearSessionCookies(response: NextResponse): void {
  const isProd = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: ACCESS_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  response.cookies.set({
    name: REFRESH_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

/**
 * Attempts to retrieve a valid access token.
 * If expired or absent, tries to silently refresh using the refresh token.
 */
export async function resolveAccessToken(request: NextRequest): Promise<{
  accessToken: string | null;
  newTokens: SessionTokens | null;
}> {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  if (accessToken) {
    return { accessToken, newTokens: null };
  }

  // If access token missing but refresh token exists, renew automatically
  if (refreshToken) {
    try {
      const res = await fetch(`${EXPRESS_BACKEND_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": request.headers.get("x-forwarded-for") || "127.0.0.1",
          "User-Agent": request.headers.get("user-agent") || "Submarine-BFF/1.0",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const tokens: SessionTokens = {
            accessToken: json.data.accessToken,
            refreshToken: json.data.refreshToken,
            expiresInSeconds: json.data.expiresInSeconds,
          };
          return { accessToken: tokens.accessToken, newTokens: tokens };
        }
      }
    } catch (err) {
      console.error("[Session Auto-Renewal Error]:", err);
    }
  }

  return { accessToken: null, newTokens: null };
}
