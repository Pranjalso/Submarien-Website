import { NextRequest, NextResponse } from "next/server";
import {
  EXPRESS_BACKEND_URL,
  resolveAccessToken,
  setSessionCookies,
  clearSessionCookies,
} from "@/lib/auth-session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { accessToken, newTokens } = await resolveAccessToken(request);

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized access: Classified mission inquiry repository requires authentication.",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = `${EXPRESS_BACKEND_URL}/api/inquiries${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401) {
      const resp = NextResponse.json(
        { success: false, error: "Session expired or invalid credentials." },
        { status: 401 }
      );
      clearSessionCookies(resp);
      return resp;
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to fetch inquiries" }));
      return NextResponse.json(err, { status: res.status });
    }

    const data = await res.json();
    const response = NextResponse.json(data, { status: 200 });

    if (newTokens) {
      setSessionCookies(response, newTokens);
    }

    return response;
  } catch (error) {
    console.error("[NEXT-API-INQUIRIES-GET-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to submarine backend service." },
      { status: 502 }
    );
  }
}
