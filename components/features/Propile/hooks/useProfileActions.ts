import { useState } from "react";
import toast from "react-hot-toast";
import { exportToCSV, exportToJSON, downloadFile } from "../utils";
import { IProfileUser } from "../types";

export const useProfileActions = (userData: IProfileUser, loggedUser?: { role?: string; name?: string }) => {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleShareProfile = async () => {
    const profileUrl = `${window.location.origin}/propile/${userData._id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${userData.name}'s Profile`,
          text: `Check out ${userData.name}'s profile`,
          url: profileUrl,
        });
        toast.success("Profile shared successfully!");
        return;
      }
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Profile link copied to clipboard!");
    } catch (error) {
      if (typeof document !== "undefined") {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = profileUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          toast.success("Profile link copied to clipboard!");
          return;
        } catch {
          if ((error as { name?: string })?.name !== "AbortError") {
            toast.error("Could not share profile link");
          }
        }
      }
    }
  };

  const handleExportData = () => {
    if (loggedUser?.role !== "Admin") return toast.error("Only admins can export user data");
    setShowExportModal(true);
  };

  const handleExportCSV = () => {
    try {
      const content = exportToCSV(userData, loggedUser);
      downloadFile(content, "text/csv", "csv", userData.name);
      setShowExportModal(false);
      toast.success("Data exported as CSV successfully!");
    } catch {
      toast.error("Failed to export CSV");
    }
  };

  const handleExportJSON = () => {
    try {
      const content = exportToJSON(userData, loggedUser);
      downloadFile(content, "application/json", "json", userData.name);
      setShowExportModal(false);
      toast.success("Data exported as JSON successfully!");
    } catch {
      toast.error("Failed to export JSON");
    }
  };

  const handleCopyContact = async (type: string, value?: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    toast.success(`${type} copied to clipboard!`);
  };

  return { showExportModal, setShowExportModal, handleShareProfile, handleExportData, handleExportCSV, handleExportJSON, handleCopyContact };
};
