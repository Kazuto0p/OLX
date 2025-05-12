import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav2 = ({ backTo = -1 }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (typeof backTo === 'string') {
            navigate(backTo);
        } else {
            navigate(-1); // Go back in history
        }
    };

    return (
        <div className="bg-red-400 w-screen h-12 flex items-center">
            <div className="ml-2 cursor-pointer" onClick={handleBack}>
                <img
                    className="object-contain h-6"
                    src="src/assets/icons/back.png"
                    alt="Back"
                />
            </div>
        </div>
    );
};

export default Nav2;
