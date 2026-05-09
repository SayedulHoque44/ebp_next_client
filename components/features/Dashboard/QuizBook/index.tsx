"use client";
import React from "react";
import Book from "../PatenteBooks/Book";
import Container from "@/components/ui/Container";
// import AdSense from "react-adsense";
import SectionHeader from "@/components/shared/SectionHeader";
import { BookOpen } from "@phosphor-icons/react";

const QuizBook = () => {
  return (
    <div className="py-10">
      <Container>
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="4252612022"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
        <SectionHeader
          badge={{
            icon: <BookOpen className="mr-2" />,
            text: "Quiz Book",
            className: "bg-pink-100 text-pink-700",
          }}
          title="Quiz Books"
          description="এই বই এ সকল কুইজ এর প্রশ্ন এবং উত্তর পাবেন (৭০০০+ কুইজ)।"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {/*Manually added pdf */}
          <Book
            href={
              "https://drive.google.com/file/d/1ONXJZu6DCLOT4em8Nbm1r9PIViVDBf78/view"
            }
            book={{
              title: "Quiz Book",
              description: "৭০০০+ কুইজ পডতে পারবেন।",
              coverImage: `${process.env.NEXT_PUBLIC_AWS_IMAGES_CDN_BASE_URL}Ebp_Assets/quiz-book-01.jpg`,
            }}
          />
        </div>
        {/* <AdSense.Google
          client="ca-pub-9434932401811333"
          slot="7984246542"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
          layoutKey="-gw-1+2a-9x+5c"
        /> */}
      </Container>
    </div>
  );
};

export default QuizBook;
