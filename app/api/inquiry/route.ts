import { NextRequest, NextResponse } from "next/server";
import { InquiryRequestBody, ApiResponse, InquiryConfirmation } from "@/types/inquiry";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const EXPRESS_BACKEND_URL =
  process.env.EXPRESS_BACKEND_URL || "http://localhost:5050";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<InquiryConfirmation>>> {
  try {
    const body: Partial<InquiryRequestBody> = await request.json();
    const { fullName, email, organization, category, missionScope } = body;

    // Field validations
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Full name is required and must be at least 2 characters.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid official email address is required.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    if (!organization || typeof organization !== "string" || organization.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Organization or agency name is required.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      organization: organization.trim(),
      category: category || "Flagship Architecture & Subsystems",
      missionScope: typeof missionScope === "string" ? missionScope.trim() : "",
    };

    // Forward to Node.js / Express.js / PostgreSQL backend
    try {
      const expressRes = await fetch(`${EXPRESS_BACKEND_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": request.headers.get("x-forwarded-for") || "127.0.0.1",
          "User-Agent": request.headers.get("user-agent") || "Submarine-Web/1.0",
        },
        body: JSON.stringify(payload),
      });

      if (expressRes.ok) {
        const expressData = await expressRes.json();
        if (expressData.success && expressData.data) {
          console.info(
            `[AETHEL-POSTGRES-STORED] Inquiry persisted in PostgreSQL: Ref=${expressData.data.inquiryId}`
          );

          return NextResponse.json(
            {
              success: true,
              data: {
                inquiryId: expressData.data.inquiryId,
                timestamp: expressData.data.timestamp,
                category: expressData.data.category,
                status: expressData.data.status || "RECEIVED",
              },
              timestamp: new Date().toISOString(),
            },
            { status: 201 }
          );
        }
      }

      const errJson = await expressRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errJson.error || "Backend transmission rejected inquiry.",
          timestamp: new Date().toISOString(),
        },
        { status: expressRes.status || 400 }
      );
    } catch (backendErr) {
      console.error(
        `[AETHEL-BACKEND-OFFLINE] Express backend at ${EXPRESS_BACKEND_URL} unreachable:`,
        backendErr
      );
      return NextResponse.json(
        {
          success: false,
          error: "Inquiry service is currently unreachable. Please try again shortly.",
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("[AETHEL-INQUIRY-ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred while processing inquiry transmission.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<ApiResponse<{ status: string; database?: string; version: string }>>> {
  try {
    const healthRes = await fetch(`${EXPRESS_BACKEND_URL}/api/health`);
    if (healthRes.ok) {
      const healthData = await healthRes.json();
      return NextResponse.json({
        success: true,
        data: {
          status: "OPERATIONAL",
          database: healthData.database || "CONNECTED",
          version: "1.0.0",
        },
        timestamp: new Date().toISOString(),
      });
    }
  } catch {
    // ignore
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        status: "OPERATIONAL",
        version: "1.0.0",
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
