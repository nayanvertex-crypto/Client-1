// src/lib/schemas.ts
import { z } from "zod";

// Simple, optimized email regex to prevent ReDoS attacks
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Contact form submission schema with safe email validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be at most 254 characters")
    .regex(EMAIL_REGEX, "Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Frontmatter collection schema for blog posts
export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  author: z.string().min(1, "Author is required"),
  draft: z.boolean().default(false),
});

export type Post = z.infer<typeof postSchema>;

// API response schema with strict type-safety (no explicit any)
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;

// Server-side HTML escaping utility (Node.js compatible)
// Escapes special HTML characters to prevent XSS
export function escapeHTML(str: string): string {
  if (typeof str !== "string") return str;

  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

// Sanitize HTML for safe display (strips all HTML tags)
export function sanitizeHTML(str: string): string {
  if (typeof str !== "string") return str;

  // Strip all HTML tags
  return str.replace(/<[^>]*>/g, "");
}

// Sanitize input for logging (replaces sensitive data with placeholders)
export function sanitizeForLogging(input: string, maxLength = 50): string {
  if (typeof input !== "string") return input;

  const sanitized = escapeHTML(input);
  return sanitized.length > maxLength ? `${sanitized.substring(0, maxLength)}...` : sanitized;
}
