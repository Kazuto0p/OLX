import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const WishList = () => {
  const [wishlistPosts, setWishlistPosts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const loadWishlistPosts = async () => {
    const uid = localStorage.getItem('id');
    if (!uid) return;

    try {
      // Step 1: Get wishlist IDs
      const { data: idsData } = await axios.get(`http://localhost:3000/api/wishlist/ids/${uid}`);
      const ids = idsData.wishlistIds;
      setWishlistIds(new Set(ids));

      // Step 2: Fetch all posts (filter on frontend)
      const { data: postsData } = await axios.get('http://localhost:3000/api/loadposts');
      const filteredPosts = postsData.data.filter(post => ids.includes(post._id));
      setWishlistPosts(filteredPosts);
    } catch (err) {
      console.error('Error loading wishlist:', err);
      setError('Failed to load wishlist.');
    }
  };

  const toggleWishlist = async (postId, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      if (window.confirm('Please log in to update your wishlist. Want to log in now?')) {
        loginWithRedirect();
      }
      return;
    }

    try {
      const uid = localStorage.getItem('id');
      const { data } = await axios.post(`http://localhost:3000/api/wishlist/toggle/${postId}/${uid}`);
      setWishlistIds(prev => {
        const updated = new Set(prev);
        data.added ? updated.add(postId) : updated.delete(postId);
        return updated;
      });

      // Refresh the wishlist view
      setWishlistPosts(prev => prev.filter(p => p._id !== postId));
    } catch (err) {
      console.error('Error updating wishlist:', err);
      setError('Failed to update wishlist.');
      setTimeout(() => setError(''), 3000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlistPosts();
    }
  }, [isAuthenticated]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!error && wishlistPosts.length === 0 && (
        <p className="text-gray-600">You haven’t added anything to your wishlist yet.</p>
      )}


<button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline flex items-center text-sm mb-4"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Listings
        </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistPosts.map(post => (
          <div
            key={post._id}
            className="relative bg-white shadow-md border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/product/${post._id}`)}
          >
            <img
              src={post.photos?.[0] ? `http://localhost:3000/${post.photos[0]}` : 'https://picsum.photos/200/150'}
              alt={post.adTitle}
              className="w-full h-48 rounded-md mb-3 object-contain"
              onError={e => (e.target.src = 'https://picsum.photos/200/150')}
            />
            <button
              type="button"
              title="Remove from Wishlist"
              onClick={e => toggleWishlist(post._id, e)}
              className="absolute top-2 right-2 bg-white bg-opacity-75 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 1024 1024"
                fill={wishlistIds.has(post._id) ? '#000' : 'none'}
                stroke={wishlistIds.has(post._id) ? 'none' : 'currentColor'}
                strokeWidth="2"
                className="transition-all"
              >
                <path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-1">₹{post.price}</h3>
            <p className="text-sm font-medium">{post.adTitle}</p>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">{post.description}</p>
            <p className="text-xs text-gray-400 mt-2">{post.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
