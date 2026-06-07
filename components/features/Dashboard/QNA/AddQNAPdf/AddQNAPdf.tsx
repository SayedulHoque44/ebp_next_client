"use client";

import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { FaFilePdf, FaLink } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import toast from "react-hot-toast";
import QnaPdfHooks from "@/features/QnaPdf/hooks/qnaPdf.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/constendData";
import Button from "@/components/ui/Button";
import { successToast } from "@/utils/toast";

interface PdfInfo {
  title: string;
  link: string;
}

const inputClassName =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:text-base";

const AddQNAPdf: React.FC = () => {
  const queryClient = useQueryClient();
  const createQNAQuery = QnaPdfHooks.useCreateQnaPdf({
    onSuccess: (response) => {
      console.log(response);
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QNA_PDFS] });
        successToast(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create QNA PDF");
    },
  });
  const [loading, setLoading] = useState(false);
  const isSubmitting = loading || createQNAQuery.isPending;

  const handleAddPdf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const title =
      (form.elements.namedItem("title") as HTMLInputElement)?.value.trim() ||
      "";
    const link =
      (form.elements.namedItem("link") as HTMLInputElement)?.value.trim() || "";

    if (!title || !link) return;

    setLoading(true);
    try {
      await createQNAQuery.mutateAsync({ title, link } satisfies PdfInfo);
      form.reset();
    } catch {
      // Error handled by onError callback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-linear-to-r from-gray-50 to-white px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 sm:h-11 sm:w-11">
            <FaFilePdf className="text-lg text-primary-600" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              Add QNA PDF
            </h2>
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Upload a new exam sheet title and PDF link for students.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleAddPdf}
        className="space-y-4 p-4 sm:space-y-5 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="space-y-2">
            <label
              htmlFor="qna-pdf-title"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <MdTitle className="shrink-0 text-gray-400" />
              Title
            </label>
            <input
              id="qna-pdf-title"
              type="text"
              name="title"
              placeholder="e.g. Exam Sheet March 2025"
              className={inputClassName}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="qna-pdf-link"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FaLink className="shrink-0 text-xs text-gray-400" />
              PDF Link
            </label>
            <input
              id="qna-pdf-link"
              type="url"
              name="link"
              placeholder="https://example.com/document.pdf"
              className={inputClassName}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-end sm:pt-5">
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            leftIcon={<GrAdd className="text-base" />}
            className="h-11 w-full cursor-pointer sm:w-auto sm:min-w-[140px]"
          >
            {isSubmitting ? "Adding..." : "Add PDF"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddQNAPdf;
