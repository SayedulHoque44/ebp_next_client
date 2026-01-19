import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import PButton from "../../../../Shared/Components/PButton";
import { patenteAxios } from "../../../../Util/Hooks/useAxiosSecure";

const AddVideoInPart = ({ refetch, partId }) => {
  const [loading, setLoading] = useState(false);

  const handleAddVideoInPart = (e) => {
    e.preventDefault();

    //
    const form = e.target;
    const title = form.title.value;
    const videoLink = form.videoLink.value;

    setLoading(true);

    patenteAxios
      .post("/AddVideoInPart", { title, videoLink, partId })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success(`${title} Added!`);
          form.reset();
          refetch();
          setLoading(false);
        } else {
          toast.error("Data Not Inserted!");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
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
          <form className="flex flex-col gap-4" onSubmit={handleAddVideoInPart}>
            <h1 className="text-center">Add Video In This Part</h1>
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="title"
              placeholder="Video Title"
            />

            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="videoLink"
              placeholder="video Link"
            />
            <PButton text={"Add"} loading={loading} type="submit" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddVideoInPart;
