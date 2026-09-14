import { NextRequest, NextResponse } from "next/server";
import { InquiryRequestBody, ApiResponse, InquiryConfirmation } from "@/types/inquiry";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    const selectedCategory = category || "Flagship Architecture & Subsystems";
    const sanitizedScope = typeof missionScope === "string" ? missionScope.trim() : "";

    // Generate deterministic inquiry reference
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const inquiryId = `AETHEL-REQ-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // Log internally for audit in production environments
    console.info(
      `[AETHEL-INQUIRY-RECEIVED] ID=${inquiryId} Org="${organization.trim()}" Category="${selectedCategory}" ScopeLength=${sanitizedScope.length}`
    );

    const confirmation: InquiryConfirmation = {
      inquiryId,
      timestamp,
      category: selectedCategory,
      status: "RECEIVED",
    };

    return NextResponse.json(
      {
        success: true,
        data: confirmation,
        timestamp,
      },
      { status: 200 }
    );
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

export async function GET(): Promise<NextResponse<ApiResponse<{ status: string; version: string }>>> {
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
