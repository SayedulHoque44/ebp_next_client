"use client";
import { ReactNode } from "react";
import { ExternalToast, toast } from "sonner";

type ToastMsgProps = string | ReactNode;
type ToastOptionsProps = ExternalToast;

export const successToast = (
  msg: ToastMsgProps,
  options?: ToastOptionsProps
) => {
  return toast.success(msg, options);
};
export const errorToast = ({
  msg,
  options,
  error,
}: {
  msg?: any;
  error?: any;
  options?: ToastOptionsProps;
}) => {
  if (error) {
    return toast.error(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong",
      options
    );
  }
  return toast.error(msg, options);
};
export const infoToast = (msg: ToastMsgProps, options?: ToastOptionsProps) => {
  return toast.info(msg, options);
};
