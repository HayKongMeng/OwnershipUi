"use client"
import React from 'react'

export default function FilterPopup({ onClose }) {
    return (
        <>
            {/* overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            {/* center */}
            <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
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
                                    <span className="font-semibold text-lg leading-loose">Create User</span>
                                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">Report everything that related your asset who want to the admin know</h3>
                                </div>
                            </div>
                           
                            <div className="mb-3">
                                <label htmlFor="dropdown" className="block mb-2 text-sm font-medium text-[#344054]">
                                    Condition
                                </label>
                                <div className="relative">
                                    <select
                                        id="dropdown"
                                        className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none placeholder:text-[#BCBCBC] dark:text-white"
                                    >
                                        <option value="">Choose Department</option>
                                        <option value="admin">IT</option>
                                        <option value="editor">Korea</option>
                                        <option value="viewer">Music</option>
                                    </select>
                                    <svg
                                        className="absolute top-3 right-3 w-4 h-4 text-gray-500 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dropdown" className="block mb-2 text-sm font-medium text-[#344054]">
                                    User
                                </label>
                                <div className="relative">
                                    <select
                                        id="dropdown"
                                        className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none placeholder:text-[#BCBCBC] dark:text-white"
                                    >
                                        <option value="">Choose Department</option>
                                        <option value="admin">IT</option>
                                        <option value="editor">Korea</option>
                                        <option value="viewer">Music</option>
                                    </select>
                                    <svg
                                        className="absolute top-3 right-3 w-4 h-4 text-gray-500 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-4">
                            <button onClick={onClose} type="button" className="text-[#344054] bg-white font-semibold border-[1px] focus:ring-4 focus:ring-red-300 rounded-lg text-sm inline-flex items-center px-12 py-2.5 text-center">
                                Cancel
                            </button>
                            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-semibold text-white focus:outline-none bg-[#14AE5C] rounded-lg border border-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <style jsx>{`
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
            `}</style> */}
        </>
    )
}
