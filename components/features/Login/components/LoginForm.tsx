"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/Schemas";
import { z } from "zod";
import useAuth from "@/features/Auth/hooks/useAuth";
import { LoginFormHeader } from "./LoginFormHeader";
import { LoginFormFields } from "./LoginFormFields";
import { LoginFormActions } from "./LoginFormActions";

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * LoginForm Component (Client Component)
 * 
 * Login form with validation
 * Client component for form handling and submission
 */
export const LoginForm: React.FC = () => {
  const { login } = useAuth();

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "1111111111",
      pin: 3544,
    },
    mode: "onChange",
  });

  // Form submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      const deviceInfo = navigator.userAgent;
      const userData = {
        phone: `+39${data.phone}`,
        pin: data.pin,
        deviceInfo,
      };
      await login(userData);
    } catch (error: any) {
      // Error is already handled in auth.hooks.ts
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <LoginFormHeader />

        {/* Form Fields */}
        <LoginFormFields
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Form Actions */}
        <LoginFormActions
          isSubmitting={isSubmitting}
          isLoading={false}
        />
      </form>
    </div>
  );
};
