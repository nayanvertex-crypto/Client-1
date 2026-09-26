// src/pages/api/contact.ts
import { contactFormSchema, sanitizeForLogging } from "../../lib/schemas";

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      clinic: "Uniyal Oro Dental Clinic & Implant Centre",
      location: "Balawala, Dehradun",
      phone: "+91 70180 21512",
      methods: ["POST"],
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function POST({ request }: { request: Request }) {
  try {
    const body: unknown = await request.json();

    // Validate with Zod schema
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Validation failed",
          details: result.error.issues.map((i) => i.message),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const data = result.data;

    // Log sanitized appointment data safely
    console.log("Clinic Appointment Booking Received:", {
      name: sanitizeForLogging(data.name),
      phone: sanitizeForLogging(data.phone || "N/A"),
      treatment: sanitizeForLogging(data.treatment || "General"),
      preferredDate: sanitizeForLogging(data.preferredDate || "Earliest"),
      preferredTime: sanitizeForLogging(data.preferredTime || "Morning"),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Thank you! Your appointment request has been received. Our clinic team will call or WhatsApp you shortly at ${data.phone || "your contact number"} to confirm your slot.`,
        referenceId: `UNIYAL-${Date.now().toString().slice(-6)}`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error: unknown) {
    console.error("Error processing appointment submission:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error. Please call +91 70180 21512 directly.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
