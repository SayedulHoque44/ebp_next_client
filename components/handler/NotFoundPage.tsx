"use client";
// import img from "@/public/images/error404.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const NotFoundPage = () => {
  return (
    <div className={`w-full`}>
      <h2 className="text-primary text-center">Oops!</h2>
      <p className="body-1 mt-3 mb-10 text-center text-black-3">You are lost</p>
      <div className="relative h-[300px] w-full flex items-center justify-center">
        {/* <Image
          src={img}
          alt="404"
          width={720}
          height={300}
          className="mx-auto"
        /> */}
      </div>
      <div className="flex justify-center mt-12">
        <Link href={"/"}>
          <Button className="btn__lg bg-transparent text-secondary border border-secondary hover:bg-primary duration-300">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
