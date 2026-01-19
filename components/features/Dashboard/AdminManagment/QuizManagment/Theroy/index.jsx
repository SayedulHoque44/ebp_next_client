import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Image } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import qimg from "../../../../../assets/Images/dashboard/question.png";
import TranslationInModal, {
  TranslationFnText,
} from "../../../../../Shared/Components/Translation";
import TextSpech from "../../../../../Shared/Components/TextSpech";
import { TheoryProvider } from "..";

const TopicTheroy = () => {
  const { state } = useLocation();
  const { theory, _id, title, index, theoryImages, videoUrl, shouldShowLock } =
    state?.topic;
  const { isTheory, isAdmin } = useContext(TheoryProvider);

  if (shouldShowLock) {
    return;
  }
  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-4 sm:p-5 md:p-6 re">
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4 sm:mb-5 md:mb-6 border-b pb-3">
          <span className="bg-P-primary text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm sm:text-base">
            {index + 1}
          </span>
          <span className="leading-snug">{title}</span>
        </h2>

        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {!isAdmin && (
            <>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {theory?.split(" ").map((item, idx) => (
                  <TranslationInModal
                    key={idx}
                    text={item}
                    component={
                      <span className="underline cursor-pointer hover:text-P-primary transition-colors text-sm sm:text-base">
                        {item}
                      </span>
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <TextSpech text={theory} />
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">
                  Bengali Translation:
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {TranslationFnText(theory)}
                </p>
              </div>
            </>
          )}

          {isAdmin && (
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              {theory}
            </p>
          )}

          {theoryImages?.length > 0 && (
            <div className="flex gap-4 sm:gap-5 md:gap-6 flex-wrap justify-center py-3 sm:py-4">
              {theoryImages.map((ele, idx) => (
                <Figure key={idx} url={ele.imageUrl} title={ele.figure} />
              ))}
            </div>
          )}

          {videoUrl && (
            <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg xl:w-3/4 mx-auto">
              <ReactPlayer
                url={videoUrl}
                width={"100%"}
                controls={true}
                loop={true}
              />
            </div>
          )}
        </div>

        <Link
          to={`${
            isTheory
              ? "/dashboard/theory/quiz"
              : "/dashboard/adminManagment/quizManagment/quiz"
          }/${_id}`}
          state={{ topic: state?.topic }}
          className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-50"
        >
          <div className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105">
            <img className="h-5 w-5 sm:h-6 sm:w-6" src={qimg} alt="" />
            <span className="font-medium text-sm sm:text-base">
              Mostra i Quiz
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const Figure = ({ url, title }) => {
  return (
    <div>
      <Image className="w-40 sm:w-44 md:w-48" src={url} alt="" />
      <h4 className="text-center mt-2 font-semibold text-sm sm:text-base">
        {title}
      </h4>
    </div>
  );
};

export const TheoryComponent = ({ topic, cerca, isFetching }) => {
  const { theory, _id, title, index, theoryImages, videoUrl } = topic || {};

  const { isTheory, isAdmin } = useContext(TheoryProvider);

  // Show skeleton while fetching or if topic data is not available
  if (isFetching || !topic || !title) {
    return (
      <div className="space-y-6 bg-gray-50 min-h-screen p-4 sm:p-5 md:p-6">
        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Title Skeleton */}
          <div className="mb-4 sm:mb-5 md:mb-6 border-b pb-3">
            <Skeleton height={32} width="60%" className="mb-2" />
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {!isAdmin && (
              <>
                {/* Theory Text Skeleton */}
                <div className="space-y-2">
                  <Skeleton count={3} height={24} />
                  <Skeleton height={24} width="80%" />
                </div>

                {/* Text Speech Button Skeleton */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton circle width={40} height={40} />
                </div>

                {/* Bengali Translation Skeleton */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                  <Skeleton height={20} width="40%" className="mb-2" />
                  <Skeleton count={2} height={20} />
                </div>
              </>
            )}

            {isAdmin && (
              <div className="space-y-2">
                <Skeleton count={4} height={24} />
                <Skeleton height={24} width="75%" />
              </div>
            )}

            {/* Images Skeleton */}
            <div className="flex gap-4 sm:gap-5 md:gap-6 flex-wrap justify-center py-3 sm:py-4">
              <Skeleton width={192} height={192} className="rounded-xl" />
              <Skeleton width={192} height={192} className="rounded-xl" />
            </div>

            {/* Video Skeleton */}
            <div className="w-full bg-gray-200 rounded-xl overflow-hidden shadow-lg xl:w-3/4 mx-auto">
              <Skeleton height={400} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-4 sm:p-5 md:p-6">
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4 sm:mb-5 md:mb-6 border-b pb-3">
          {title}
        </h2>

        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {!isAdmin && (
            <>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap text-base sm:text-lg leading-relaxed">
                {theory?.split(" ").map((item, idx) => (
                  <TranslationInModal
                    key={idx}
                    text={item}
                    component={
                      <span className="underline cursor-pointer hover:text-P-primary transition-colors">
                        {item}
                      </span>
                    }
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <TextSpech text={theory} />
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">
                  Bengali Translation:
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {TranslationFnText(theory)}
                </p>
              </div>
            </>
          )}

          {isAdmin && (
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              {theory}
            </p>
          )}

          {theoryImages?.length > 0 && (
            <div className="flex gap-4 sm:gap-5 md:gap-6 flex-wrap justify-center py-3 sm:py-4">
              {theoryImages.map((ele, idx) => (
                <Figure key={idx} url={ele.imageUrl} title={ele.figure} />
              ))}
            </div>
          )}

          {videoUrl && (
            <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg xl:w-3/4 mx-auto">
              <ReactPlayer
                url={videoUrl}
                width={"100%"}
                controls={true}
                loop={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicTheroy;
