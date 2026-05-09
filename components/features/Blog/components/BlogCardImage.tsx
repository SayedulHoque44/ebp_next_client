
import React from "react";
import Image from "next/image";
import { Caption } from "@/components/ui/Typography";

interface BlogCardImageProps {
  imageUrl?: string;
  title: string;
  pin?: boolean;
}

/**
 * BlogCardImage Component (Server Component)
 * 
 * Blog card image with pin badge
 * Server-rendered for SEO and performance
 */
export const BlogCardImage: React.FC<BlogCardImageProps> = ({
  imageUrl,
  title,
  pin,
}) => {
  return (
    <div className="relative overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
height={200}
width={400}

        unoptimized
          alt={title}
          
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      )}
      {pin && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full">
          <Caption className="text-xs font-semibold">Pinned</Caption>
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
