import React from "react";
import VideoShowSection from "./VideoShowSection";

interface FeedbackProps {
  id?: string;
  title?: string[];
  sorting?: string;
}

/**
 * Feedback Component (Server Component)
 * 
 * Main feedback page wrapper
 * Server-rendered for SEO
 */
const Feedback: React.FC<FeedbackProps> = ({
  id = "66a5eadacef6bbd5277663cc",
  title = ["Our Students", "Success And Feedback!"],
  sorting = "-createdAt",
}) => {
  return (
    <VideoShowSection id={id} title={title} sorting={sorting} />
  );
};

export default Feedback;
