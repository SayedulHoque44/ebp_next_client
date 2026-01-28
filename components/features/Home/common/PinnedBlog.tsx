/* eslint-disable react-hooks/purity */
"use client";
// @ts-nocheck
import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import ModernCard from "@/components/shared/ModernCard";
import { Heading2, BodyLarge, Caption } from "@/components/ui/Typography";
import { minimizeText } from "@/utils/utils";
// import pinnedImg from "../../../assets/Images/pin.png";
// import { mediaProvider } from "@/constants/mediaProvider";
import { Image } from "antd";
import { IBlog } from "@/features/Blog/interface/blog.interface";

const PinnedBlog = ({
  blog,
  isOpen,
  onClose,
}: {
  blog: IBlog;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { _id, title, description, createdAt, imageUrl } = blog;
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: any) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(true);
        if (!prefersReducedMotion) {
          setShowEffects(true);
        }
      }, 120);

      const hideTimer = setTimeout(() => {
        setShowEffects(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    } else {
      setIsVisible(false);
      setShowEffects(false);
    }
  }, [isOpen, prefersReducedMotion]);

  // Escape key handling
  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  const textObj = minimizeText(description, isMobile);

  if (!isOpen) return null;

  const particleCount = prefersReducedMotion ? 5 : isMobile ? 18 : 30;
  const sparkleCount = prefersReducedMotion ? 2 : isMobile ? 6 : 10;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Confetti */}
      {showEffects && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-confetti"
              style={{
                left: `${(Math.random() * 100) as any}%`,
                top: "-5%",
                backgroundColor: [
                  "#fbbf24",
                  "#f59e0b",
                  "#d97706",
                  "#f97316",
                  "#8b5cf6",
                  "#a855f7",
                  "#c084fc",
                  "#06b6d4",
                ][Math.floor(Math.random() * 8)],
                width: `${6 + Math.random() * 6}px`,
                height: `${6 + Math.random() * 6}px`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${2 + Math.random() * 1.5}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Sparkles */}
      {showEffects && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(sparkleCount)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 16}px`,
              }}
            >
              {["✨", "⭐", "💫", "🌟"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      {/* Balloons */}
      {showEffects && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="absolute animate-balloon"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: "-10%",
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${28 + Math.random() * 10}px`,
              }}
            >
              {["🎈", "🎊", "🎉"][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="relative w-full max-w-7xl rounded-2xl shadow-2xl">
        {/* {showEffects && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-extrabold shadow-2xl text-center">
              🏆 Congratulations 🏆
            </div>
          </div>
        )} */}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ModernCard
          variant="elevated"
          className={`overflow-hidden group transition-all duration-700 rounded-2xl ${
            isVisible
              ? "opacity-100 transform scale-100 animate-popup"
              : "opacity-0 scale-90"
          }`}
          padding="none"
        >
          <div className="flex flex-col lg:flex-row overflow-hidden">
            {/* Image */}
            <div className="relative lg:w-2/5 xl:w-2/5 overflow-hidden">
              <div className="relative w-full overflow-hidden">
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={imageUrl}
                  alt={title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                {/* <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                    <img src={pinnedImg} alt="pinned" className="h-4 w-4" />
                    <span className="text-sm font-semibold text-gray-800">
                      Pinned
                    </span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between bg-linear-to-br from-white via-purple-50/30 to-blue-50/30 relative">
              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <Heading2 className="text-gray-900 leading-tight group-hover:text-purple-600 transition-colors duration-300">
                    {title}
                  </Heading2>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Caption>
                      {new Date(createdAt).toLocaleDateString()}
                    </Caption>
                  </div>
                </div>

                <div className="space-y-4">
                  <BodyLarge className="text-gray-700 leading-relaxed">
                    {seeMore ? (
                      <span>{description}</span>
                    ) : (
                      <>
                        <span>{textObj.minText}</span>
                        {textObj.minifay && (
                          <button
                            onClick={() => setSeeMore(true)}
                            className="ml-1 text-purple-600 hover:text-purple-700 font-medium"
                          >
                            See more...
                          </button>
                        )}
                      </>
                    )}
                  </BodyLarge>

                  {seeMore && (
                    <button
                      onClick={() => setSeeMore(false)}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 relative z-10">
                <a
                  href={`blogs/${_id}`}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white bg-linear-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-200 overflow-hidden"
                >
                  <span className="relative z-10">🎉 Read Full Story</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes popup {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
            opacity: 1;
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-popup {
          animation: popup 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          position: absolute;
          border-radius: 2px;
          animation-name: confetti;
          animation-timing-function: ease-out;
        }
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        @keyframes balloon {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }
        .animate-balloon {
          animation: balloon 6s linear infinite;
        }
        @keyframes ribbon {
          from {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-ribbon {
          animation: ribbon 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default PinnedBlog;
