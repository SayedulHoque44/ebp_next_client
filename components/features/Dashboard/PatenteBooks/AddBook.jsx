import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import PButton from "../../../Shared/Components/PButton";
import { patenteAxios } from "../../../Util/Hooks/useAxiosSecure";

const AddBook = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const handleAddYoutubeVideo = (e) => {
    e.preventDefault();

    //
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const coverImage = e.target.coverImage.files[0];

    //

    if (!coverImage) {
      toast.error("Select Book Cover page");
      return;
    }

    // -------------uplode image -----
    // data packet
    const formData = new FormData();
    formData.append("image", coverImage);

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
        const coverImage = imageData.data.display_url;
        // img uplode success
        if (imageData.success) {
          const Book = { title, description, coverImage };
          //
          patenteAxios
            .post("/addBook", Book)
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
        }
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
          <form
            className="flex flex-col gap-4"
            onSubmit={handleAddYoutubeVideo}>
            <h1 className="text-center">Add Books</h1>
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="title"
              placeholder="Book Title"
            />
            <p>Select Cover Page : </p>
            <input
              type="file"
              id="image"
              name="coverImage"
              required
              accept="image/*"
              placeholder="select your photo"
            />
            <input
              type="text"
              className="p-2 border-2 border-P-primary"
              required
              name="description"
              placeholder="Book Description"
            />
            <PButton text={"Add"} loading={loading} type="submit" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddBook;
