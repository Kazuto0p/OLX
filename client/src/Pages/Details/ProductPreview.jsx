
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(`http://localhost:3000/api/post/${id}`);
        setPost(res.data.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load product details.');
      }
    }
    fetchPost();
  }, [id]);

  const handleNextImage = () => {
    if (post?.photos?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % post.photos.length);
    }
  };

  const handlePrevImage = () => {
    if (post?.photos?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + post.photos.length) % post.photos.length);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log(`Post ${id} favorited: ${!isFavorited}`);
  };

  if (error) {
    return <div className="flex-1 p-4 text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="flex-1 p-4 text-center">Loading...</div>;
  }

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(post.location)}`;

  return (
    <main className="flex-1 p-4 md:p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
    {/* back */}
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

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <img
              src={
                post.photos?.[currentImageIndex]
                  ? `http://localhost:3000/${post.photos[currentImageIndex]}`
                  : 'https://picsum.photos/600/400'
              }
              alt="Product"
              className="w-full h-[400px] object-contain rounded-lg border"
              onError={(e) => {
                e.target.src = 'https://picsum.photos/600/400';
              }}
            />
            <div className="absolute top-4 right-4 bg-sky-200 w-[36px] h-[36px] rounded-full flex items-center justify-center">
              <button
                type="button"
                className={`rui-3a8k1 _29mJd ${isFavorited ? 'favoriteOn' : 'favoriteOff'}`}
                role="button"
                tabIndex={0}
                data-aut-id="btnFav"
                title="Favourite"
                onClick={toggleFavorite}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                  fill={isFavorited ? '#ff0000' : 'currentColor'}
                  className=""
                >
                  <path
                    className="rui-w4DG7"
                    d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"
                  />
                </svg>
              </button>
            </div>
            {post.photos?.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80"
                >
                  ←
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80"
                >
                  →
                </button>
              </>
            )}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {post.photos?.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentImageIndex === index ? 'bg-gray-950' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>


        <div className="grid md:grid-cols-4 gap-6">
  
          <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{post.adTitle}</h1>
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Location:</span> {post.location}
              </p>
              <p>
                <span className="font-medium">Posted on:</span>{' '}
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>

            {(post.brand || post.year || post.fuel || post.transmission || post.kmDriven || post.owners) && (
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Details</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  {post.brand && (
                    <div>
                      <span className="font-medium">Brand:</span> {post.brand}
                    </div>
                  )}
                  {post.year && (
                    <div>
                      <span className="font-medium">Year:</span> {post.year}
                    </div>
                  )}
                  {post.fuel && (
                    <div>
                      <span className="font-medium">Fuel:</span> {post.fuel}
                    </div>
                  )}
                  {post.transmission && (
                    <div>
                      <span className="font-medium">Transmission:</span> {post.transmission}
                    </div>
                  )}
                  {post.kmDriven && (
                    <div>
                      <span className="font-medium">KM Driven:</span> {post.kmDriven.toLocaleString()}
                    </div>
                  )}
                  {post.owners && (
                    <div>
                      <span className="font-medium">Owners:</span> {post.owners}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{post.description}</p>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <p className="text-2xl font-semibold text-gray-950">₹{post.price.toLocaleString()}</p>
            {post.phone && (
  <p className="text-gray-800 text-sm">
    <span className="font-medium">Phone:</span> {post.phone}
  </p>
)}

            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Location</h2>
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251479.23612637576!2d76.13730748952447!3d9.986838222129805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1747214835518!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              <div className="w-full h-40">
                <iframe
                  title="location-map"
                  src={mapEmbedUrl}
                  className="w-full h-full rounded-md border"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Number Modal */}
      {/* {showPhone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
            <p className="text-gray-700 mb-4">Phone: {post.phone}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
              onClick={() => setShowPhone(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </main>
  );
};

export default ProductPreview;
