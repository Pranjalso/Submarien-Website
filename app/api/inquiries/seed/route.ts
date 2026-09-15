import { NextRequest, NextResponse } from "next/server";
import {
  EXPRESS_BACKEND_URL,
  resolveAccessToken,
  setSessionCookies,
} from "@/lib/auth-session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { accessToken, newTokens } = await resolveAccessToken(request);

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Seeding records requires administrator privileges." },
        { status: 401 }
      );
    }

    const res = await fetch(`${EXPRESS_BACKEND_URL}/api/inquiries/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json().catch(() => ({}));
    const response = NextResponse.json(data, { status: res.status });

    if (newTokens) {
      setSessionCookies(response, newTokens);
    }

    return response;
  } catch (error) {
    console.error("[NEXT-API-SEED-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to dynamically seed inquiry." },
      { status: 502 }
    );
  }
}
