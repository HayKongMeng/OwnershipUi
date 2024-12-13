"use client";

import React, { useEffect, useRef, useState } from "react";
import linear from "../app-icon/linear.svg";
import linear2 from "../app-icon/linear2.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Arrow from "../app-icon/arrow.svg";
import DepeteIcon from "../app-icon/delete-icon.svg";
import DeletePop from "../app-icon/trash-pop.svg";
import EditIcon from "../app-icon/edit-icon.svg";
import { deleteUserAccount } from "../action/UserAction";
import { useSession } from "next-auth/react";

const getBackgroundStyle = (department) => {
  switch (department) {
    case "Visual Designer":
      return "bg-gradient-to-r from-pink-500 to-pink-300";
    case "HR Manager":
      return "bg-gradient-to-r from-blue-500 to-blue-300";
    case "Marketing Specialist":
      return "bg-gradient-to-r from-green-500 to-green-300";
    case "Data Analyst":
      return "bg-gradient-to-r from-yellow-500 to-yellow-300";
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-300";
  }
};

export default function Card({ id, fullName, department,profileImg }) {
  const router = useRouter();
  const { data: session } = useSession();
    const token = session?.accessToken;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const dropdownRef = useRef(null);

  

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const backgroundStyle = getBackgroundStyle(department);

  const handleDeleteUser = async () => {
    await deleteUserAccount(token, id)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[100%] h-auto border border-gray-200 rounded-xl shadow ${backgroundStyle}`}
      style={{
        backgroundImage: `url(${linear.src}), url(${linear2.src})`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "-35% -35%, top right",
      }}
    >


      <div className="flex justify-end px-4 pt-4 relative" >
        
        <button
          onClick={toggleDropdown}
          className="rotate-90 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 rounded-lg text-sm p-1.5 transition duration-200 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path
              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md z-10 w-32 space-y-1">
            <button
              onClick={() => router.push(`/admin/user/edit/${id}`)}
              className="block px-3 py-2 text-sm text-gray-700  w-full text-left hover:rounded-t-md"
            >
              <div className="bg-green-100 flex items-center space-x-2 px-2 py-1.5 w-full rounded-[6px]">
                <Image src={EditIcon} alt={"edit-icon"} />
                <span className="text-green-500">Edit</span>
              </div>
            </button>

            <button
              onClick={() => setIsDeletePopupOpen(true)}
              className="block px-3 py-2 text-sm text-gray-700 w-full text-left"
            >
              <div className="bg-red-200 flex items-center space-x-2 px-2 py-1.5 w-full rounded-[6px]">
                <Image src={DeletePop} alt="delete-icon" />
                <span className="text-red-500">Delete</span>
              </div>
            </button>
          </div>
        )}
        {isDeletePopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md">
              <div className="flex justify-start gap-4">
                <span>
                  <Image src={DepeteIcon} alt="delete-icon" />
                </span>
                <article>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Delete User
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Are you sure you want to delete this user?
                  </p>
                </article>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setIsDeletePopupOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("User deleted",id);
                    handleDeleteUser()
                    setIsDeletePopupOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center pb-5">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          src={profileImg ?  profileImg : "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"}
          alt="Profile"
        />
        <h5 className="mb-1 text-xl font-semibold text-[#273240]">{fullName ? fullName : "Unknown"}</h5>
        <span className="text-sm text-[#637381]">{department ? department : "N/A"}</span>
        <div onClick={() => router.push(`/admin/user/show/${id}`)} className="flex mt-4">      
          <a
            href="#"
            className="py-4 px-24 sm:px-6 sm:py-3 md:px-14 md:py-4 lg:px-12 lg:py-5 text-center text-sm sm:text-base lg:text-md font-medium bg-[#F3F6FD] rounded-lg text-[#8A92A6] flex items-center justify-center gap-2 hover:shadow-md transition-all"
          >
            View Details <Image src={Arrow} alt="arrow" />
          </a>
        </div>
      </div>
    </div>
  );
}
