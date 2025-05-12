import React, { useState } from 'react';

const PostAdPage = () => {
    const [adTitle, setAdTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [photos, setPhotos] = useState([]);

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setPhotos([...photos, ...files].slice(0, 12)); // Limit to 12 photos
    };

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    return (
        <div className='p-[50px]'>
        <div className="w-[852px] mx-auto border rounded-lg shadow-lg bg-white ">
            {/* Header */}
            <div>
                <h2 className="text-[28px] font-bold text-center pt-6 text-gray-800">POST YOUR AD</h2>
            </div>

            {/* Selected Category */}
            <div className="border-b border-gray-200">
                <div className="w-[851px] mx-auto flex items-center pt-6 pr-[30px] pb-4 pl-[30px]">
                    <p className="text-[16px] text-gray-500">
                        Electronics & Appliances - Computer Accessories
                    </p>
                    <a href="#" className="ml-auto text-[14px] text-blue-600 hover:underline">
                        Change
                    </a>
                </div>
            </div>

            {/* Include Some Details */}
            <div className="border-b border-gray-200">
                <div className="w-[851px] mx-auto pt-6 pr-[30px] pb-6 pl-[30px]">
                    <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Include Some Details</h3>
                    <div className="mb-6">
                        <label className="block text-[14px] font-medium text-gray-600 mb-2">Ad Title *</label>
                        <input
                            type="text"
                            value={adTitle}
                            onChange={(e) => setAdTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-[16px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter ad title (e.g., 'Brand New Laptop Charger')"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-[14px] font-medium text-gray-600 mb-2">Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-[16px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-36 resize-none"
                            placeholder="Describe your item (e.g., condition, features, reason for selling)"
                        />
                    </div>
                </div>
            </div>

            {/* Set a Price */}
            <div className="border-b border-gray-200">
                <div className="w-[851px] mx-auto pt-6 pr-[30px] pb-6 pl-[30px]">
                    <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Set a Price</h3>
                    <div className="mb-6">
                        <label className="block text-[14px] font-medium text-gray-600 mb-2">Price *</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-[16px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter price (e.g., 1500)"
                        />
                    </div>
                </div>
            </div>

            {/* Upload Up to 12 Photos */}
            <div className="border-b border-gray-200">
                <div className="w-[851px] mx-auto pt-6 pr-[30px] pb-6 pl-[30px]">
                    <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Upload Up to 12 Photos</h3>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {[...Array(12)].map((_, index) => (
                            <div
                                key={index}
                                className={`w-[150px] h-[150px] border-2 rounded-lg flex items-center justify-center relative ${
                                    photos[index] ? 'border-gray-300' : 'border-dashed border-gray-400'
                                }`}
                            >
                                {photos[index] ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(photos[index])}
                                            alt={`Uploaded ${index}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removePhoto(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] hover:bg-red-600 transition-all"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <label className="cursor-pointer">
                                        <svg
                                            width="30px"
                                            height="30px"
                                            viewBox="0 0 1024 1024"
                                            fillRule="evenodd"
                                            className="text-gray-400 hover:text-gray-600 transition-all"
                                        >
                                            <path
                                                className="rui-UJ1uk"
                                                d="M512 85.333c235.648 0 426.667 191.019 426.667 426.667s-191.019 426.667-426.667 426.667c-235.648 0-426.667-191.019-426.667-426.667s191.019-426.667 426.667-426.667zM512 170.667c-188.629 0-341.333 152.704-341.333 341.333s152.704 341.333 341.333 341.333c188.629 0 341.333-152.704 341.333-341.333s-152.704-341.333-341.333-341.333zM682.667 512c0 23.552-19.115 42.667-42.667 42.667h-85.333v85.333c0 23.552-19.115 42.667-42.667 42.667s-42.667-19.115-42.667-42.667v-85.333h-85.333c-23.552 0-42.667-19.115-42.667-42.667s19.115-42.667 42.667-42.667h85.333v-85.333c0-23.552 19.115-42.667 42.667-42.667s42.667 19.115 42.667 42.667v85.333h85.333c23.552 0 42.667 19.115 42.667 42.667z"
                                            />
                                        </svg>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-[12px] text-gray-500">
                        The first photo is the cover photo.
                    </p>
                </div>
            </div>

            {/* Confirm Your Location */}
            <div className="border-b border-gray-200">
                <div className="w-[851px] mx-auto pt-6 pr-[30px] pb-6 pl-[30px]">
                    <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Confirm Your Location</h3>
                    <div className="mb-6">
                        <label className="block text-[14px] font-medium text-gray-600 mb-2">Location *</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 text-[16px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mr-3"
                                placeholder="Enter your location (e.g., Mumbai, Maharashtra)"
                            />
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 1024 1024"
                                fillRule="evenodd"
                                className="text-gray-500 hover:text-gray-700 transition-all"
                            >
                                <path
                                    className="rui-UJ1uk"
                                    d="M512 85.333c141.824 0 256 114.176 256 256 0 141.824-256 597.333-256 597.333s-256-455.509-256-597.333c0-141.824 114.176-256 256-256zM512 170.667c-94.293 0-170.667 76.373-170.667 170.667 0 94.293 170.667 426.667 170.667 426.667s170.667-332.373 170.667-426.667c0-94.293-76.373-170.667-170.667-170.667zM512 341.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333-85.333-38.229-85.333-85.333 38.229-85.333 85.333-85.333z"
                                />
                            </svg>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-500">This field is mandatory.</p>
                </div>
            </div>

            {/* Review Your Details */}
            <div className="border-b border-gray-200">
                <div className="w-[851px] mx-auto pt-6 pr-[30px] pb-6 pl-[30px]">
                    <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Review Your Details</h3>
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-[24px] shadow-md">
                            S
                        </div>
                        <div className="ml-4">
                            <p className="text-[16px] font-semibold text-gray-800">Name</p>
                            <p className="text-[14px] text-gray-500">xyz.abc user</p>
                        </div>
                    </div>
                    <p className="text-[14px] text-gray-600 mb-6">
                        Let's verify your account
                        <br />
                        We will send you a confirmation code by SMS on the next step.
                    </p>
                    <div className="mb-6">
                        <label className="block text-[14px] font-medium text-gray-600 mb-2">Mobile Phone Number *</label>
                        <div className="flex items-center">
                            <span className="border border-gray-300 rounded-l-lg p-3 text-[16px] text-gray-700 bg-gray-100">+91</span>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-r-lg p-3 text-[16px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter mobile number"
                            />
                        </div>
                    </div>
                    <button className="w-full bg-[#ff6f61] text-white py-3 rounded-lg text-[16px] font-semibold hover:bg-[#e65a50] active:bg-[#d94f46] shadow-md transition-all">
                        POST NOW
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PostAdPage;