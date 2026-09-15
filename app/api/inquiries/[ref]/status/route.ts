import { NextRequest, NextResponse } from "next/server";
import {
  EXPRESS_BACKEND_URL,
  resolveAccessToken,
  setSessionCookies,
} from "@/lib/auth-session";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ ref: string }> }
) {
  try {
    const { accessToken, newTokens } = await resolveAccessToken(request);

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Updating inquiry status requires operator authentication.",
        },
        { status: 401 }
      );
    }

    const { ref } = await context.params;
    const body = await request.json();

    const url = `${EXPRESS_BACKEND_URL}/api/inquiries/${encodeURIComponent(ref)}/status`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    const response = NextResponse.json(data, { status: res.status });

    if (newTokens) {
      setSessionCookies(response, newTokens);
    }

    return response;
  } catch (error) {
    console.error("[NEXT-API-INQUIRIES-STATUS-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry status." },
      { status: 502 }
    );
  }
}
