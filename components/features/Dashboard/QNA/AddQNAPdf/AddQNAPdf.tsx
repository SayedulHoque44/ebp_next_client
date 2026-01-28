"use client";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import toast from "react-hot-toast";
import QnaPdfHooks from "@/features/QnaPdf/hooks/qnaPdf.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/constendData";
import Button from "@/components/ui/Button";

interface PdfInfo {
  title: string;
  link: string;
}

const AddQNAPdf: React.FC = () => {
  const queryClient = useQueryClient();
  const createQNAQuery = QnaPdfHooks.useCreateQnaPdf({
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QNA_PDFS] });
        toast.success(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create QNA PDF");
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddYoutubeVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement)?.value || "";
    const link = (form.elements.namedItem("link") as HTMLInputElement)?.value || "";

    const PdfInfo: PdfInfo = { title, link };

    setLoading(true);
    try {
      await createQNAQuery.mutateAsync(PdfInfo);
      form.reset();
    } catch (error) {
      // Error handled by onError callback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 bg-P-Black my-5 rounded">
      <form onSubmit={handleAddYoutubeVideo} className="flex gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          required
        />
        <Button
          type="submit"
          disabled={loading || createQNAQuery.isPending}
          className="flex items-center gap-2"
        >
          <GrAdd />
          {loading || createQNAQuery.isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default AddQNAPdf;
