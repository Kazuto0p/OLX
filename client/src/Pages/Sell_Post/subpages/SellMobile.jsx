import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellMobile = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
  });
  const [images, setImages] = useState(Array(12).fill(null));
  const [location, setLocation] = useState({
    state: '',
    city: '',
    neighborhood: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const states = [
    {
      name: 'Maharashtra',
      cities: [
        { name: 'Pune', neighborhoods: ['Koregaon Park', 'Hadapsar', 'Shivaji Nagar'] },
        { name: 'Mumbai', neighborhoods: ['Bandra', 'Andheri', 'Colaba'] },
      ],
    },
    {
      name: 'Karnataka',
      cities: [
        { name: 'Bangalore', neighborhoods: ['Koramangala', 'Indiranagar', 'Whitefield'] },
        { name: 'Mysore', neighborhoods: ['Vijayanagar', 'Kuvempunagar', 'Gokulam'] },
      ],
    },
  ];

  const mobileBrands = [
    'Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Oppo',
    'Vivo', 'Realme', 'Nokia', 'Motorola', 'Sony', 'LG','ROG',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = file; // Store the file object, not URL
        return newImages;
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = null;
      return newImages;
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setLocation({ state: value, city: '', neighborhood: '' });
    } else if (name === 'city') {
      setLocation((prev) => ({ ...prev, city: value, neighborhood: '' }));
    } else {
      setLocation((prev) => ({ ...prev, neighborhood: value }));
    }
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    const fullLocation = `${location.neighborhood}, ${location.city}, ${location.state}`;
    const formDataToSend = new FormData();
    formDataToSend.append('adTitle', formData.title);
    formDataToSend.append('description', `${formData.description}\nBrand: ${formData.brand}`);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', fullLocation);

    const validImages = images.filter((img) => img !== null);
    validImages.forEach((image) => {
      formDataToSend.append('photos', image);
    });

    if (validImages.length === 0) {
      setError('Please upload at least one photo.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/posts', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(response.data.message);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post ad.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-md relative">
        <button
          className="text-2xl absolute top-2 sm:-left-8"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1 className="text-lg font-bold uppercase mb-4 text-center">Sell Your Mobile</h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Category</h2>
            <div className="flex justify-between p-2">
              <span className="text-sm text-gray-600">Mobiles</span>
              <span
                className="text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/sell')}
              >
                Change
              </span>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Details</h2>
            <div className="p-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Brand</option>
                  {mobileBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter Ad Title"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows="4"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Price</h2>
            <div className="p-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₹ Enter Price"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Upload Photos</h2>
            <div className="p-2">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    {image ? (
                      <div>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Uploaded ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e)}
                          className="hidden"
                        />
                        <span className="text-gray-500">+</span>
                        {index === 0 && (
                          <span className="text-xs text-gray-600">Add Photos</span>
                        )}
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Location</h2>
            <div className="p-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <select
                  name="state"
                  value={location.state}
                  onChange={handleLocationChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.name} value={state.name}>{state.name}</option>
                  ))}
                </select>
              </div>
              {location.state && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <select
                    name="city"
                    value={location.city}
                    onChange={handleLocationChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Select City</option>
                    {states.find((s) => s.name === location.state)?.cities.map((city) => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
              )}
              {location.city && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhood *</label>
                  <select
                    name="neighborhood"
                    value={location.neighborhood}
                    onChange={handleLocationChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Select Neighborhood</option>
                    {states
                      .find((s) => s.name === location.state)
                      ?.cities.find((c) => c.name === location.city)
                      ?.neighborhoods.map((neighborhood) => (
                        <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="p-2">
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Post Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellMobile;