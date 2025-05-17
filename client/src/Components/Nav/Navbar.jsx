// Navbar.jsx
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/login/Login";
import LogoutButton from "../auth/logout/Logout";
import axios from "axios";

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  async function signin(email, username) {
    try {
      console.log(email, username);
      const res = await axios.post("http://localhost:3000/api/signin", { email, username });
      console.log(res.data);
      localStorage.setItem("id", res.data._id);
      const email2 = localStorage.getItem("email");
      const res2 = await axios.get("http://localhost:3000/api/loadProfile", { params: { email } });
      setProfilePic(res2.data.profilePic);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem("email", user.email);
      signin(user.email, user.name);
    }
  }, [isAuthenticated, user]);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);

  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileOpen(false);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/category?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    { title: "Cars", items: ["Cars", "Bikes", "Motorcycles", "Scooters", "Bicycle", "Spare Parts"] },
    {
      title: "Properties",
      items: ["For Sale: Houses & Apartments", "For Rent: Houses & Apartments", "Lands & Plots", "For Sale: Shops & Offices", "PG & Guest Houses"],
    },
    { title: "Mobile Phones", items: ["Mobile Phones", "Accessories", "Tablets"] },
    { title: "Commercial Vehicles", items: ["Commercial & Other Vehicles", "Spare Parts"] },
    {
      title: "Jobs",
      items: [
        "Data entry & Back office", "Sales & Marketing", "BPO & Telecaller", "Driver", "Office Assistant",
        "Delivery & Collection", "Teacher", "Cook", "Receptionist & Front office", "Operator & Technician", "Other Jobs",
      ],
    },
    {
      title: "Furniture",
      items: ["Sofa & Dining", "Beds & Wardrobes", "Home Decor & Garden", "Kids Furniture", "Other Household Items"],
    },
    { title: "Fashion", items: ["Men", "Women", "Kids"] },
    {
      title: "Books, Sports & Hobbies",
      items: ["Books", "Gym & Fitness", "Musical Instruments", "Sports Equipment", "Other Hobbies"],
    },
    { title: "Pets", items: ["Fishes & Aquarium", "Pet Food & Accessories", "Dogs", "Other Pets"] },
    {
      title: "Services",
      items: [
        "Education & Classes", "Tours & Travel", "Electronics Repair & Services", "Health & Beauty", "Home Renovation & Repair",
        "Cleaning & Pest Control", "Legal Documentation Services", "Packers & Movers", "Other Services",
      ],
    },
    {
      title: "Electronics & Appliances",
      items: [
        "TVs, Video - Audio", "Kitchen & Other Appliances", "Computers & Laptops", "Cameras & Lenses",
        "Games & Entertainment", "Fridges", "Computer Accessories", "Hard Disks, Printers & Monitors", "ACs", "Washing Machines",
      ],
    },
    { title: "IT Engineer & Developer", items: ["Hotel & Travel Executive", "Accountant", "Designer", "Other"] },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <div className="nav-top">
        <div className="nav-left">
          <img onClick={()=>navigate("/")} src="/olx_logo_2025.svg" alt="OLX Logo" className="logo" />
          <div className="relative">
            <select>
              <option>India</option>
            </select>
          </div>
        </div>

        <div className="nav-search">
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              placeholder="Search 'Cars'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </form>
        </div>

        <button className="hamburger" onClick={toggleMobileMenu}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <div className={`nav-right ${isMobileMenuOpen ? "active" : ""}`}>
          <button className="close-sidebar" onClick={toggleMobileMenu}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <select>
            <option>ENGLISH</option>
          </select>
          <button onClick={() => navigate("/wishlist")}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
          <button>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>

          <div className="profile-section" onClick={toggleProfileDropdown}>
            {isAuthenticated ? (
              // <img src={`http://localhost:3000${profilePic}`} alt="Profile" className="profile-pic" />
              <img src={user?.picture || "src/assets/react.svg"} alt="Profile" className="profile-pic" />
            ) :  (
              <LoginButton />
            )}

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div id="BORD">
                  <div className="sidebar-content">
                    <div className="profile-section">
                      {isAuthenticated ? (
                        <>
                          <img src={user?.picture || "src/assets/react.svg"} alt="Profile" className="profile-pic" />
                          <span className="username truncate">{user.name}</span>
                        </>
                      ) : (
                        <span className="username">Guest</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="profile-section1">
                  <div className="BOARD">
                    <div className="bt1" style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
                      <button id="vep" onClick={() => navigate("/edit")}>View and edit profile</button>
                    </div>
                  </div>
                </div>

                <div className="profile-section1">
                  <div className="BORD">
                    <div className="profile-item">
                      <img src="src/assets/icons/icon_1.svg" alt="My ADS" className="profile-pic1" />
                      <span className="username" onClick={()=>navigate("/myads")}>My ADS</span>
                    </div>
                    <div className="profile-item">
                      <img src="src/assets/icons/icon_5.svg" alt="Buy Business Packages" className="profile-pic1" />
                      <span className="username">Buy Business Packages</span>
                    </div>
                    <div className="profile-item">
                      <img src="src/assets/icons/card.png" alt="Bought Packages" className="profile-pic1" />
                      <span className="username">Bought Packages & Billing</span>
                    </div>
                  </div>
                </div>

                <div className="profile-section1">
                  <div className="BORD">
                    <div className="profile-item">
                      <img src="src/assets/icons/question.png" alt="Help" className="profile-pic1" />
                      <span className="username">Help</span>
                    </div>
                    <div className="profile-item">
                      <img src="src/assets/icons/gear.png" alt="Settings" className="profile-pic1" />
                      <span className="username">Settings</span>
                    </div>
                    {isAuthenticated && (
                      <div className="profile-item">
                        <img src="src/assets/icons/left-arrow.png" alt="Logout" className="profile-pic1" />
                        <LogoutButton />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="sell-button" onClick={() => navigate("/sell")}>
            <img src="/addButton.png" alt="Sell" className="sell-icon" />
          </button>
        </div>
      </div>

      <div className={`nav-bottom ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="category-dropdown">
          <button onClick={toggleDropdown} className="category-button">
            ALL CATEGORIES
            <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
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
                          <button onClick={() => handleCategoryClick(item)}>{item}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => handleCategoryClick("Cars")}>Cars</button>
        <button onClick={() => handleCategoryClick("Motorcycles")}>Motorcycles</button>
        <button onClick={() => handleCategoryClick("Mobile Phones")}>Mobile Phones</button>
        <button onClick={() => handleCategoryClick("For Sale: Houses & Apartments")}>For Sale: Houses & Apartments</button>
        <button onClick={() => handleCategoryClick("Scooters")}>Scooters</button>
        <button onClick={() => handleCategoryClick("Commercial & Other Vehicles")}>Commercial & Other Vehicles</button>
        <button onClick={() => handleCategoryClick("For Rent: Houses & Apartments")}>For Rent: Houses & Apartments</button>
      </div>
    </nav>
  );
};

export default Navbar;






// import React, { useState, useEffect } from "react";
// import "./Navbar.css";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import LoginButton from "../auth/login/Login";
// import LogoutButton from "../auth/logout/Logout";
// // import EditProfile from "../../Pages/EditProfile/EditProfile";
// import axios from "axios";

// const Navbar = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [profilePic,setProfilePic] = useState('')

//   useEffect(() => {
//     const query = searchParams.get("search") || "";
//     setSearchQuery(query);
//   }, [searchParams]);

//   async function signin(email, username){
//     try {

//       console.log(email, username)

//       const res = await axios.post("http://localhost:3000/api/signin",  { email, username },);
//       console.log(res.data)
//       localStorage.setItem("id",res.data._id)

//       const email2 = localStorage.getItem('email')


//       const res2 = await axios.get("http://localhost:3000/api/loadProfile",{params:{email}})

//       // console.log(res2.data.profilePic,"rwerwerwe")

//       setProfilePic(res2.data.profilePic)

//     } catch (error) {
//       console.log(error)
//     }
//   }


  

//   useEffect(() => {
//     if (isAuthenticated && user?.email) {
//       localStorage.setItem("email", user.email);
//       signin(user.email, user.name)
//     }
//   }, [isAuthenticated, user]);

//   const toggleProfileDropdown = () => {
//     setIsProfileOpen(!isProfileOpen);
//     setIsDropdownOpen(false);
//     setIsMobileMenuOpen(false);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//     setIsProfileOpen(false);
//     setIsMobileMenuOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     setIsProfileOpen(false);
//     setIsDropdownOpen(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/?search=${encodeURIComponent(searchQuery)}`);
//   };

//   const categories = [
//     { title: "Cars", items: ["Cars", "Bikes", "Motorcycles", "Scooters", "Bicycle", "Spare Parts"] },
//     {
//       title: "Properties",
//       items: ["For Sale: Houses & Apartments", "For Rent: Houses & Apartments", "Lands & Plots", "For Sale: Shops & Offices", "PG & Guest Houses"],
//     },
//     { title: "Mobile Phones", items: ["Mobile Phones", "Accessories", "Tablets"] },
//     { title: "Commercial Vehicles", items: ["Commercial & Other Vehicles", "Spare Parts"] },
//     {
//       title: "Jobs",
//       items: [
//         "Data entry & Back office", "Sales & Marketing", "BPO & Telecaller", "Driver", "Office Assistant",
//         "Delivery & Collection", "Teacher", "Cook", "Receptionist & Front office", "Operator & Technician", "Other Jobs"
//       ],
//     },
//     {
//       title: "Furniture",
//       items: ["Sofa & Dining", "Beds & Wardrobes", "Home Decor & Garden", "Kids Furniture", "Other Household Items"],
//     },
//     { title: "Fashion", items: ["Men", "Women", "Kids"] },
//     {
//       title: "Books, Sports & Hobbies",
//       items: ["Books", "Gym & Fitness", "Musical Instruments", "Sports Equipment", "Other Hobbies"],
//     },
//     { title: "Pets", items: ["Fishes & Aquarium", "Pet Food & Accessories", "Dogs", "Other Pets"] },
//     {
//       title: "Services",
//       items: [
//         "Education & Classes", "Tours & Travel", "Electronics Repair & Services", "Health & Beauty", "Home Renovation & Repair",
//         "Cleaning & Pest Control", "Legal Documentation Services", "Packers & Movers", "Other Services"
//       ],
//     },
//     {
//       title: "Electronics & Appliances",
//       items: [
//         "TVs, Video - Audio", "Kitchen & Other Appliances", "Computers & Laptops", "Cameras & Lenses",
//         "Games & Entertainment", "Fridges", "Computer Accessories", "Hard Disks, Printers & Monitors", "ACs", "Washing Machines"
//       ],
//     },
//     { title: "IT Engineer & Developer", items: ["Hotel & Travel Executive", "Accountant", "Designer", "Other"] },
//   ];

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <nav>
//       <div className="nav-top">
//         <div className="nav-left">
//           <img src="/olx_logo_2025.svg" alt="OLX Logo" className="logo" />
//           <div className="relative">
//             <select>
//               <option>India</option>
//             </select>
//           </div>
//         </div>

//         <div className="nav-search">
//           <form onSubmit={handleSearch} className="search-container">
//             <input
//               type="text"
//               placeholder="Search 'Cars'"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit">
//               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//               </svg>
//             </button>
//           </form>
//         </div>

//         <button className="hamburger" onClick={toggleMobileMenu}>
//           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//           </svg>
//         </button>

//         <div className={`nav-right ${isMobileMenuOpen ? "active" : ""}`}>
//           <button className="close-sidebar" onClick={toggleMobileMenu}>
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//           <select>
//             <option>ENGLISH</option>
//           </select>
//           <button onClick={()=>navigate("/wishlist")}>
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//             </svg>
//           </button>
//           <button>
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
//             </svg>
//           </button>

//           <div className="profile-section" onClick={toggleProfileDropdown}>
//             {isAuthenticated ? (
//               <img src={ `http://localhost:3000${profilePic}`} alt="Profile" className="profile-pic" />
//             ) : (
//               <LoginButton />
//             )}

//             {isProfileOpen && (
//               <div className="profile-dropdown">
//                 <div id="BORD">
//                   <div className="sidebar-content">
//                     <div className="profile-section">
//                       {isAuthenticated ? (
//                         <>
//                           <img src={user?.picture || "src/assets/react.svg" } alt="Profile" className="profile-pic" />
//                           <span className="username truncate">{user.name}</span>
//                         </>
//                       ) : (
//                         <span className="username">Guest</span>
//                       )}
//                     </div>
//                     {/* <button id="vep">View and edit profile</button> */}
//                   </div>
//                 </div>
                
//                 <div className="profile-section1">
//                   <div className="BOARD">
//                   <div className="bt1" style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>

//                       <button id="vep" onClick={() => navigate("/edit")}>View and edit profile</button>
//                     </div>
                  
//                   </div>
//                 </div>

//                 <div className="profile-section1">
//                   <div className="BORD">
//                     <div className="profile-item">
//                       <img src="src/assets/icons/icon_1.svg" alt="My ADS" className="profile-pic1" />
//                       <span className="username">My ADS</span>
//                     </div>
//                     <div className="profile-item">
//                       <img src="src/assets/icons/icon_5.svg" alt="Buy Business Packages" className="profile-pic1" />
//                       <span className="username">Buy Business Packages</span>
//                     </div>
//                     <div className="profile-item">
//                       <img src="src/assets/icons/card.png" alt="Bought Packages" className="profile-pic1" />
//                       <span className="username">Bought Packages & Billing</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="profile-section1">
//                   <div className="BORD">
//                     <div className="profile-item">
//                       <img src="src/assets/icons/question.png" alt="Help" className="profile-pic1" />
//                       <span className="username">Help</span>
//                     </div>
//                     <div className="profile-item">
//                       <img src="src/assets/icons/gear.png" alt="Settings" className="profile-pic1" />
//                       <span className="username">Settings</span>
//                     </div>
//                     {isAuthenticated && (
//                       <div className="profile-item">
//                         <img src="src/assets/icons/left-arrow.png" alt="Logout" className="profile-pic1" />
//                         <LogoutButton />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <button className="sell-button" onClick={() => navigate("/sell")}>
//             <img src="/addButton.png" alt="Sell" className="sell-icon" />
//             {/* <span className="sell-button-text">SELL</span> */}
//           </button>
//         </div>
//       </div>

//       <div className={`nav-bottom ${isMobileMenuOpen ? "active" : ""}`}>
//         <div className="category-dropdown">
//           <button onClick={toggleDropdown} className="category-button">
//             ALL CATEGORIES
//             <svg className="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//             </svg>
//           </button>

//           {isDropdownOpen && (
//             <div className="dropdown-menu">
//               <div className="dropdown-content">
//                 {categories.map((category, index) => (
//                   <div key={index} className="category-section">
//                     <h3>{category.title}</h3>
//                     <ul>
//                       {category.items.map((item, idx) => (
//                         <li key={idx}>
//                           <button>{item}</button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <button>Cars</button>
//         <button>Motorcycles</button>
//         <button>Mobile Phones</button>
//         <button>For Sale: Houses & Apartments</button>
//         <button>Scooters</button>
//         <button>Commercial & Other Vehicles</button>
//         <button>For Rent: Houses & Apartments</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;