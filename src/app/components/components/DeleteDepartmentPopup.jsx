import Image from 'next/image';
import React, { useEffect } from 'react';
import Delete from "../app-icon/delete.svg";
import { useSession } from 'next-auth/react';
import { deleteDepartmentById, getDepartmentById } from '../action/DepartmentAction';
import { useForm } from 'react-hook-form';

export default function DeleteDepartmentPopup({ onClose, dep_id, onUpdate }) {

  const { data: session } = useSession();
  const token = session?.accessToken;
  const { reset, handleSubmit, formState: { errors } } = useForm();

  const fetchDepartmentData = async () => {
    try {
      await getDepartmentById(token, dep_id);
      console.log("dept",dep_id)
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, [dep_id]);

  const handleDepartmentDelete = async () => {
    try {
      // setDepartments((prev) => prev.filter((dept) => dept.id !== dep_id));
      console.log("test",dep_id)
        await deleteDepartmentById(token, dep_id);
        reset();
        onClose();
    } catch (error) {
        console.error("Error deleting department:", error);
    }
};


  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Popup */}
      <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
        <div className="relative p-4 w-full max-w-md max-h-full z-50">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            {/* Close button */}
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            {/* Popup content */}
            <div className="p-4 md:p-5">
              <div className="flex gap-3">
                <Image src={Delete} alt="Delete Icon" />
                <div>
                  <span className="font-semibold text-sm">Delete department</span>
                  <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this department?
                  </h3>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[#344054] bg-white font-semibold border-[1px] focus:ring-4 focus:ring-red-300 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button

                  onClick={handleDepartmentDelete}
                  type="submit"
                  className="py-2.5 px-5 ms-3 text-sm font-semibold text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}