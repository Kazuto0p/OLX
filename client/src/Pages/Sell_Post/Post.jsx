import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const subcategories = {
        Cars: ['Cars'],
        Bike: ['Bikes'],
        'Electronics & Appliances': ['Mobile Phones', 'Computers & Laptops'],
    };

    const toggleCategory = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    const handleSubcategoryClick = (subcategory) => {
        switch (subcategory) {
            case 'Cars':
                navigate('/addcar');
                break;
            case 'Bikes':
                navigate('/bike');
                break;
            default:
                navigate('/add');
                break;
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 sm:py-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">POST YOUR AD</h2>
            <div className="max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg sm:text-xl font-semibold">CHOOSE A CATEGORY</h3>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 border-r border-gray-200 max-h-[400px] overflow-y-auto">
                        <ul className="w-full">
                            {Object.keys(subcategories).map((category) => (
                                <li
                                    key={category}
                                    className="flex items-center justify-between border-b border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 p-3 sm:p-4 cursor-pointer transition-colors duration-200"
                                    onClick={() => toggleCategory(category)}
                                >
                                    <div className="flex items-center gap-3">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            className="flex-shrink-0"
                                        >
                                            {category === 'Cars' && (
                                                <path
                                                    d="M744.747 124.16l38.4 33.28 36.949 258.731 107.221 107.179 11.349 27.435v193.963l-38.827 38.784h-38.741v116.352h-77.568v-116.352h-543.061v116.352h-77.568v-116.352h-38.741l-38.827-38.827v-193.877l11.349-27.435 107.264-107.221 36.949-258.731 38.4-33.28h465.493zM768.555 474.325h-513.109l-92.544 92.501v139.093h698.197v-139.093l-92.544-92.501zM298.667 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM725.333 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM711.083 201.685h-398.165l-27.904 195.115h453.888l-27.861-195.072z"
                                                />
                                            )}
                                            {category === 'Bike' && (
                                                <path
                                                    d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"
                                                />
                                            )}
                                            {category === 'Electronics & Appliances' && (
                                                <path
                                                    d="M149.76 128l-64.427 62.848v480.853l69.333 67.84h317.781l0.725 75.477h-169.6v80.981h416.128v-80.981h-161.621l-0.683-75.435h315.648l65.621-68.693v-482.389l-75.733-60.501h-713.173zM170.24 638.72v-414.848l15.232-14.848h646.656l21.632 17.28v413.184l-18.176 19.072h-645.12l-20.224-19.84z"
                                                />
                                            )}
                                        </svg>
                                        <p className="text-base sm:text-lg">{category}</p>
                                    </div>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 1024 1024"
                                        fill="currentColor"
                                        className="flex-shrink-0"
                                    >
                                        <path
                                            d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"
                                        />
                                    </svg>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 bg-gray-50 max-h-[400px] overflow-y-auto">
                        {selectedCategory && (
                            <ul className="w-full">
                                {subcategories[selectedCategory].map((subcategory, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between border-b border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-3 sm:p-4 cursor-pointer transition-colors duration-200"
                                        onClick={() => handleSubcategoryClick(subcategory)}
                                    >
                                        <p className="text-base sm:text-lg">{subcategory}</p>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            className="flex-shrink-0"
                                        >
                                            <path
                                                d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"
                                            />
                                        </svg>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;