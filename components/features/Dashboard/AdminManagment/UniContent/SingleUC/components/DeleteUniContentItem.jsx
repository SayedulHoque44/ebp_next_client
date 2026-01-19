import { Button } from "antd";
import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../../../Util/utils";
import toast from "react-hot-toast";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const DeleteItemById = ({ itemId, objectCDNfullUrl, deleteFromDB }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    Swal.fire({
      title: `Are You Sure Delete It!`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const deletedItem = await deleteFromDB(itemId);
          if (deletedItem?.data?.success) {
            toast.success(deletedItem.data.message);
          } else if (deletedItem.error) {
            throw new Error(deletedItem.error.data.message);
          }
        } catch (error) {
          toast.error(error.message);
          //console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <Button
      title={objectCDNfullUrl}
      disabled={loading}
      onClick={handleDelete}
      type="primary"
      danger
    >
      Delete
    </Button>
  );
};

export default DeleteItemById;
