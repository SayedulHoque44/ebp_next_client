"use client";
import { Button } from "antd";
import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface DeleteItemByIdProps {
  itemId: string;
  objectCDNfullUrl?: string;
  deleteFromDB: (id: string) => Promise<{ data: { success: boolean; message: string } }>;
}

const DeleteItemById = ({
  itemId,
  objectCDNfullUrl,
  deleteFromDB,
}: DeleteItemByIdProps) => {
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
          } else {
            throw new Error("Failed to delete item");
          }
        } catch (error: any) {
          toast.error(error?.message || "Failed to delete item");
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
