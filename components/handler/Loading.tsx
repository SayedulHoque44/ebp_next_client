import styles from "@/styles/Loading.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading...",
  description: "Get better insights faster.",
};

const Loading = () => {
  return (
    <div className="fixed z-10 flex items-center justify-center w-full h-full bg-primary">
      <div
        className={
          styles.shadow_animate +
          " relative overflow-hidden w-[200px] h-[40px] lg:w-[270px] lg:h-[52px] flex justify-center items-center"
        }
      >
        <div className="absolute bg-primary w-[192px] h-[32px] lg:h-[44px] lg:w-[262px] z-10 top-[4px] left-[4px]"></div>
        <div
          className={
            styles.spin +
            " absolute h-[40px] w-[380px] lg:h-[52px] lg:w-[380px] z-1"
          }
        ></div>
        <span className="z-10 text-lg font-bold uppercase lg:text-2xl text-secondary">
          Easy Bangla Patente
        </span>
      </div>
    </div>
  );
};

export default Loading;
