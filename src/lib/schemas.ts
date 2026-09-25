// src/lib/schemas.ts
import { z } from "zod";

// Safe email regex to prevent ReDoS attacks
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Safe Indian/International phone regex: 10 to 15 digits with optional leading +
const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

// Contact and appointment form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number (at least 10 digits)")
    .max(16, "Phone number is too long")
    .regex(PHONE_REGEX, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .max(254, "Email must be at most 254 characters")
    .regex(EMAIL_REGEX, "Invalid email address format")
    .optional()
    .or(z.literal("")),
  treatment: z.string().max(100).optional().default("General Dental Consultation"),
  preferredDate: z.string().max(50).optional().default("Earliest Available"),
  preferredTime: z.string().max(50).optional().default("Morning"),
  message: z
    .string()
    .min(3, "Please provide a short note or concern (minimum 3 characters)")
    .max(1000, "Message must be at most 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Frontmatter collection schema
export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  author: z.string().min(1, "Author is required"),
  draft: z.boolean().default(false),
});

export type Post = z.infer<typeof postSchema>;

// API response schema
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;

// Server-side HTML escaping utility
export function escapeHTML(str: string): string {
  if (typeof str !== "string") return "";

  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

// Sanitize HTML for safe display
export function sanitizeHTML(str: string): string {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "");
}

// Sanitize input for logging
export function sanitizeForLogging(input: string, maxLength = 60): string {
  if (typeof input !== "string") return "";
  const sanitized = escapeHTML(input);
  return sanitized.length > maxLength ? `${sanitized.substring(0, maxLength)}...` : sanitized;
}
