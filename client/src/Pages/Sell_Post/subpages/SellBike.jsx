import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellBike = () => {
  const [formData, setFormData] = useState({
    brand: '',
    bikeName: '',
    year: '',
    fuel: '',
    transmission: '',
    noOfOwners: '',
    kmDriven: '',
    adTitle: '',
    description: '',
    price: '',
    phone: '',
  });
  const [images, setImages] = useState(Array(20).fill(null));
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
      name: 'Kerala',
      cities: [
        { name: 'Ernakulam', neighborhoods: ['Kochi', 'Kaloor', 'Edappally'] },
        { name: 'Idukki', neighborhoods: ['Kattappana', 'Painavu', 'Thodupuzha'] },
      ],
    },
    {
      name: 'Delhi',
      cities: [
        { name: 'New Delhi', neighborhoods: ['Red Fort', 'Indiranagar', 'India Gate'] },
        { name: 'Mysore', neighborhoods: ['Vijayanagar', 'Dwarka', 'South Delhi'] },
      ],
    },
  ];

  const bikeBrands = ['BMW', 'Ducati', 'Bentley','Yamaha','Extra','Honda','Kawasaki','Hero','KTM'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFuelChange = (fuel) => {
    setFormData((prev) => ({ ...prev, fuel }));
  };

  const handleTransmissionChange = (transmission) => {
    setFormData((prev) => ({ ...prev, transmission }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = file;
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
    const owners = formData.noOfOwners ? `${formData.noOfOwners}th` : '';
    const formDataToSend = new FormData();
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('year', formData.year);
    formDataToSend.append('fuel', formData.fuel);
    formDataToSend.append('transmission', formData.transmission);
    formDataToSend.append('kmDriven', formData.kmDriven);
    formDataToSend.append('owners', owners);
    formDataToSend.append('adTitle', formData.adTitle);
    formDataToSend.append('description', `${formData.description}\nBike: ${formData.bikeName}`);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', fullLocation);
    formDataToSend.append('phone', formData.phone);

    const validImages = images.filter((img) => img !== null);
    validImages.forEach((image) => {
      formDataToSend.append('photos', image);
    });

    if (validImages.length === 0) {
      setError('Please upload at least one photo.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/posts', formDataToSend, {
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
        <h1 className="text-lg font-bold uppercase mb-4 text-center">Sell Your Bike</h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Category</h2>
            <div className="flex justify-between p-2">
              <span className="text-sm text-gray-600">Bikes</span>
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
                  {bikeBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bike Name *</label>
                <input
                  type="text"
                  name="bikeName"
                  value={formData.bikeName}
                  onChange={handleInputChange}
                  placeholder="Enter Bike Name"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Enter Year"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel *</label>
                <div className="flex flex-wrap gap-2">
                  {['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'].map((fuel) => (
                    <button
                      key={fuel}
                      onClick={() => handleFuelChange(fuel)}
                      className={`px-4 py-1 border rounded-md text-sm ${
                        formData.fuel === fuel ? 'bg-gray-200' : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission *</label>
                <div className="flex gap-2">
                  {['Automatic', 'Manual'].map((transmission) => (
                    <button
                      key={transmission}
                      onClick={() => handleTransmissionChange(transmission)}
                      className={`px-4 py-1 border rounded-md text-sm ${
                        formData.transmission === transmission ? 'bg-gray-200' : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {transmission}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Owners *</label>
                <input
                  type="number"
                  name="noOfOwners"
                  value={formData.noOfOwners}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Owners"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KM Driven *</label>
                <input
                  type="number"
                  name="kmDriven"
                  value={formData.kmDriven}
                  onChange={handleInputChange}
                  placeholder="Enter KM Driven"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title *</label>
                <input
                  type="text"
                  name="adTitle"
                  value={formData.adTitle}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
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

export default SellBike;