"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateReport } from "../service/report.service";
import {uploadImages} from "../service/file.service"
import Loading from "./Loading";
export default function UpdateReportIssue({ onClose, record }) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [previewImage, setPreviewImage] = useState(record.attachment || null);
  const [loading, setLoading] = useState()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      assetName: record.assetName,
      problem: record.problem,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePreviewURL = URL.createObjectURL(file);
      setPreviewImage(filePreviewURL);
      setValue("attachment", file); 
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      let attachmentUrl = record.attachment;
      if (formData.attachment instanceof File) {

        const fileData = new FormData();
        fileData.append("file", formData.attachment);

        console.log("file",fileData)
        const res = await uploadImages(fileData);
        console.log("attachmenturl")

        attachmentUrl = res.payload.fileUrl;
      }

      const updatedReport = {
        assetName: formData.assetName,
        problem: formData.problem,
        attachment: attachmentUrl,
      };

      console.log("jfja")
      const resAsset = await updateReport(token, updatedReport, record.reportId);
      console.log("Updated Report:", resAsset);

      onClose();
    } catch (error) {
      console.error("Failed to fetch report:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      {/* center */}
      <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
      {loading ? (
          <Loading />
        ) : (
        <div className="relative p-4 w-[700px] h-[95%]">
          <div className="relative bg-white rounded-lg shadow h-full flex flex-col">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 overflow-y-auto flex-grow custom-scroll">
              <div className="flex gap-3">
                <div>
                  <span className="font-semibold text-lg leading-loose">Update Report Issue</span>
                  <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                    You can update report issue that created
                  </h3>
                </div>
              </div>
              <hr className="mb-5" />
              <div className="mb-3">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-[#344054]">
                  Asset Name
                </label>
                <input
                  {...register("assetName", { required: "Asset name is required" })}
                  type="text"
                  id="first_name"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#273240] dark:text-white"
                  placeholder="Computer"
                />
                {errors.assetName && <p className="text-red-500 text-sm">{errors.assetName.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="problem" className="block mb-2 text-sm font-medium text-[#344054]">
                  Problem
                </label>
                <textarea
                  {...register("problem", { required: "Problem description is required" })}
                  id="problem"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-[#F8FAFC] rounded-lg dark:border-gray-600 placeholder:text-[#273240] dark:text-white"
                  placeholder="Describe the issue"
                ></textarea>
                {errors.problem && <p className="text-red-500 text-sm">{errors.problem.message}</p>}
              </div>
              <div className="mb-10">
                <label htmlFor="attachment" className="block mb-2 text-sm font-medium text-[#344054]">
                  Attachment
                </label>
                <label htmlFor="attachment" className="cursor-pointer">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Attachment Preview"
                      className="rounded-md w-full mb-4"
                    />
                  ) : (
                    <div className="rounded-md w-full h-40 flex items-center justify-center bg-gray-100 border border-dashed text-gray-500">
                      Click to upload
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="attachment"
                  accept="image/*"
                  className="hidden"
                  {...register("attachment")}
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end p-4 gap-5">
                <button
                  onClick={onClose}
                  type="button"
                  className="text-[#344054] bg-white font-semibold border-[1px] focus:ring-4 focus:ring-red-300 rounded-lg text-sm inline-flex items-center px-12 py-2.5 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-12 ms-3 text-sm font-semibold text-white focus:outline-none bg-[#4b68ff] rounded-lg border border-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
      </div>
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 10px;
          border: 2px solid #f1f1f1;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
