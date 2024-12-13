"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllDepartment } from "../service/department.service";
import { createUser } from '../service/user.service';
import { useRouter } from 'next/navigation';

export default function CreateUser({ onClose }) {

    const { data: session } = useSession();
    const token = session?.accessToken;
    const router = useRouter()
    const [department, setDepartments] = useState([])
    const { reset, register, handleSubmit, formState: { errors }, } = useForm();

    const handleUserPost = async (data) => {
        console.log("data", data);

        const newUser = {
            fullName: data.fullName,
            username: data.username,
            password: data.password,
            department: data.department,
            email: data.email
        };
        console.log("newUser", newUser);
        await createUser(token, newUser);
        console.log("first", newUser);
        // router.push('/admin/user')
        onClose()
    };

    const fetchDepartments = async () => {
        const allDepartment = await getAllDepartment(token, 1);
        console.log("alldeparmt", allDepartment)
        setDepartments(allDepartment)
    }

    useEffect(() => {
        fetchDepartments()
    }, [])

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

            {/* Centered Modal */}
            <form onSubmit={handleSubmit(handleUserPost)} id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative p-4 w-[700px] h-auto">
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
                        <div className="p-4 md:p-5 overflow-y-auto flex-grow custom-scroll">
                            <div className="flex gap-3">
                                <div>
                                    <span className="font-semibold text-lg text-[#170F49] leading-loose">Create User</span>
                                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">Report everything related to your asset for the admins knowledge.</h3>
                                </div>
                            </div>
                            <hr />
                            <div className='mb-3 mt-5'>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-[#344054]">Full Name</label>
                                <input
                                    {...register("fullName", {
                                        required: "Fullname is required",
                                        validate: {
                                            noPrefixSpace: (value) =>
                                                !/^\s/.test(value) || "Fullname name cannot start with a space",
                                            maxLength: (value) =>
                                                value.length <= 50 || "Fullname name cannot exceed 50 characters",
                                        },
                                    })}
                                    type="text"
                                    id="first_name"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#344054]">Username</label>
                                <input
                                    {...register("username", {
                                        required: "Fullname is required",
                                        validate: {
                                            noPrefixSpace: (value) =>
                                                !/^\s/.test(value) || "Username name cannot start with a space",
                                            maxLength: (value) =>
                                                value.length <= 50 || "Username name cannot exceed 50 characters",
                                        },
                                    })}
                                    type="text"
                                    id="username"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Enter your username"
                                    required
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#344054]">Password</label>
                                <input
                                    {...register('password')}
                                    {...register('password', {
                                        required: 'Password is required',
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
                                    id="password"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Enter your password"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dropdown" className="block mb-2 text-sm font-medium text-[#344054]">Department</label>
                                <div className="relative">
                                    <select
                                        {...register("department", { required: true })}
                                        id="dropdown"
                                        className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    >
                                        <option value="">Choose Department</option>
                                        {department.map((dep, key) => (
                                            <option key={key} value={dep.dep_id}>
                                                {dep.dep_name}
                                            </option>
                                        ))}
                                        {/* <option value="korea">Korea</option>
                                        <option value="music">Music</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#344054]">Email</label>
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email address',
                                        },
                                    })}
                                    type="email"
                                    id="email"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end p-4">
                            <button onClick={onClose} type="button" className="w-[150px] text-[#344054] bg-white font-semibold border rounded-lg text-sm inline-flex items-center px-12 py-2.5 text-center">
                                Cancel
                            </button>
                            <button type="submit" className="w-[150px] ms-3 text-sm font-semibold text-white bg-[#14AE5C] rounded-lg">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
