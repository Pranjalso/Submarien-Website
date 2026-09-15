import { NextRequest, NextResponse } from "next/server";
import {
  EXPRESS_BACKEND_URL,
  REFRESH_COOKIE,
  setSessionCookies,
  clearSessionCookies,
  resolveAccessToken,
} from "@/lib/auth-session";

export const runtime = "nodejs";

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    const backendRes = await fetch(`${EXPRESS_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") || "127.0.0.1",
        "User-Agent": request.headers.get("user-agent") || "Submarine-Web/1.0",
      },
      body: JSON.stringify({
        usernameOrEmail: username,
        password,
      }),
    });

    const data = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok || !data.success) {
      let rawError = data.error;
      let errorMsg = "Authentication failed. Invalid username or password.";

      if (typeof rawError === "string") {
        errorMsg = rawError;
      } else if (rawError && typeof rawError === "object" && rawError.message) {
        errorMsg = String(rawError.message);
      } else if (typeof data.message === "string") {
        errorMsg = data.message;
      }

      if (errorMsg.includes("Protected deployment")) {
        errorMsg = "Backend is protected by Vercel Authentication. Please disable Deployment Protection in backend Vercel project settings.";
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMsg,
          code: data.code || "AUTH_FAILED",
        },
        { status: backendRes.status || 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: data.message || "Login successful",
        user: data.data.user,
      },
      { status: 200 }
    );

    // Save tokens as secure HTTP-only cookies
    setSessionCookies(response, {
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      expiresInSeconds: data.data.expiresInSeconds,
    });

    return response;
  } catch (err) {
    console.error("[ADMIN-AUTH-LOGIN-ERROR]", err);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to connect to submarine security authentication service.",
      },
      { status: 502 }
    );
  }
}

// GET /api/admin/auth - Verify Session & Fetch Identity
export async function GET(request: NextRequest) {
  try {
    const { accessToken, newTokens } = await resolveAccessToken(request);

    if (!accessToken) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const meRes = await fetch(`${EXPRESS_BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!meRes.ok) {
      const resp = NextResponse.json({ authenticated: false }, { status: 200 });
      clearSessionCookies(resp);
      return resp;
    }

    const meData = await meRes.json();
    const response = NextResponse.json(
      {
        authenticated: true,
        user: meData.data?.user,
        username: meData.data?.user?.username,
        role: meData.data?.user?.role,
      },
      { status: 200 }
    );

    // If session was silently refreshed during resolution, update response cookies
    if (newTokens) {
      setSessionCookies(response, newTokens);
    }

    return response;
  } catch (err) {
    console.error("[ADMIN-AUTH-VERIFY-ERROR]", err);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

// DELETE /api/admin/auth - Logout
export async function DELETE(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

    if (refreshToken) {
      await fetch(`${EXPRESS_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {});
    }

    const response = NextResponse.json(
      { success: true, message: "Security clearance revoked. Logged out." },
      { status: 200 }
    );

    clearSessionCookies(response);
    return response;
  } catch (err) {
    console.error("[ADMIN-AUTH-LOGOUT-ERROR]", err);
    const response = NextResponse.json(
      { success: true, message: "Logged out." },
      { status: 200 }
    );
    clearSessionCookies(response);
    return response;
  }
}
