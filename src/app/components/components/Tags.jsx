import React from 'react';

const Tag = ({ label, color }) => {
    const bgColor = {
        rose: 'bg-rose-100',
        emerald: 'bg-emerald-50',
        orange: 'bg-orange-50'
    };

    return (
        <div
            className={`gap-2.5 self-stretch px-3 py-1 my-auto rounded min-h-[28px] w-[75px] ${bgColor[color]}`}
            role="status"
            aria-label={label}
        >
            {label}
        </div>
    );
};

export default Tag;
