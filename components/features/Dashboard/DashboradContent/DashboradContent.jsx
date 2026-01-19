import React from "react";
import usePContext from "../../../Util/Hooks/usePContext";
import {
  homeImg,
  adminMImg,
  simulazioneEsameImg,
  quizPerArgomentiImg,
  theoryimg,
  cercaimg,
  YTVideoImg,
  patenteBookImg,
  courseVideoImg,
  QNAPdfImg,
  bookImg,
  quiz_2,
  QNABookImg,
  ripassoErroriImg,
} from "../../../Constants/dashboardIcons";
import { paidGurdRoute } from "../../../Util/utils";
import { AppShowCase } from "../../AppPage";

const DashboradContent = ({ user }) => {
  const { loggedUser, loading } = usePContext();

  //

  const handleRoutes = (path, isPaidGurd) => {
    if (isPaidGurd) {
      paidGurdRoute(path, loggedUser);
    } else {
      return (window.location.href = path);
    }
  };

  return (
    <>
      <AppShowCase
        id={2}
        title={"Quiz Bangla Patente App"}
        info={"Our Android & IOS Quiz Latest App 😍"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {/* Home */}
        <div
          onClick={() => handleRoutes("/", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
            <img
              src={homeImg}
              alt="Home"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Home
          </h2>
        </div>

        {/* Admin Managment */}
        {user?.role === "Admin" && (
          <div
            onClick={() =>
              handleRoutes("/dashboard/adminManagment/userManagment", true)
            }
            className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="p-4 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
              <img
                src={adminMImg}
                alt="Admin"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
              Admin Management
            </h2>
          </div>
        )}

        {/* Quiz Per Argument */}
        <div
          onClick={() => handleRoutes("/dashboard/simulazioneEsame", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
            <img
              src={simulazioneEsameImg}
              alt="Theory"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Simulazione Esame
          </h2>
        </div>

        {/* Quiz Per Argument */}
        <div
          onClick={() => handleRoutes("/dashboard/quizPerArgument", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
            <img
              src={quizPerArgomentiImg}
              alt="Theory"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Quiz Per Argomenti
          </h2>
        </div>

        {/* Theory Con quiz Video */}
        <div
          onClick={() => handleRoutes("/dashboard/theory", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
            <img
              src={theoryimg}
              alt="Theory"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Theory Con Quiz
          </h2>
        </div>

        {/* Ripasso Errori */}
        <div
          onClick={() => handleRoutes("/dashboard/ripassoErrori", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
            <img
              src={ripassoErroriImg}
              alt="Theory"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Ripasso Errori
          </h2>
        </div>

        {/* Cerca */}
        <div
          onClick={() => handleRoutes("/dashboard/cerca", true)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
            <img
              src={cercaimg}
              alt="Search"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Cerca Quiz
          </h2>
          <p className="text-sm text-gray-500 text-center">
            এখানে ৭০০০+ কুইজ থেকে সার্চ করে পরতে পারবেন
          </p>
        </div>

        {/* Basic Video */}
        <div
          onClick={() => handleRoutes("/dashboard/PrivateVideos", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-red-50 rounded-full group-hover:bg-red-100 transition-colors duration-300">
            <img
              src={YTVideoImg}
              alt="Videos"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Basic Free Videos
          </h2>
        </div>

        {/* Patente Book */}
        <div
          onClick={() => handleRoutes("/dashboard/patenteBooks", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
            <img
              src={patenteBookImg}
              alt="Books"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Patente Books
          </h2>
        </div>

        {/* Courses video */}
        <div
          onClick={() => handleRoutes("/dashboard/courseVideo", false)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors duration-300">
            <img
              src={courseVideoImg}
              alt="Course Videos"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Course Videos
          </h2>
        </div>

        {/* QNA */}
        <div
          onClick={() => handleRoutes("/dashboard/QNAPdf", true)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-yellow-50 rounded-full group-hover:bg-yellow-100 transition-colors duration-300">
            <img
              src={QNAPdfImg}
              alt="QNA"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors text-center">
            SCHEDE ESAME PATENTE (QNA)
          </h2>
          <p className="text-sm text-gray-500 text-center">
            আমাদের স্কুল থেকে যত জন স্টুডেন্ট পাস করেছেন, তাদের পরীক্ষার প্রশ্ন
            এবং উত্তর গুলো PDF ফাইল এর মাধ্যমে দেওয়া আছে।
          </p>
        </div>

        {/* Quiz Book */}
        <div
          onClick={() => handleRoutes("/dashboard/quizBook", true)}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-pink-50 rounded-full group-hover:bg-pink-100 transition-colors duration-300">
            <img
              src={bookImg}
              alt="Quiz Book"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Quiz Book
          </h2>
          <p className="text-sm text-gray-500 text-center">
            এই বই এ সকল কুইজ এর প্রশ্ন এবং উত্তর পাবেন (৭০০০+ কুইজ)।
          </p>
        </div>

        {/* Trucchi */}
        <div
          onClick={() => handleRoutes("/dashboard/trucchi")}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-cyan-50 rounded-full group-hover:bg-cyan-100 transition-colors duration-300">
            <img
              src={quiz_2}
              alt="Trucchi"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Trucchi
          </h2>
        </div>

        {/* Student Notes */}
        <div
          onClick={() => handleRoutes("/dashboard/studentNotes")}
          className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
        >
          <div className="p-4 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors duration-300">
            <img
              src={QNABookImg}
              alt="Notes"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors">
            Student Note's
          </h2>
        </div>
      </div>
      {/* <AdSense.Google
        client="ca-pub-9434932401811333"
        slot="3670158091"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
        layoutKey="-gw-1+2a-9x+5c"
      /> */}
    </>
  );
};

export default DashboradContent;
