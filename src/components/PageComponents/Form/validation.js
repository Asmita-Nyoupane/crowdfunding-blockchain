import { z } from "zod";

const isFutureDate = (date) => date > new Date();

export const campaignSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title can't exceed 50 characters"),
  deadline: z.coerce.date().refine(isFutureDate, {
    message: "Deadline must be a future date",
  }),
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,18})?$/, "Invalid amount format"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description can't exceed 500 characters"),
});
