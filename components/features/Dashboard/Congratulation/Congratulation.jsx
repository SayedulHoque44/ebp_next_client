// Congratulation.js
import React from "react";
import PButton from "../../../Shared/Components/PButton";
import icon from "../../../assets/Images/rewards.png";
import { Sparkle } from "@phosphor-icons/react";

const Congratulation = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-200 rounded-2xl shadow-xl p-6 md:p-10 my-6">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
        {/* Icon with Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img 
              className="h-16 w-16 md:h-20 md:w-20 object-contain" 
              src={icon} 
              alt="Trophy" 
            />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkle 
              size={24} 
              weight="fill" 
              className="text-yellow-500 sparkle-float" 
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600">
            Congratulations!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            You have successfully passed!
          </p>
          <p className="text-sm md:text-base text-gray-600 max-w-md">
            Your hard work and dedication have paid off. We're proud of your achievement!
          </p>
        </div>

        {/* Button */}
        <div className="pt-2">
          <PButton text="Give Feedback please!" />
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
