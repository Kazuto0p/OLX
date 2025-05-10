import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const categories = [
    {
      title: "Cars",
      items: [
        "Cars",
        "Bikes",
        "Motorcycles",
        "Scooters",
        "Bicycle",
        "Spare Parts",
      ],
    },
    {
      title: "Properties",
      items: [
        "For Sale: Houses & Apartments",
        "For Rent: Houses & Apartments",
        "Lands & Plots",
        "For Sale: Shops & Offices",
        "PG & Guest Houses",
      ],
    },
    {
      title: "Mobile Phones",
      items: ["Mobile Phones", "Accessories", "Tablets"],
    },
    {
      title: "Commercial Vehicles",
      items: ["Commercial & Other Vehicles", "Spare Parts"],
    },
    {
      title: "Jobs",
      items: [
        "Data entry & Back office",
        "Sales & Marketing",
        "BPO & Telecaller",
        "Driver",
        "Office Assistant",
        "Delivery & Collection",
        "Teacher",
        "Cook",
        "Receptionist & Front office",
        "Operator & Technician",
        "Other Jobs",
      ],
    },
    {
      title: "Furniture",
      items: [
        "Sofa & Dining",
        "Beds & Wardrobes",
        "Home Decor & Garden",
        "Kids Furniture",
        "Other Household Items",
      ],
    },
    {
      title: "Fashion",
      items: ["Men", "Women", "Kids"],
    },
    {
      title: "Books, Sports & Hobbies",
      items: [
        "Books",
        "Gym & Fitness",
        "Musical Instruments",
        "Sports Equipment",
        "Other Hobbies",
      ],
    },
    {
      title: "Pets",
      items: [
        "Fishes & Aquarium",
        "Pet Food & Accessories",
        "Dogs",
        "Other Pets",
      ],
    },
    {
      title: "Services",
      items: [
        "Education & Classes",
        "Tours & Travel",
        "Electronics Repair & Services",
        "Health & Beauty",
        "Home Renovation & Repair",
        "Cleaning & Pest Control",
        "Legal Documentation Services",
        "Packers & Movers",
        "Other Services",
      ],
    },
    {
      title: "Electronics & Appliances",
      items: [
        "TVs, Video - Audio",
        "Kitchen & Other Appliances",
        "Computers & Laptops",
        "Cameras & Lenses",
        "Games & Entertainment",
        "Fridges",
        "Computer Accessories",
        "Hard Disks, Printers & Monitors",
        "ACs",
        "Washing Machines",
      ],
    },
    {
      title: "IT Engineer & Developer",
      items: ["Hotel & Travel Executive", "Accountant", "Designer", "Other"],
    },
  ];

  return (
    <nav>
      <div className="nav-top">
        {/* Left Section: Logo and Location Dropdown */}
        <div className="nav-left">
          <img src="src/assets/images/olx_logo_2025.svg" alt="OLX Logo" />
          <div className="relative">
            <select>
              <option>India</option>
            </select>
          </div>
        </div>

        <div className="nav-search">
          <div className="search-container">
            <input type="text" placeholder='Search "Cars"' />
            <button>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="nav-right">
          <select>
            <option>ENGLISH</option>
          </select>
          <button>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>

          <div className="profile-section" onClick={toggleProfileDropdown}>
            <img
              src={`src/assets/react.svg`}
              alt="Profile"
              className="profile-pic"
            />

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div id="BORD">
                  <div className="sidebar-content">
                    <div className="profile-section">
                      <img
                        src={`src/assets/react.svg`}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <span className="username">Synnefo</span>
                    </div>
                    <button id="vep">View and edit profile</button>
                  </div>
                </div>
                {/* <div id='BORD'>
                  <div className="sidebar-content">
                    <div className="profile-section1">
                      <img
                        src={`src/assets/react.svg`}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <span className="username">Synnefo</span>

                    </div>
                    <button id='vep'>View and edit profile</button>
                  </div>
                </div> */}

                <div className="profile-section1">
                  <div className="BORD">
                    <div style={{ display: "flex", gap: "14%", width: "100%" }}>
                      <img
                        src={`src/assets/icons/icon_1.svg`}
                        alt="Profile"
                        className="profile-pic1"
                      />
                      <span className="username">My ADS</span>
                    </div>{" "}
                    <br />
                    <div style={{ display: "flex", gap: "14%", width: "100%" }}>
                      <img
                        src={`src/assets/icons/icon_5.svg`}
                        alt="Profile"
                        className="profile-pic1"
                      />
                      <span className="username">Buy Business Packages</span>
                    </div>{" "}
                    <br />
                    <div style={{ display: "flex", gap: "14%", width: "100%" }}>
                      <img
                        src={`src/assets/icons/card.png`}
                        alt="Profile"
                        className="profile-pic1"
                      />
                      <span className="username">
                        Bought Packages & Billing
                      </span>
                    </div>
                  </div>
                </div>

                <div className="profile-section1">
                  <div className="BORD">
                    <div style={{ display: "flex", gap: "14%", width: "100%" }}>
                      <img
                        src={`src/assets/icons/question.png`}
                        alt="Profile"
                        className="profile-pic1"
                      />
                      <span className="username">Help</span>
                    </div>{" "}
                    <br />
                    <div style={{ display: "flex", gap: "14%", width: "100%" }}>
                      <img
                        src={`src/assets/icons/gear.png`}
                        alt="Profile"
                        className="profile-pic1"
                      />
                      <span className="username">Settings</span>
                    </div>{" "}
                    <br />
                    <div style={{ display: "flex", gap: "14%", width: "100%" }}>
                      <img
                        src={`src/assets/icons/left-arrow.png`}
                        alt="Profile"
                        className="profile-pic1"
                      />
                      <span className="username">Logout</span>
                    </div>
                  </div>
                  <div></div>
                </div>
                
              </div>
            )}
          </div>

          <button className="sell-button">
            <svg
              width="100"
              height="40"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="splitBorder"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="50%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
              <rect
                x="2"
                y="2"
                width="96"
                height="36"
                rx="18"
                ry="18"
                fill="#ffffff"
                stroke="url(#splitBorder)"
                strokeWidth="4"
              />
            </svg>
            <span className="sell-button-text">+ SELL</span>
          </button>
        </div>
      </div>

      <div className="nav-bottom">
        <div className="category-dropdown">
          <button onClick={toggleDropdown} className="category-button">
            ALL CATEGORIES
            <svg
              className="dropdown-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {categories.map((category, index) => (
                  <div key={index} className="category-section">
                    <h3>{category.title}</h3>
                    <ul>
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <button>{item}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button>Cars</button>
        <button>Motorcycles</button>
        <button>Mobile Phones</button>
        <button>For Sale: Houses & Apartments</button>
        <button>Scooters</button>
        <button>Commercial & Other Vehicles</button>
        <button>For Rent: Houses & Apartments</button>
      </div>
    </nav>
  );
};

export default Navbar;
