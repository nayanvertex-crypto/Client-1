// src/pages/api/contact.ts
import { contactFormSchema, sanitizeForLogging } from "../../lib/schemas";

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      endpoint: "/api/contact",
      methods: ["POST"],
      description: "Contact submission API endpoint.",
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
          details: result.error.issues,
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

    // Log sanitized data only (never log raw user input in production)
    console.log("Contact form submission:", {
      name: sanitizeForLogging(data.name),
      email: sanitizeForLogging(data.email, 30),
      message: sanitizeForLogging(data.message, 100),
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error: unknown) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
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
