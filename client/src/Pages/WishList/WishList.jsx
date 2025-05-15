// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

// const WishList = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

//   async function loadFavorites() {
//     if (!isAuthenticated) {
//       setError('Please log in to view your wishlist.');
//       loginWithRedirect();
//       return;
//     }

//     try {
//       const token = await getAccessTokenSilently();
//       const res = await axios.get('http://localhost:8080/api/favorites/posts', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFavorites(res.data.data || []);
//     } catch (err) {
//       console.error('Error loading favorites:', err);
//       setError('Failed to load wishlist.');
//     }
//   }

//   async function removeFavorite(postId) {
//     if (!isAuthenticated) {
//       setError('Please log in to modify your wishlist.');
//       return;
//     }

//     try {
//       const token = await getAccessTokenSilently();
//       await axios.delete(`http://localhost:8080/api/favorites/${postId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFavorites(favorites.filter((post) => post._id !== postId));
//     } catch (err) {
//       console.error('Error removing favorite:', err);
//       setError('Failed to remove from wishlist.');
//     }
//   }

//   useEffect(() => {
//     loadFavorites();
//   }, [isAuthenticated]);

//   return (
//     <div className="p-4 container mx-auto">
//       <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {favorites.length === 0 && !error && (
//         <p className="text-gray-600">Your wishlist is empty.</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {favorites.map((post, index) => (
//           <div
//             key={index}
//             className="relative bg-white shadow-md border p-4 cursor-pointer hover:shadow-lg transition"
//             onClick={() => navigate(`/product/${post._id}`)}
//           >
//             <img
//               src={
//                 post.photos?.[0]
//                   ? `http://localhost:3000/${post.photos[0]}`
//                   : 'https://picsum.photos/200/150'
//               }
//               alt={post.adTitle}
//               className="w-full h-48 rounded-md mb-3 object-contain"
//               onError={(e) => {
//                 e.target.src = 'https://picsum.photos/200/150';
//               }}
//             />

//             <div className="absolute top-2 right-2 bg-sky-200 w-[36px] h-[36px] rounded-full flex items-center justify-center">
//               <button
//                 type="button"
//                 title="Remove from Wishlist"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   removeFavorite(post._id);
//                 }}
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 1024 1024"
//                   fill="#ff0000"
//                 >
//                   <path
//                     d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 
//                     0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 
//                     77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 
//                     91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 
//                     0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 
//                     402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 
//                     0-128.349-104.398-232.727-232.727-232.727z"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <h3 className="text-lg font-semibold mb-1">₹{post.price}</h3>
//             <p className="text-sm font-medium">{post.adTitle}</p>
//             <p className="text-sm text-gray-600 mb-1">{post.description}</p>
//             <p className="text-xs text-gray-400 mt-2">{post.location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WishList;