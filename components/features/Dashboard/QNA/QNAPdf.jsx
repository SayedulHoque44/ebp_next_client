import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import usePContext from "../../../Util/Hooks/usePContext";
import {
  useDeleteQNAPdfMutation,
  useGetQNAPdfQuery,
} from "../../../redux/Api/QNAManagmentApi/QNAManagmentApi";
import AddQNAPdf from "./AddQNAPdf/AddQNAPdf";
import AdSense from "react-adsense";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QNAPdf = () => {
  const { data, isLoading: isDataLoading } = useGetQNAPdfQuery(undefined);
  const [deletePdfQuery, { isLoading }] = useDeleteQNAPdfMutation();
  const { loggedUser } = usePContext();

  const handleDeleteSinglePdf = (pdfId) => {
    if (isLoading) {
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
        const deletedPdf = await deletePdfQuery(pdfId);
        if (deletedPdf.data.sucess) {
          toast.success(deletedPdf.data.message);
        }
      }
    });
  };

  return (
    <div className="py-10">
      {/* <AdSense.Google
        client="ca-pub-9434932401811333"
        slot="9568790958"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
        layoutKey="-gw-1+2a-9x+5c"
      /> */}
      <h1 className="text-4xl mt-5 text-center">SCHEDE ESAME PATENTE (QNA)</h1>
      <p className="text-xl my-3 text-center">
        আমাদের স্কুল থেকে যত জন স্টুডেন্ট পাস করেছেন, তাদের পরীক্ষার প্রশ্ন এবং
        উত্তর গুলো PDF ফাইল এর মাধ্যমে দেওয়া আছে।
      </p>

      <div className="py-5 space-y-3">
        {loggedUser?.role === "Admin" && <AddQNAPdf />}
        {isDataLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="p-3 bg-P-Black my-5 rounded flex justify-between items-center"
              >
                <Skeleton width="70%" height={24} className="bg-gray-700" />
                {loggedUser?.role === "Admin" && (
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
            {data?.map(({ _id, title, link }) => (
              <div
                key={_id}
                className="p-3 bg-P-Black  my-5 rounded flex justify-between"
              >
                <a className="text-P-gry flex-1" href={link}>
                  {title}
                </a>
                {loggedUser?.role === "Admin" && (
                  <MdDelete
                    size={25}
                    onClick={() => handleDeleteSinglePdf(_id)}
                    className="text-red-400 cursor-pointer"
                  />
                )}
              </div>
            ))}
            {data?.length === 0 && (
              <h1 className="py-3 text-center text-red-400">Empty!</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QNAPdf;
