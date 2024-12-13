import React from 'react';

function ConditionOption({ label, color, isSelected, onClick }) {
    return (
        <li>
            <button
                role="option"
                aria-selected={isSelected}
                className={`flex overflow-hidden justify-start items-start py-3 pr-3 pl-4 w-full rounded-md cursor-pointer ${
                    isSelected ? 'text-white bg-indigo-400' : 'text-gray-800'
                } hover:bg-blue-500 hover:text-white`}
                onClick={onClick}
            >
                <div className={`gap-2.5 px-3 py-1 rounded min-h-[28px] w-[75px]`}>
                    {label}
                </div>
            </button>
        </li>
    );
}

export default ConditionOption;
