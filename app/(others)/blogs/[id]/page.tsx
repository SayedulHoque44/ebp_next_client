import React from "react";
import SingleBlogContainer from "@/components/features/Blog/SingleBlogContainer/SingleBlogContainer";
import { Metadata } from "next";
import BlogApis from "@/features/Blog/apis/blog.api";

type Props = {
  params: { id: string };
};

// Generate dynamic metadata based on blog data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const result = await BlogApis.getSingleBlogHandler({
      blogId: params.id,
    });

    if (result?.data?.title) {
      return {
        title: `${result.data.title} | Easy Bangla Patente`,
        description:
          result.data.description || "Blog Details | Easy Bangla Patente",
        openGraph: {
          title: result.data.title,
          description: result.data.description || "",
          images: result.data.imageUrl ? [result.data.imageUrl] : [],
          type: "article",
        },
      };
    }
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Blog | Easy Bangla Patente",
    description: "Blog Details | Easy Bangla Patente",
  };
}

const page = ({ params }: Props) => {
  return (
    <>
      <SingleBlogContainer />
    </>
  );
};

export default page;
