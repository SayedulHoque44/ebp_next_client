"use client";

import Button from "@/components/ui/Button";
import {
  Body,
  Caption,
  Heading1,
  Heading2,
  Label,
} from "@/components/ui/Typography";
import { LoginTestimonials } from "@/constants/constendData";
import { mediaProvider } from "@/constants/mediaProvider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/Schemas";
import { z } from "zod";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/features/auth/hooks/useAuth";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { login, ...rest } = useAuth();
  // console.log("rest - loginPage.tsx -->", rest);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % LoginTestimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);
  // Phone input handler with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setValue("phone", value, { shouldValidate: true });
    }
  };
  // const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/\D/g, ""); // Only allow digits
  //   if (value.length <= 6) {
  //     // Convert to number - empty string becomes NaN which will fail validation (as expected)
  //     const numValue = value === "" ? NaN : Number(value);
  //     setValue("pin", numValue, { shouldValidate: true });
  //   }
  // };

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
      // console.log(userData);
      const response = await login(userData);
      // console.log("response - loginPage.tsx -->", response);
    } catch (error: any) {
      // Error is already handled in auth.hooks.ts, but we can add additional handling here if needed
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Panel - Branding/Marketing */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          style={{
            backgroundImage: `url(${mediaProvider.bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-12 text-white">
          {/* Main Content */}
          <div className="flex flex-col justify-center max-w-md items-center">
            <Heading1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-center">
              Welcome Back!
            </Heading1>
            <Body className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed text-center font-sans">
              Continue your journey to master Italian driving theory with our
              comprehensive study materials and expert guidance.
            </Body>

            {/* Testimonial Carousel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full">
              <div className="transition-all duration-500 ease-in-out">
                <Body className="text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
                  &quot;{LoginTestimonials[currentTestimonial].feedback}&quot;
                </Body>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <Caption className="text-white font-bold text-sm">
                      {LoginTestimonials[currentTestimonial].initials}
                    </Caption>
                  </div>
                  <div>
                    <Body className="font-semibold text-white">
                      {LoginTestimonials[currentTestimonial].name}
                    </Body>
                    <Caption className="text-gray-400 text-sm">
                      {LoginTestimonials[currentTestimonial].location}
                    </Caption>
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

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-50 lg:rounded-tl-4xl lg:rounded-bl-4xl md:rounded-tl-none md:rounded-bl-none">
        <div className="w-full max-w-md">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Header */}
              <div className="text-center mb-8">
                <Heading2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Sign in to your account
                </Heading2>
                <Body className="text-gray-600">
                  Welcome back! Please enter your details.
                </Body>
              </div>

              {/* Form Fields */}
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
                        alt="Italy"
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
                  <Label className="block text-sm font-medium text-gray-700">
                    PIN
                  </Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("pin")}
                      // onChange={handlePinChange}
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

              {/* Forgot PIN Link */}
              <div className="text-center">
                <a
                  href={`tel:+39 320 608 8871`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                >
                  Forgot PIN? Contact us: +39 320 608 8871
                </a>
              </div>

              {/* Submit Button */}
              {/* <Button
                type="submit"
                text="Sign In"
                loading={isSubmitting || isLoading}
                className="w-full py-3 text-base font-semibold"
                size="lg"
              /> */}
              <Button
                type="submit"
                size="lg"
                loading={isSubmitting || isLoading}
                className="w-full "
              >
                Sign In
              </Button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <Body className="text-gray-600 text-sm ">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Register Now
                  </Link>
                </Body>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
