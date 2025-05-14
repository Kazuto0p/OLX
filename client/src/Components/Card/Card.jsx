import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Card = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  async function loadData() {
    try {
      const res = await axios.get("http://localhost:8080/api/loadposts");
      setPosts(res.data.data);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts.');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const query = searchParams.get('search')?.toLowerCase() || '';
    if (query) {
      const filtered = posts.filter((post) =>
        (post.adTitle?.toLowerCase() || post.title?.toLowerCase() || '').includes(query)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchParams]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {filteredPosts.length === 0 && !error && (
        <p className="text-gray-600">No posts found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <div key={index} className="relative bg-white shadow-md border p-4">

            <img
              src={post.photos?.[0] ? `http://localhost:8080/${post.photos[0]}` : 'https://picsum.photos/200/150'}
              alt="Post Image"
              className="w-full h-48 rounded-md mb-3 object-contain"
              onError={(e) => {
                e.target.src = 'https://picsum.photos/200/150';
              }}
            />
<div className="absolute top-2 right-2 bg-sky-200 w-[36px] h-[36px] rounded-full flex items-center justify-center">
    <button
      type="button"
      className="rui-3a8k1 _29mJd favoriteOff"
      role="button"
      tabIndex={0}
      data-aut-id="btnFav"
      title="Favourite"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        className=""
      >
       <path
            className="rui-w4DG7"
            d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"
          />
      </svg>
    </button>
  </div>

            <h3 className="text-lg font-semibold mb-1">₹{post.price}</h3>
            <p className="text-sm font-medium">{post.adTitle || post.title}</p>
            <p className="text-sm text-gray-600 mb-1">{post.description}</p>
            <p className="text-xs text-gray-400 mt-2">{post.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;