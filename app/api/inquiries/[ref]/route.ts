import { NextRequest, NextResponse } from "next/server";
import {
  EXPRESS_BACKEND_URL,
  resolveAccessToken,
  setSessionCookies,
} from "@/lib/auth-session";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ ref: string }> }
) {
  try {
    const { accessToken, newTokens } = await resolveAccessToken(request);

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Deletion of classified inquiries requires administrator credentials.",
        },
        { status: 401 }
      );
    }

    const { ref } = await context.params;
    const url = `${EXPRESS_BACKEND_URL}/api/inquiries/${encodeURIComponent(ref)}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
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
    console.error("[NEXT-API-INQUIRY-DELETE-ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete inquiry." },
      { status: 502 }
    );
  }
}
