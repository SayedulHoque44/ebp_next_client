"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TiInfo } from "react-icons/ti";
import { FiEye, FiEyeOff, FiUser, FiMapPin, FiLock } from "react-icons/fi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import bg2 from "../../assets/Images/bg-2.jpg";
// import flag from "../../assets/Images/flag.png";

import { registerSchema } from "@/utils/Schemas";
import { LoginTestimonials } from "@/constants/constendData";
import { IRegisterRequest } from "@/features/Auth/interface/auth.interface";
import useAuthDataDefine from "@/features/Auth/hooks/auth.hooks";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { mediaProvider } from "@/constants/mediaProvider";
import { z } from "zod";
import Image from "next/image";

// Testimonial data

const Register = () => {
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { register: registerAuth } = useAuthDataDefine();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const phoneValue = watch("phone");

  // Autoplay testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % LoginTestimonials.length);
    }, 6000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Phone input handler with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setValue("phone", value);
    }
  };

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const userData = {
        name: data.name.trim(),
        phone: `+39${data.phone}`,
        city: data.city.trim(),
        pin: Number(data.pin),
      };
      // console.log(userData);
      const response = await registerAuth(userData);
      // console.log("response - loginPage.tsx -->", response);
    } catch (error: any) {
      // Error is already handled in auth.hooks.ts, but we can add additional handling here if needed
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Panel - Branding/Marketing */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          style={{
            backgroundImage: `url(${mediaProvider.bg2.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-12 text-white">
          {/* Logo */}
          {/* <div>
            <Logo size="lg" nameColor="text-white" />
          </div> */}

          {/* Main Content */}
          <div className="flex flex-col justify-center max-w-md items-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Master Italian Driving Theory
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of students successfully passing their Italian
              driving license exam with our comprehensive study materials and
              expert guidance.
            </p>

            {/* Testimonial Carousel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full">
              <div className="transition-all duration-500 ease-in-out">
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  &quot;{LoginTestimonials[currentTestimonial].feedback}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {LoginTestimonials[currentTestimonial].initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {LoginTestimonials[currentTestimonial].name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {LoginTestimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2 justify-center">
            {LoginTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-white w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-50 lg:rounded-tl-4xl lg:rounded-bl-4xl md:rounded-tl-none md:rounded-bl-none">
        <div className="w-full max-w-md">
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create an account
                </h2>
                <p className="text-gray-600">
                  Join our community of successful learners
                </p>
              </div>

              {/* Warning Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <TiInfo className="text-amber-600 text-xl mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 text-sm font-medium leading-relaxed">
                    আপনার ইনফরমেশনগুলো ভালোভাবে চেক করে দিবেন, এগুলা খুবই
                    গুরুত্বপূর্ণ, সঠিক নাম্বার না দিলে আপনাকে বাতিল করা হবে।
                  </p>
                </div>
              </div>

              {/* Form Fields */}
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
                      id="name "
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
                        alt="Italy"
                        width={24}
                        height={24}
                        className="w-6 h-4 object-cover rounded-sm mr-2"
                      />
                      {/* Country Code */}
                      <span className="text-gray-700 font-semibold text-base mr-3">
                        +39
                      </span>
                      {/* Phone Icon */}
                      {/* <FiPhone className="text-gray-400 mr-3" /> */}
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
                    >
                      {showConfirmPin ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPin?.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isSubmitting || isLoading}
                className="w-full"
                size="lg"
              >
                Create Account
              </Button>
              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
