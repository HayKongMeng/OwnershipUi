"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { addAssetRequest } from '../action/AssetRequestAction';
import "../../../styles/globals.css"
import { useForm } from 'react-hook-form';
import { uploadImages } from '../service/file.service';
import { message } from 'antd';

export default function CreateAssetRequest({ onClose }) {
    const { data: session } = useSession();
    const token = session?.accessToken;
    const { reset, setValue, register, handleSubmit, formState: { errors }, } = useForm();

    const [previewImage, setPreviewImage] = useState(null);





    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                const filePreviewURL = URL.createObjectURL(file);
                setPreviewImage(filePreviewURL);
                setValue("attachment", file);
            } else {
                setPreviewImage(null);
                setValue("attachment", null);
                message.error("Please upload a valid image file.")
            }
        }
    };
    const handleAssetRequestPost = async (data) => {
        let attachmentUrl = null;
        console.log("work")
        if (data.attachment instanceof File) {
            const formData = new FormData();
            formData.append("file", data.attachment);

            const res = await uploadImages(formData);
            attachmentUrl = res.payload.fileUrl;
        }

        const newAssetRequest = {
            assetName: data.assetName,
            qty: data.qty,
            unit: data.unit,
            reason: data.reason,
            attachment: attachmentUrl,
        };
        console.log("asset", newAssetRequest);
        await addAssetRequest(token, newAssetRequest);
        console.log("first", newAssetRequest);
        reset();
        onClose();
    };
    return (
        <>
            {/* overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            {/* center */}
            <form onSubmit={handleSubmit(handleAssetRequestPost)} id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative p-4 w-[700px] h-[95%]">
                    <div className="relative bg-white rounded-lg shadow  h-full flex flex-col">
                        <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7L1 13" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 overflow-y-auto flex-grow custom-scroll">
                            <div className="flex gap-3">
                                <div>
                                    <span className="font-semibold text-lg leading-loose">Create Asset Request</span>
                                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">You can make a request to the admin</h3>
                                </div>
                            </div>
                            <hr className='mb-5' />
                            <div className='mb-3'>
                                <label htmlFor="assetName" className="block mb-2 text-sm font-medium  text-[#344054]">Asset Name</label>
                                <input
                                    {...register("assetName", {
                                        required: "Asset name is required",
                                        validate: {
                                            noPrefixSpace: (value) =>
                                                !/^\s/.test(value) || "Asset name cannot start with a space",
                                            maxLength: (value) =>
                                                value.length <= 50 || "Asset name cannot exceed 50 characters",
                                        },
                                    })}
                                    type="text" id="assetName" className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5  placeholder:text-[#273240] dark:text-white" placeholder="Computer" required />
                                {errors.assetName && (
                                    <p className="text-red-500 text-sm">{errors.assetName.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-[#344054]">
                                    Qty
                                </label>
                                <input
                                    {...register('qty', {
                                        required: true,
                                        validate: (value) => value > 0 || "Qty must be greater than 0", // Ensure the value is greater than 0
                                    })}
                                    type="text"
                                    id="qty"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#273240] dark:text-white"
                                    placeholder="10 Unit"
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} // Only numbers allowed
                                />
                                {errors.qty && (
                                    <p className="text-red-500 text-sm">{errors.qty.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="unit" className="block mb-2 text-sm font-medium  text-[#344054]">Unit</label>
                                <input
                                    {...register("unit", {
                                        required: "Unit name is required",
                                        validate: {
                                            noPrefixSpace: (value) =>
                                                !/^\s/.test(value) || "Unit name cannot start with a space",
                                            maxLength: (value) =>
                                                value.length <= 50 || "Unit name cannot exceed 50 characters",
                                        },
                                    })}
                                    type="text" id="unit" className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5  placeholder:text-[#273240] dark:text-white" placeholder="10 Unit" required />
                                {errors.unit && (
                                    <p className="text-red-500 text-sm">{errors.unit.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#344054]">Reason</label>
                                <textarea {...register('reason')} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-[#F8FAFC] rounded-lg  dark:border-gray-600 placeholder:text-[#273240] dark:text-white" placeholder="I cannot turn on my computer it always blue screen while turn it on"></textarea>
                            </div>
                            <div className="mb-10">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#344054]">Attachment</label>
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
                                <button onClick={onClose} type="button" className="text-[#344054] bg-white font-semibold border-[1px] focus:ring-4 focus:ring-red-300 rounded-lg text-sm inline-flex items-center px-12 py-2.5 text-center">
                                    Cancel
                                </button>
                                <button type="submit" className="py-2.5 px-12 ms-3 text-sm font-semibold text-white focus:outline-none bg-[#4b68ff] rounded-lg border border-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
