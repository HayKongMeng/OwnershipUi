export default function ViewRequestAsset({ onClose, record }) {
    const handleApprove = () => {
        console.log("Approved:", record);
        // Add your approve logic here
    };

    const handleReject = () => {
        console.log("Rejected:", record);
        // Add your reject logic here
    };

    if (!record) return null;
    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            <div
                id="popup-modal"
                tabIndex="-1"
                className="fixed inset-0 flex items-center justify-center z-50 overflow-y-hidden"
            >
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
                        <div className="p-4 md:p-5 flex-grow custom-scroll no-scrollbar overflow-y-auto">
                            <div className="flex gap-3">
                                <div>
                                    <span className="font-semibold text-lg leading-loose">
                                        View Asset Request
                                    </span>
                                    <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        View detail asset request to make easy considered
                                    </h3>
                                </div>
                            </div>
                            <hr/>
                            <div className="flex gap-3 mt-5 mb-5 rounded-md items-center">
                                <img
                                    src={record.profileImg || "https://via.placeholder.com/150"}
                                    alt={record.title}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h1 className="text-[16px] font-semibold">{record.fullName || "User Name"}</h1>
                                    <p className="text-xs font-medium text-[#7f7f7f]">{record.email || "user@example.com"}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="asset_name"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    Asset Name
                                </label>
                                <input
                                    type="text"
                                    id="asset_name"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Asset Name"
                                    value={record.assetName || ""}
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="asset_name"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    Qty
                                </label>
                                <input
                                    type="text"
                                    id="asset_name"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Asset Name"
                                    value={record.qty || ""}
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="asset_name"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    Unit
                                </label>
                                <input
                                    type="text"
                                    id="asset_name"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Asset Name"
                                    value={record.unit || ""}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="problem"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    reason
                                </label>
                                <textarea
                                    id="problem"
                                    rows="4"
                                    className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                                    placeholder="Describe the issue"
                                    value={record.reason || ""}
                                    readOnly
                                ></textarea>
                            </div>
                            <div className="mb-10">
                                <label
                                    htmlFor="attachment"
                                    className="block mb-2 text-sm font-medium text-[#344054]"
                                >
                                    Attachment
                                </label>
                                <img
                                    src={record.attachment || "https://via.placeholder.com/500"}
                                    alt="Attachment"
                                    className="rounded-md w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
