// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// const Card = () => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [error, setError] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   const postsPerPage = 6; 
//   const totalPosts = filteredPosts.length;
//   const totalPages = Math.ceil(totalPosts / postsPerPage);

//   async function loadData() {
//     try {
//       const res = await axios.get("http://localhost:8080/api/loadposts");
//       setPosts(res.data.data);
//     } catch (err) {
//       console.error('Error loading posts:', err);
//       setError('Failed to load posts.');
//     }
//   }

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     const query = searchParams.get('search')?.toLowerCase() || '';
//     if (query) {
//       const filtered = posts.filter((post) =>
//         (post.adTitle?.toLowerCase() || '').includes(query)
//       );
//       setFilteredPosts(filtered);
//     } else {
//       setFilteredPosts(posts);
//     }
//     setCurrentPage(1); 
//   }, [posts, searchParams]);

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const itemsToShow = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>

//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {filteredPosts.length === 0 && !error && (
//         <p className="text-gray-600">No posts found.</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {itemsToShow.map((post, index) => (
//           <div
//             key={index}
//             className="relative bg-white shadow-md border p-4 cursor-pointer hover:shadow-lg transition"
//             onClick={() => navigate(`/product/${post._id}`)}
//           >
//             <img
//               src={
//                 post.photos?.[0]
//                   ? `http://localhost:8080/${post.photos[0]}`
//                   : 'https://picsum.photos/200/150'
//               }
//               alt="Post"
//               className="w-full h-48 rounded-md mb-3 object-contain"
//               onError={(e) => {
//                 e.target.src = 'https://picsum.photos/200/150';
//               }}
//             />

//             <div className="absolute top-2 right-2 bg-sky-200 w-[36px] h-[36px] rounded-full flex items-center justify-center">
//               <button
//                 type="button"
//                 title="Favourite"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log(`Favorited post: ${post._id}`);
//                 }}
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 1024 1024"
//                   fill="currentColor"
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

//       {/* Pagination Controls */}
//       {filteredPosts.length > postsPerPage && (
//         <div className="mt-6 flex justify-center space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
//           >
//             Previous
//           </button>
          
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-4 py-2 rounded-lg ${
//                 currentPage === page
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               } transition`}
//             >
//               {page}
//             </button>
//           ))}
          
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Card = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const postsPerPage = 6;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  async function loadData() {
    try {
      const res = await axios.get('http://localhost:8080/api/loadposts');
      setPosts(res.data.data);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts.');
    }
  }

  async function loadFavorites() {
    if (!isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.get('http://localhost:8080/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(new Set(res.data.favoritePostIds || []));
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Failed to load favorites.');
    }
  }

  async function toggleFavorite(postId) {
    if (!isAuthenticated) {
      setError('Please log in to add to wishlist.');
      return;
    }

    const isFavorited = favorites.has(postId);
    const newFavorites = new Set(favorites);

    try {
      const token = await getAccessTokenSilently();
      if (isFavorited) {
        await axios.delete(`http://localhost:8080/api/favorites/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newFavorites.delete(postId);
      } else {
        await axios.post(
          'http://localhost:8080/api/favorites',
          { postId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        newFavorites.add(postId);
      }
      setFavorites(newFavorites);
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError(`Failed to ${isFavorited ? 'remove from' : 'add to'} wishlist.`);
    }
  }

  useEffect(() => {
    loadData();
    loadFavorites();
  }, [isAuthenticated]);

  useEffect(() => {
    const query = searchParams.get('search')?.toLowerCase() || '';
    if (query) {
      const filtered = posts.filter((post) =>
        (post.adTitle?.toLowerCase() || '').includes(query)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
    setCurrentPage(1);
  }, [posts, searchParams]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const itemsToShow = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {filteredPosts.length === 0 && !error && (
        <p className="text-gray-600">No posts found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {itemsToShow.map((post, index) => (
          <div
            key={index}
            className="relative bg-white shadow-md border p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/product/${post._id}`)}
          >
            <img
              src={
                post.photos?.[0]
                  ? `http://localhost:8080/${post.photos[0]}`
                  : 'https://picsum.photos/200/150'
              }
              alt="Post"
              className="w-full h-48 rounded-md mb-3 object-contain"
              onError={(e) => {
                e.target.src = 'https://picsum.photos/200/150';
              }}
            />

            <div className="absolute top-2 right-2 bg-sky-200 w-[36px] h-[36px] rounded-full flex items-center justify-center">
              <button
                type="button"
                title={favorites.has(post._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(post._id);
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                  fill={favorites.has(post._id) ? '#ff0000' : 'currentColor'}
                >
                  <path
                    d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 
                    0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 
                    77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 
                    91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 
                    0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 
                    402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 
                    0-128.349-104.398-232.727-232.727-232.727z"
                  />
                </svg>
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-1">₹{post.price}</h3>
            <p className="text-sm font-medium">{post.adTitle}</p>
            <p className="text-sm text-gray-600 mb-1">{post.description}</p>
            <p className="text-xs text-gray-400 mt-2">{post.location}</p>
          </div>
        ))}
      </div>

      {filteredPosts.length > postsPerPage && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;