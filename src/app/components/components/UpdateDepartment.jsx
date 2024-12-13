import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateDepartmentIcon from "../app-icon/createDepartment.svg";
import { useSession } from 'next-auth/react';
import { addDepartment, getDepartmentById, updateDepartmentById } from '../action/DepartmentAction';
import { useForm } from 'react-hook-form';

export default function UpdateDepartment({ onClose, dep_id, onUpdate }) {

    const { data: session } = useSession();
    const token = session?.accessToken;

    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const fetchDepartmentData = async () => {
        try {
            await getDepartmentById(token, dep_id);
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    useEffect(() => {
        fetchDepartmentData();
    }, [dep_id]);

    const handleDepartmentUpdate = async (formData) => {
        try {
            const updatePayload = {
                dep_name: formData.dep_name,
                description: formData.description,
            };

            console.log("Updating department with ID:", dep_id, updatePayload);

            await updateDepartmentById(token, updatePayload, dep_id);
            console.log("Department updated successfully!");
            reset(); 
            onUpdate();
        } catch (error) {
            console.error("Error updating department:", error);
        }finally{
            onClose(); 
        }
    };

    

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

            {/* Centered Modal */}
            <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <form onSubmit={handleSubmit(handleDepartmentUpdate)} className="p-4 md:p-5">
                            <div className="flex gap-3 items-center">
                                <Image src={CreateDepartmentIcon} alt="Update Department Icon" />
                                <div>
                                    <span className="font-semibold text-[18px]">Update Department</span>
                                </div>
                            </div>

                            <div className="mb-3 mt-3">
                                <label
                                    htmlFor="department_name"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    id="department_name"
                                    {...register("dep_name", {
                                        required: "Department name is required",
                                        validate: {
                                            noPrefixSpace: (value) =>
                                                !/^\s/.test(value) || "Department name cannot start with a space",
                                            maxLength: (value) =>
                                                value.length <= 50 || "Department name cannot exceed 50 characters",
                                        },
                                    })}
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Input name..."
                                    required
                                />
                                {errors.dep_name && (
                                        <p className="text-red-500 text-sm">{errors.dep_name.message}</p>
                                    )}
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    {...register("description", {
                                        required: "Department name is required",
                                        validate: {
                                            noPrefixSpace: (value) =>
                                                !/^\s/.test(value) || "Department name cannot start with a space",
                                            maxLength: (value) =>
                                                value.length <= 100 || "Department name cannot exceed 50 characters",
                                        },
                                    })}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-[#F8FAFC] rounded-lg placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Input description..."
                                ></textarea>
                                {errors.description && (
                                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                                    )}
                            </div>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="py-2.5 w-full text-sm font-semibold text-[#344054] border rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-2.5 w-full text-sm font-semibold text-white bg-[#14AE5C] rounded-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
