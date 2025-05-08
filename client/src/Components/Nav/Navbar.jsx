import React from 'react';
import './Navbar.css';

const Navbar = () => {
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

        {/* Middle Section: Search Bar */}
        <div className="nav-search">
          <div className="search-container">
            <input
              type="text"
              placeholder='Search "Cars"'
            />
            <button>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section: Language, Icons, and Sell Button */}
        <div className="nav-right">
          <select>
            <option>ENGLISH</option>
          </select>
          <button>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          <button>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>
          <div className="profile-container">
            <span className="profile-badge">S</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <button className="sell-button">
            <svg width="100" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="splitBorder" x1="0%" y1="0%" x2="100%" y2="0%">
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

      {/* Bottom Section: Category Tabs */}
      <div className="nav-bottom">
        <select>
          <option>ALL CATEGORIES</option>
        </select>
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