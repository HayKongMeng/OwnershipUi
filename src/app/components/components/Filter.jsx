import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FilterIcon from "../app-icon/filter.svg";
import UserCard from "./UserCard";
import ArrowUp from "../app-icon/up-arrow.svg";
import ArrowDown from "../app-icon/down-arrow.svg";
import ConditionOption from "./ConditionOption";
import { getAllUser } from '../service/user.service';
import { useSession } from 'next-auth/react';

export default function Filter({ onClose, onSave, initialFilters }) {

    const { data: session } = useSession();
    const token = session?.accessToken;

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState("Select your user");
    const [selectedCondition, setSelectedCondition] = useState("Select your condition");
    const [users, setUsers] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);

    // const users = [
    //     { id: 1, name: 'Thon Rithyhong', role: 'Front-end Dev', imageSrc: 'https://cdn.builder.io/api/v1/image/assets/2f013c53cc004a938ce597cfa1a4f4fb/a7488c93767f1a28b0c78a87ba37444560037a9666c335ca9129ca43a0a466b5?apiKey=2f013c53cc004a938ce597cfa1a4f4fb&' },
    //     { id: 2, name: 'Henry Fisher', role: 'Financial', imageSrc: 'https://cdn.builder.io/api/v1/image/assets/2f013c53cc004a938ce597cfa1a4f4fb/e2121bffd5c3f95aeaee44a0e7aa7eff19ba71282855e9a1b04a3344968f107b?apiKey=2f013c53cc004a938ce597cfa1a4f4fb&' }
    // ];

    const conditions = [
        { label: 'Good', color: 'emerald' },
        { label: 'Medium', color: 'orange' },
        { label: 'Low', color: 'rose' }
    ];

    const handleUserSelect = (userId, fullName) => {
        setSelectedUserId(userId);
        setSelectedUserName(fullName); 
        setIsUserDropdownOpen(false);
    };

    const handleConditionSelect = (label) => {
        setSelectedCondition(label);
        setIsConditionDropdownOpen(false); 
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen((prev) => !prev);
    };

    const toggleConditionDropdown = () => {
        setIsConditionDropdownOpen((prev) => !prev);
    };

    const handleSave = () => {
        onSave({
            selectedDate,
            selectedUserId,
            selectedCondition,
        });
        onClose();
    };


    const fetchUser = async () => {
        const allUser = await getAllUser(token)
        console.log("allUser", allUser)
        setUsers(allUser)
    }

    useEffect(() => {
        fetchUser();
    }, [token]);

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            {/* Modal Center */}
            <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            onClick={onClose}
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5">
                            <div className='flex gap-3 items-center'>
                                <Image src={FilterIcon} alt="Filter Icon"/>
                                <div>
                                    <span className='font-semibold text-[18px]'>Filter</span>
                                </div>
                            </div>

                            {/* Date Input */}
                            <div className='mb-3 mt-3'>
                                <label htmlFor="date"
                                       className="block mb-2 text-sm font-medium text-[#344054]">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className='w-full rounded-lg'
                                />
                            </div>

                            <section className="flex flex-col max-w-[410px] mt-3">
                                <label className="text-sm text-slate-500 mb-2">Condition:</label>
                                <button
                                    onClick={toggleConditionDropdown}
                                    className="flex items-center justify-between w-full px-4 py-2 bg-slate-50 rounded-lg text-base text-slate-800"
                                >
                                    <span>{selectedCondition}</span>
                                    <Image
                                        src={isConditionDropdownOpen ? ArrowUp : ArrowDown}
                                        alt="Toggle Condition"
                                        className="w-5 h-5"
                                    />
                                </button>
                                {isConditionDropdownOpen && (
                                    <ul className="mt-2 bg-white rounded-lg shadow max-h-[160px] overflow-y-auto">
                                    {conditions.map((condition, index) => (
                                        <ConditionOption
                                            key={index}
                                            label={condition.label}
                                            color={condition.color}
                                            isSelected={selectedCondition === condition.label}
                                            onClick={() => {
                                                handleConditionSelect(condition.label);
                                                toggleConditionDropdown();
                                            }}
                                        />
                                    ))}
                                </ul>
                                
                                )}
                            </section>

                            {/* Users Dropdown */}
                            <section className="flex flex-col max-w-[410px] my-6">
                                <label className="text-sm text-slate-500 mb-2">User:</label>
                                <button
                                    onClick={toggleUserDropdown}
                                    className="flex items-center justify-between w-full px-4 py-2 bg-slate-50 rounded-lg text-base text-slate-800"
                                >
                                    <span>{selectedUserName}</span>
                                    <Image
                                        src={isUserDropdownOpen ? ArrowDown : ArrowDown}
                                        alt="Toggle User"
                                        className="w-5 h-5"
                                    />
                                </button>
                                {isUserDropdownOpen && (
                                    <div className="mt-2 bg-white rounded-lg shadow max-h-[200px] overflow-y-auto">
                                        {users?.map((user) => (
                                            <UserCard
                                                key={user.userId}
                                                imageSrc={user.profileImg}
                                                name={user.fullName}
                                                role={user.role}
                                                isSelected={selectedUserId === user.id}
                                                onClick={() => handleUserSelect(user.userId, user.fullName)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4 w-full gap-x-3">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="flex-1 text-[#344054] bg-white font-semibold border-[1px] rounded-lg text-sm inline-flex justify-center items-center py-2.5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="flex-1 py-2.5 text-sm font-semibold text-white focus:outline-none bg-[#4B68FF] rounded-lg border border-gray-200"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
