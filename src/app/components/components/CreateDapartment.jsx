import Image from 'next/image';
import React from 'react';
import CreateDepartmentIcon from "../app-icon/createDepartment.svg";
import { addDepartment } from '../action/DepartmentAction';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { formatDateBC } from '../../utils/formatDate';
import { message } from 'antd';

export default function CreateDepartment({ onClose, onAddDepartment, departments }) {

    const { data: session } = useSession();
    const token = session?.accessToken;
    const { reset, register, handleSubmit, formState: { errors }, } = useForm();

    const handleDepartmentPost = async (department) => {
        const maxId = departments.reduce((max, dept) =>
            Math.max(max, parseInt(dept.id)), 0);
        const newDepartment = {
            dep_name: department.dep_name,
            description: department.description,
            created_at: formatDateBC(new Date().toISOString()),
            updated_at: formatDateBC(new Date().toISOString()),
            id: maxId + 1,
        };

        onAddDepartment(newDepartment);

        try {
            await addDepartment(token, {
                dep_name: department.dep_name,
                description: department.description,
            });
            message.success("Department added successfully!");
        } catch (error) {
            console.error("Failed to add department:", error);
            onAddDepartment(null, newDepartment.dep_id);
        } finally {
            reset();
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
                        <form onSubmit={handleSubmit(handleDepartmentPost)}>
                            <div className="p-4 md:p-5">
                                <div className="flex gap-3 items-center">
                                    <Image src={CreateDepartmentIcon} alt="Create Department Icon" />
                                    <div>
                                        <span className="font-semibold text-[18px]">Create Department</span>
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
                                        {...register("dep_name", {
                                            required: "Department name is required",
                                            validate: {
                                                noPrefixSpace: (value) =>
                                                    !/^\s/.test(value) || "Department name cannot start with a space",
                                                maxLength: (value) =>
                                                    value.length <= 50 || "Department name cannot exceed 50 characters",
                                            },
                                        })}
                                        type="text"
                                        id="department_name"
                                        className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                        placeholder="Input department..."
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
                                        {...register("description", {
                                            required: "Department name is required",
                                            validate: {
                                                noPrefixSpace: (value) =>
                                                    !/^\s/.test(value) || "Department name cannot start with a space",
                                                maxLength: (value) =>
                                                    value.length <= 50 || "Department name cannot exceed 50 characters",
                                            },
                                        })}
                                        id="description"
                                        rows="4"
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
                                        className="py-2.5 w-full text-sm font-semibold text-white bg-[#4B68FF] rounded-lg"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
