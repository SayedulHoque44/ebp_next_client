"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/Schemas";
import { z } from "zod";
import useAuthDataDefine from "@/features/Auth/hooks/auth.hooks";
import { RegisterFormHeader } from "./RegisterFormHeader";
import { RegisterFormWarning } from "./RegisterFormWarning";
import { RegisterFormFields } from "./RegisterFormFields";
import { RegisterFormActions } from "./RegisterFormActions";

type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * RegisterForm Component (Client Component)
 * 
 * Registration form with validation
 * Client component for form handling and submission
 */
export const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerAuth } = useAuthDataDefine();

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  // Form submission handler
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const userData = {
        name: data.name.trim(),
        phone: `+39${data.phone}`,
        city: data.city.trim(),
        pin: Number(data.pin),
      };
      await registerAuth(userData);
    } catch (error: any) {
      // Error is already handled in auth.hooks.ts
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <RegisterFormHeader />

        {/* Warning Info */}
        <RegisterFormWarning />

        {/* Form Fields */}
        <RegisterFormFields
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Form Actions */}
        <RegisterFormActions
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};
