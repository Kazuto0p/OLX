import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Myads = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated, user, loginWithRedirect, isLoading } = useAuth0();
  const navigate = useNavigate();
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const loadUserPosts = async () => {
    if (!isAuthenticated || !user?.email) return;
    try {
      const { data } = await axios.get('http://localhost:3000/api/loadUserPosts', {
        params: { email: user.email },
      });
      setPosts(data.data);
    } catch (err) {
      console.error('Error loading user posts:', err);
      setError('Failed to load your ads.');
      setTimeout(() => setError(''), 3000);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      loadUserPosts();
    }
  }, [isAuthenticated, user]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const renderPagination = () => {
    if (posts.length <= postsPerPage) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
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
      );
    }

    return (
      <div className="mt-6 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
        >
          Previous
        </button>
        {pages}
        {endPage < totalPages && (
          <>
            <span className="px-2 py-2">...</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600 mb-4">Please log in to view your ads.</p>
        <button
          onClick={() => loginWithRedirect()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Ads</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!error && posts.length === 0 && (
        <p className="text-gray-600">You haven't posted any ads yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <div
            key={post._id}
            className="relative bg-white shadow-md border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/product/${post._id}`)}
          >
            <img
              src={post.photos?.[0] ? `http://localhost:3000/${post.photos[0]}` : 'https://picsum.photos/200/150'}
              alt={post.adTitle}
              className="w-full h-48 rounded-md mb-3 object-contain"
              onError={(e) => (e.target.src = 'https://picsum.photos/200/150')}
            />
            <h3 className="text-lg font-semibold mb-1">₹{post.price}</h3>
            <p className="text-sm font-medium">{post.adTitle}</p>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">{post.description}</p>
            <p className="text-xs text-gray-400 mt-2">{post.location}</p>
          </div>
        ))}
      </div>

      {renderPagination()}
    </div>
  );
};

export default Myads;