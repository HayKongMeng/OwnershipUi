import React from 'react';

const UserCard = ({ imageSrc, name, role, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex gap-3.5 items-center px-4 py-2.5 w-full rounded-lg cursor-pointer 
                        ${isSelected ? 'bg-gray-100' : 'bg-white'} 
                        hover:bg-gray-50 transition-all duration-200 ease-in-out`}
        >
            <img
                loading="lazy"
                src={imageSrc}
                alt={`${name}'s profile picture`}
                className="object-contain shrink-0 w-11 aspect-square"
            />
            <div className="flex flex-col">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-gray-500">{role}</div>
            </div>
        </div>
    );
};

export default UserCard;
