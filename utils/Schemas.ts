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

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "নাম আবশ্যক")
      .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
      .max(50, "নাম ৫০ অক্ষরের বেশি হতে পারবে না")
      .regex(/^[a-zA-Z\u0980-\u09FF\s]+$/, "নামে শুধুমাত্র অক্ষর থাকতে পারে"),
    phone: z
      .string()
      .min(1, "মোবাইল নাম্বার আবশ্যক")
      .regex(/^[0-9]{10}$/, "মোবাইল নাম্বার ১০ ডিজিটের হতে হবে")
      .refine((value) => !/(\d)\1{4,}/.test(value), {
        message: "দুর্বল মোবাইল নাম্বার প্রযোজ্য নয়",
      }),
    city: z
      .string()
      .min(1, "শহরের নাম আবশ্যক")
      .min(2, "শহরের নাম কমপক্ষে ২ অক্ষরের হতে হবে")
      .max(30, "শহরের নাম ৩০ অক্ষরের বেশি হতে পারবে না"),
    pin: z
      .string()
      .min(1, "পিন আবশ্যক")
      .regex(
        /^[1-9]\d{3,5}$/,
        "পিন ৪-৬ ডিজিটের হতে হবে এবং ০ দিয়ে শুরু হতে পারবে না"
      )
      .refine((value) => !/(\d)\1{3,}/.test(value), {
        message: "দুর্বল পিন প্রযোজ্য নয়",
      }),
    confirmPin: z.string().min(1, "পিন নিশ্চিতকরণ আবশ্যক"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "পিন দুটি একই হতে হবে",
    path: ["confirmPin"],
  });
