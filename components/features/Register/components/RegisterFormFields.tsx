"use client";

import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FiEye, FiEyeOff, FiUser, FiMapPin, FiLock } from "react-icons/fi";
import Image from "next/image";
import { mediaProvider } from "@/constants/mediaProvider";
import { z } from "zod";
import { registerSchema } from "@/utils/Schemas";

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormFieldsProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  setValue: UseFormSetValue<RegisterFormData>;
}

/**
 * RegisterFormFields Component (Client Component)
 * 
 * Form fields (name, city, phone, pin, confirmPin)
 * Client component for form interactions
 */
export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  register,
  errors,
  setValue,
}) => {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  // Phone input handler with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setValue("phone", value);
    }
  };

  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none text-gray-900 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name?.message as string}
          </p>
        )}
      </div>

      {/* City Field */}
      <div className="space-y-2">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register("city")}
            type="text"
            id="city"
            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none text-gray-900 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your city"
          />
        </div>
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">
            {errors.city?.message as string}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <div className="relative bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center px-3 py-3">
            {/* Italian Flag */}
            <Image
              src={mediaProvider.flag.src as string}
              alt="Italy flag"
              width={24}
              height={24}
              className="w-6 h-4 object-cover rounded-sm mr-2"
            />
            {/* Country Code */}
            <span className="text-gray-700 font-semibold text-base mr-3">
              +39
            </span>
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
          <p className="text-red-500 text-sm mt-1">
            {errors.phone?.message as string}
          </p>
        )}
      </div>

      {/* PIN Field */}
      <div className="space-y-2">
        <label
          htmlFor="pin"
          className="block text-sm font-medium text-gray-700"
        >
          PIN (4-6 digits)
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register("pin")}
            type={showPin ? "text" : "password"}
            id="pin"
            className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none text-gray-900 ${
              errors.pin ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter 4-6 digit PIN"
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
          <p className="text-red-500 text-sm mt-1">
            {errors.pin?.message as string}
          </p>
        )}
      </div>

      {/* Confirm PIN Field */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPin"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm PIN
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register("confirmPin")}
            type={showConfirmPin ? "text" : "password"}
            id="confirmPin"
            className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors outline-none text-gray-900 ${
              errors.confirmPin ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your PIN"
            maxLength={6}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPin(!showConfirmPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showConfirmPin ? "Hide Confirm PIN" : "Show Confirm PIN"}
          >
            {showConfirmPin ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {errors.confirmPin && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPin?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
