import { useSession } from 'next-auth/react';
import React from 'react';
import { updatePassword } from '../service/user.service';
import { useForm } from 'react-hook-form';
import Toastify from 'toastify-js';
import "../../../styles/globals.css"
import "toastify-js/src/toastify.css";
import { message } from 'antd';

export default function ChangePassword({ onClose }) {

    const { data: session, status } = useSession();
    const token = session?.accessToken;
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const handleProfilePassword = async (formData) => {
        try {
            const updatePayload = {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            }
            const res = await updatePassword(token, updatePayload);

            if (res.status === 404 && res.detail) {
                message.error(res.detail)
                return;
            }
            if (res.payload == true) {
                message.success("Change password sucess!!!")
                reset();
                onClose();
            }

            reset();
            onClose();
        } catch (error) {
            console.error("Error updating department:", error);
        }
    };

    return (
        <>
            {/* overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            {/* center */}
            <form onSubmit={handleSubmit(handleProfilePassword)} id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative p-4 w-[700px] h-auto">
                    <div className="relative bg-white rounded-lg shadow h-full flex flex-col">
                        <button
                            onClick={onClose}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center focus:outline-none"
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
                        <div className="p-4 md:p-5 overflow-y-auto flex-grow custom-scroll">
                            <div className="flex gap-3">
                                <div>
                                    <span className="font-semibold text-lg text-[#170F49] leading-loose">Change Password</span>
                                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">Please, change your password carefully!</h3>
                                </div>
                            </div>
                            <hr />
                            <div className='mb-3 mt-5'>
                                <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-[#344054]">Old Password</label>
                                <input
                                    {...register('oldPassword')}
                                    type="password"
                                    id="old_password"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#BCBCBC] focus:outline-none border-none"
                                    placeholder="**********"
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-[#344054]">New Password</label>
                                <input
                                    {...register('newPassword', {
                                        required: 'New password is required',
                                        validate: {
                                            minLength: (value) =>
                                                value.length >= 8 || 'Password must be at least 8 characters long',
                                            hasSymbol: (value) =>
                                                /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain at least one symbol',
                                            hasNumber: (value) =>
                                                /\d/.test(value) || 'Password must contain at least one number',
                                            hasLetter: (value) =>
                                                /[a-zA-Z]/.test(value) || 'Password must contain at least one letter',
                                        },
                                    })}
                                    type="password"
                                    id="new_password"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#BCBCBC] focus:outline-none border-none"
                                    placeholder="**********"
                                    required
                                />
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-[#344054]">Confirm Password</label>
                                <input
                                    {...register('confirmPassword')}
                                    type="password"
                                    id="confirm_password"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#BCBCBC] focus:outline-none border-none"
                                    placeholder="**********"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end p-4">
                            <button
                                onClick={onClose}
                                type="button"
                                className="w-[150px] text-[#344054] bg-white font-semibold border border-gray-200 rounded-lg text-sm inline-flex items-center px-12 py-2.5"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-[150px] ms-3 text-sm font-semibold text-white focus:outline-none bg-[#14AE5C] rounded-lg border-none"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
}
