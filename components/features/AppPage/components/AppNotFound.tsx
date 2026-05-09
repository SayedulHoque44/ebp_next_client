import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Heading1, Body } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

/**
 * AppNotFound Component (Server Component)
 * 
 * 404 page for app not found
 * Server-rendered for SEO
 */
export const AppNotFound: React.FC = () => {
  return (
    <Container className="py-12 sm:py-20">
      <div className="text-center">
        <Heading1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          App Not Found
        </Heading1>
        <Body className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          The requested app could not be found.
        </Body>
        <Link href="/">
          <Button variant="primary" size="lg">
            Go Back Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};
