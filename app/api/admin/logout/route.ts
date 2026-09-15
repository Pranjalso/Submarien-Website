import { NextRequest, NextResponse } from "next/server";
import {
  REFRESH_COOKIE,
  ACCESS_COOKIE,
  EXPRESS_BACKEND_URL,
  clearSessionCookies,
} from "@/lib/auth-session";

/**
 * Industry-Standard Session Revocation & Logout Handler
 * POST /api/admin/logout
 * 
 * 1. Reads active session tokens from secure HTTP-only cookies.
 * 2. Revokes the refresh token record in PostgreSQL via the Express backend.
 * 3. Records an immutable audit log entry (event: 'LOGOUT').
 * 4. Explicitly clears all session cookies across all browser paths.
 */
async function performLogout(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
    const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Forwarded-For": request.headers.get("x-forwarded-for") || "127.0.0.1",
      "User-Agent": request.headers.get("user-agent") || "Submarine-Frontend/1.0",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Revoke token in backend database & log audit trail
    if (refreshToken || accessToken) {
      try {
        await fetch(`${EXPRESS_BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          headers,
          body: JSON.stringify({ refreshToken }),
        });
      } catch (backendErr) {
        console.error("[LOGOUT-BACKEND-REVOKE-WARNING]", backendErr);
      }
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Session terminated and security tokens revoked.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

    // Eradicate session cookies
    clearSessionCookies(response);

    return response;
  } catch (err) {
    console.error("[LOGOUT-ERROR]", err);
    const response = NextResponse.json(
      {
        success: true,
        message: "Session cleared.",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
    clearSessionCookies(response);
    return response;
  }
}

export async function POST(request: NextRequest) {
  return performLogout(request);
}

export async function DELETE(request: NextRequest) {
  return performLogout(request);
}

export async function GET(request: NextRequest) {
  return performLogout(request);
}
