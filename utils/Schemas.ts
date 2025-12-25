import z from "zod";

// Login validation schema
export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  pin: z.coerce
    .number({ invalid_type_error: "PIN must be a number" })
    .min(1, { message: "PIN is required" })
    .max(999999, { message: "PIN must be 6 digits or less" }),
});
