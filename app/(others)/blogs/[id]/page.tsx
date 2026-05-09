import React from "react";
import SingleBlogContainer from "@/components/features/Blog/SingleBlogContainer/SingleBlogContainer";
import { Metadata } from "next";
import BlogApis from "@/features/Blog/apis/blog.api";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * Generate dynamic metadata for single blog page
 * Server-side metadata generation for SEO
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const result = await BlogApis.getSingleBlogHandler({
      blogId: id,
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
          publishedTime: result.data.createdAt,
          ...(result.data.updatedAt && {
            modifiedTime: result.data.updatedAt,
          }),
        },
        twitter: {
          card: "summary_large_image",
          title: result.data.title,
          description: result.data.description || "",
          images: result.data.imageUrl ? [result.data.imageUrl] : [],
        },
        alternates: {
          canonical: `/blogs/${id}`,
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

const page = async ({ params }: Props) => {
  return <SingleBlogContainer />;
};

export default page;
