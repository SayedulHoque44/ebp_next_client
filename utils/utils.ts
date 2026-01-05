import toast from "react-hot-toast";

export const minimizeText = (text: string, mobile: boolean) => {
  const textSize = mobile ? 100 : 200;
  let minText = text;
  let minifay = false;
  if (text.length > textSize) {
    minText = text.substring(0, textSize);
    minifay = true;
  }
  return { minText, minifay };
};

// get object key
export const getObjectKeyFromUrl = (cdnUrl: string, imageUrl: string) => {
  if (imageUrl) {
    return imageUrl?.substring(imageUrl?.indexOf(cdnUrl) + cdnUrl.length);
  }
  return "";
};
// get object key
export const getFileNameFromCdnUrl = (
  cdnUrl: string,
  folderName: string,
  imageUrl: string
) => {
  if (imageUrl) {
    return imageUrl.substring(cdnUrl.length + folderName.length);
  }
  return "";
};

// paid gurd

export const paidGurdRoute = (path: string, loggedUser: any) => {
  if (loggedUser?.role === "Admin") {
    return (window.location.href = path);
  }
  if (loggedUser.status === "Passed") {
    return toast.error("You are already passed!");
  }
  // user active and paid
  if (loggedUser?.status === "Active" && loggedUser?.paymentStatus === "paid") {
    return (window.location.href = path);
  } else if (loggedUser?.status === "Active") {
    return toast.error("কিছু সম্যসা হয়েছে !");
  } else if (loggedUser?.paymentStatus === "paid") {
    return toast.error(
      "আপনার কোর্স টাইম শেষ হয়ে গিয়েছে, টাইম বাডানোর জন্য যোগাযোগ করুন।"
    );
  } else {
    return toast.error("আপনাকে কোর্সটা কিনতে হবে।");
  }
};

export const generateUniqImageID = (fileName: string) => {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const nameParts = fileName.split(".");
  const extension = nameParts.pop();
  const name = nameParts.join(".");

  return `${name}-${uniqueId}.${extension}`;
};

// aws config
export const EBP_Images_CDN_BaseUrl =
  process.env.NEXT_PUBLIC_AWS_IMAGES_CDN_BASE_URL;
export const fileMaxSize = 400 * 1024 * 1024; // 400MB
export const chunkSize = 5 * 1024 * 1024; // 100MB
