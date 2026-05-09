"use client";

import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import Image from "next/image";
import { mediaProvider } from "@/constants/mediaProvider";
import { Label, Caption } from "@/components/ui/Typography";
import { z } from "zod";
import { loginSchema } from "@/utils/Schemas";

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  setValue: UseFormSetValue<LoginFormData>;
}

/**
 * LoginFormFields Component (Client Component)
 * 
 * Form fields (phone and PIN)
 * Client component for form interactions
 */
export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  register,
  errors,
  setValue,
}) => {
  const [showPin, setShowPin] = useState(false);

  // Phone input handler with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setValue("phone", value, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-4">
      {/* Phone Field */}
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <div className="relative bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center px-3 py-3">
            {/* Italian Flag */}
            <Image
              src={mediaProvider.flag}
              width={24}
              height={24}
              alt="Italy flag"
              className="w-6 h-4 object-cover rounded-sm mr-2"
            />
            {/* Country Code */}
            <Caption className="text-gray-700 font-semibold text-base mr-3">
              +39
            </Caption>
            {/* Phone Number Input */}
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              onChange={handlePhoneChange}
              className={`flex-1 bg-transparent border-none outline-none text-gray-900 font-semibold placeholder-gray-500 ${
                errors.phone ? "text-red-500" : ""
              }`}
              placeholder="Enter your phone number"
              maxLength={10}
            />
          </div>
        </div>
        {errors.phone && (
          <Caption className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </Caption>
        )}
      </div>

      {/* PIN Field */}
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-gray-700">PIN</Label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register("pin")}
            type={showPin ? "text" : "password"}
            id="pin"
            className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none text-gray-900 ${
              errors.pin ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your PIN"
            maxLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPin ? "Hide PIN" : "Show PIN"}
          >
            {showPin ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.pin && (
          <Caption className="text-red-500 text-sm mt-1">
            {errors.pin.message}
          </Caption>
        )}
      </div>
    </div>
  );
};
