import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import PButton from "../../../Shared/Components/PButton";
import { patenteAxios } from "../../../Util/Hooks/useAxiosSecure";

const AddPages = ({ refetch, bookId }) => {
  const [loading, setLoading] = useState(false);
  const handleAddYoutubeVideo = (e) => {
    e.preventDefault();

    //
    const form = e.target;
    const page = e.target.page.files[0];

    //

    if (!page) {
      toast.error("Select Book page");
      return;
    }

    // -------------uplode image -----
    // data packet
    const formData = new FormData();
    formData.append("image", page);

    // url value
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgBB_key
    }`;
    //
    setLoading(true);

    //
    // fetching for uplode cover img in imagebb
    fetch(url, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((imageData) => {
        // img Url
        const pageUrl = imageData.data.display_url;
        // img uplode success

        if (imageData.success) {
          patenteAxios
            .patch(`/AddPage/${bookId}`, { pageUrl })
            .then((res) => {
              setLoading(false);
              //console.log(res.data);
              if (res.data.modifiedCount > 0) {
                toast.success(`Page Added!`);
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
        }
      });
  };
  return (
    <>
      <div
        className="flex flex-col mt-5"
        title="Add Video"
        onClick={() => window.my_modal_3.showModal()}
      >
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
            onSubmit={handleAddYoutubeVideo}
          >
            <h1 className="text-center">Add Pages</h1>
            <p>Select Page : </p>
            <input
              type="file"
              id="image"
              name="page"
              required
              accept="image/*"
              placeholder="select your page"
            />
            <PButton text={"Add"} loading={loading} type="submit" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddPages;
