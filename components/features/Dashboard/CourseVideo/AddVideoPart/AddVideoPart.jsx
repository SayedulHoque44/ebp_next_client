import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import PButton from "../../../../Shared/Components/PButton";
import { patenteAxios } from "../../../../Util/Hooks/useAxiosSecure";

const AddVideoPart = ({ refetch }) => {
  const [loading, setLoading] = useState(false);

  const handleVideoPart = (e) => {
    e.preventDefault();

    //
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    setLoading(true);

    patenteAxios
      .post("/addVideoPart", { title, description })
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
          <form className="flex flex-col gap-4" onSubmit={handleVideoPart}>
            <h1 className="text-center">Add Books</h1>
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="title"
              placeholder="Video Part Title"
            />

            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="description"
              placeholder="Video Part Description"
            />
            <PButton text={"Add"} loading={loading} type="submit" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddVideoPart;
