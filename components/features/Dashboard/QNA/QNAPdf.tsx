"use client";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import QnaPdfHooks from "@/features/QnaPdf/hooks/qnaPdf.hooks";
import AddQNAPdf from "./AddQNAPdf/AddQNAPdf";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/constendData";
import useAuth from "@/features/Auth/hooks/useAuth";

interface QNAPdfItem {
  _id: string;
  title: string;
  link: string;
}

const QNAPdf: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading: isDataLoading } = QnaPdfHooks.useGetQnaPdfs({
    queryKey: [],
    options: {
      enabled: true,
    },
  });
  const deletePdfQuery = QnaPdfHooks.useDeleteQnaPdf({
    onSuccess: async (response) => {
      if (response.data?.sucess) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QNA_PDFS] });
        toast.success(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete PDF");
    },
  });
  const { user } = useAuth();

  const handleDeleteSinglePdf = (pdfId: string) => {
    if (deletePdfQuery.isPending) {
      return;
    }
    Swal.fire({
      title: `Are You Sure delete this pdf!`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePdfQuery.mutateAsync({ pdfId });
      }
    });
  };

  return (
    <div className="py-10">
      <h1 className="text-4xl mt-5 text-center">SCHEDE ESAME PATENTE (QNA)</h1>
      <p className="text-xl my-3 text-center">
        আমাদের স্কুল থেকে যত জন স্টুডেন্ট পাস করেছেন, তাদের পরীক্ষার প্রশ্ন এবং
        উত্তর গুলো PDF ফাইল এর মাধ্যমে দেওয়া আছে।
      </p>

      <div className="py-5 space-y-3">
        {user?.role === "Admin" && <AddQNAPdf />}
        {isDataLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="p-3 bg-P-Black my-5 rounded flex justify-between items-center"
              >
                <Skeleton width="70%" height={24} className="bg-gray-700" />
                {user?.role === "Admin" && (
                  <Skeleton
                    circle
                    width={25}
                    height={25}
                    className="bg-gray-700"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {data?.data?.map(({ _id, title, link }: QNAPdfItem) => (
              <div
                key={_id}
                className="p-3 bg-P-Black  my-5 rounded flex justify-between"
              >
                <a className="text-P-gry flex-1" href={link} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
                {user?.role === "Admin" && (
                  <MdDelete
                    size={25}
                    onClick={() => handleDeleteSinglePdf(_id)}
                    className="text-red-400 cursor-pointer"
                  />
                )}
              </div>
            ))}
            {data?.data?.length === 0 && (
              <h1 className="py-3 text-center text-red-400">Empty!</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QNAPdf;
