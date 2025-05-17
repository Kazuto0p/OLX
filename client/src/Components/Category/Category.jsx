import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Category = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const loadPosts = async () => {
    try {
      const categoryParam = searchParams.get("category")?.trim().toLowerCase() || "";
      console.log(" Category from searchParams:", categoryParam);
  
      // Optional: map aliases like "bikes" => "bike", etc.
      const categoryAliases = {
        bikes: "bike",
        cars: "car",
        mobiles: "mobile",
        laptops: "laptop",
      };
      const normalizedCategory = categoryAliases[categoryParam] || categoryParam;
  
      const { data } = await axios.get("http://localhost:3000/api/loadposts", {
        params: { category: normalizedCategory },
      });
  
      const fetchedPosts = Array.isArray(data.data) ? data.data : [];
      console.log(" Fetched posts:", fetchedPosts);
      console.log(" Unique categories in posts:", [
        ...new Set(fetchedPosts.map((post) => post.category)),
      ]);
  
      // Optional: log structure of first post
      if (fetchedPosts.length > 0) {
        console.log(" Sample post object structure:", fetchedPosts[0]);
      }
  
      setPosts(fetchedPosts);
  
      if (normalizedCategory) {
        const filtered = fetchedPosts.filter(
          (ad) => ad.category?.toLowerCase().trim() === normalizedCategory
        );
  
        console.log(` Filtered posts for "${categoryParam}":`, filtered);
        setFilteredPosts(filtered);
  
        if (filtered.length === 0) {
          setError(`No posts found for category: ${categoryParam}`);
        }
      } else {
        console.log(" No category specified, showing all posts");
        setFilteredPosts(fetchedPosts);
      }
    } catch (err) {
      console.error(" Error loading posts:", err);
      setError("Failed to load posts.");
    }
  };
  
  const loadWishlist = async () => {
    const uid = localStorage.getItem("id");
    try {
      const { data } = await axios.get(`http://localhost:3000/api/wishlist/ids/${uid}`);
      setWishlist(new Set(data.wishlistIds));
    } catch (err) {
      console.error("Error loading wishlist:", err);
    }
  };

  const toggleWishlist = async (postId, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      if (window.confirm("Please log in to add items to your wishlist. Would you like to log in now?")) {
        loginWithRedirect();
      }
      return;
    }

    try {
      const uid = localStorage.getItem("id");
      const { data } = await axios.post(`http://localhost:3000/api/wishlist/toggle/${postId}/${uid}`);
      setWishlist(prev => {
        const newWishlist = new Set(prev);
        data.added ? newWishlist.add(postId) : newWishlist.delete(postId);
        return newWishlist;
      });
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      setError("Failed to update wishlist. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    loadPosts();
    loadWishlist();
  }, [isAuthenticated, searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const renderPagination = () => {
    if (filteredPosts.length <= postsPerPage) return null;

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
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {searchParams.get("category") || "All Categories"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!error && paginatedPosts.length === 0 && (
        <p className="text-gray-600">No posts found for this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <div
            key={post._id}
            className="relative bg-white shadow-md border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/product/${post._id}`)}
          >
            <img
              src={post.photos?.[0] ? `http://localhost:3000/${post.photos[0]}` : "https://picsum.photos/200/150"}
              alt={post.adTitle}
              className="w-full h-48 rounded-md mb-3 object-contain"
              onError={(e) => (e.target.src = "https://picsum.photos/200/150")}
            />
            <button
              type="button"
              title={wishlist.has(post._id) ? "Remove from Wishlist" : "Add to Wishlist"}
              onClick={(e) => toggleWishlist(post._id, e)}
              className="absolute top-2 right-2 bg-white bg-opacity-75 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:bg-opacity-100 transition-all"
            >
              <img
                src={wishlist.has(post._id) ? "/wished.png" : "/wish.png"}
                alt={wishlist.has(post._id) ? "Wishlisted" : "Add to Wishlist"}
                className="w-5 h-5 object-contain"
              />
            </button>
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

export default Category;
