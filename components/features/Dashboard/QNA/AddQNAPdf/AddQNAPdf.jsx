import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

import toast from "react-hot-toast";
import PButton from "../../../../Shared/Components/PButton";
import { useCreateQNAPdfMutation } from "../../../../redux/Api/QNAManagmentApi/QNAManagmentApi";

const AddQNAPdf = () => {
  const [createQNAQuery] = useCreateQNAPdfMutation();
  const [loading, setLoading] = useState(false);
  //
  const handleAddYoutubeVideo = async (e) => {
    e.preventDefault();
    //

    //
    const form = e.target;
    const title = form.title.value;
    const link = form.link.value;

    const PdfInfo = { title, link };
    //
    setLoading(true);

    const createQNAPDF = await createQNAQuery(PdfInfo);
    if (createQNAPDF.data.success) {
      toast.success(createQNAPDF.data.message);
    }
    setLoading(false);
  };
  return (
    <>
      <div
        className="flex flex-col mt-5"
        title="Add Video"
        onClick={() => window.my_modal_3.showModal()}>
        <PButton text={<GrAdd />} className={"font-bold text-2xl"} />
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleAddYoutubeVideo}>
            <h1 className="text-center">Add PDF</h1>
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="title"
              placeholder="Pdf Title"
            />
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="link"
              placeholder="Drive share link"
            />

            <PButton loading={loading} text={"Add"} type="submit" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddQNAPdf;
