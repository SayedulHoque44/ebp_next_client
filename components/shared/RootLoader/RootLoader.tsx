"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import { Question, CheckCircle, XCircle } from "@phosphor-icons/react";

const LOADING_DOTS = [0, 1, 2] as const;

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const logoVariants: Variants = {
  initial: { scale: 0.8, opacity: 0, y: 20 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const dotsVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const dotVariants: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const RootLoader: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="status"
      aria-live="polite"
      aria-label="Loading application content"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-purple-50 via-white to-purple-50/30 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo/Icon Container */}
        <motion.div variants={logoVariants} className="relative mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            variants={rotateVariants}
            className="absolute inset-0 w-32 h-32 border-4 border-purple-200/30 rounded-full"
          />

          {/* Middle Pulsing Ring */}
          <motion.div
            variants={pulseVariants}
            className="absolute inset-0 w-28 h-28 border-4 border-purple-400/50 rounded-full"
          />

          {/* Inner Icon Container */}
          <motion.div
            variants={floatVariants}
            className="relative w-24 h-24 bg-linear-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
          >
            {/* Quiz Icons Animation */}
            <div className="relative w-full h-full">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Question size={48} weight="duotone" className="text-white" />
              </motion.div>

              {/* Floating Check and X icons */}
              <motion.div
                animate={{
                  rotate: [0, -360],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2"
              >
                <CheckCircle
                  size={20}
                  weight="fill"
                  className="text-green-500 drop-shadow-lg"
                />
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, 360],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -left-2"
              >
                <XCircle
                  size={20}
                  weight="fill"
                  className="text-red-500 drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Easy Bangla Patente
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            Preparing your learning experience...
          </p>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          variants={dotsVariants}
          initial="initial"
          animate="animate"
          className="flex items-center gap-2"
        >
          {LOADING_DOTS.map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              className="w-3 h-3 rounded-full bg-linear-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "200px" }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 w-48 h-1.5 bg-purple-100 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-linear-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "40%",
            }}
          />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-xs text-gray-400 font-medium"
        >
          Loading your quiz platform...
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RootLoader;
