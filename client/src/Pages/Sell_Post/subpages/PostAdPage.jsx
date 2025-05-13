import React, { useState } from 'react';
import axios from 'axios';

const PostAdPage = () => {
  const [adTitle, setAdTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState('electronics'); // Default to electronics
  const [fuel, setFuel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const updatedPhotos = [...photos, ...files].slice(0, 12);
    setPhotos(updatedPhotos);
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adTitle || !description || !price || !location || photos.length === 0 || (category !== 'electronics' && (!fuel || !brand || !year))) {
      alert('Please fill all required fields and upload at least one photo.');
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', adTitle);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    photos.forEach((file) => formData.append('photos', file));

    if (category !== 'electronics') {
      formData.append('fuel', fuel);
      formData.append('brand', brand);
      formData.append('year', year);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/posts1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      alert('Ad posted successfully!');

      // Reset form
      setAdTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setPhotos([]);
      setFuel('');
      setBrand('');
      setYear('');
    } catch (err) {
      console.error('Submission error:', err.response ? err.response.data : err.message);
      alert('Error posting ad.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-[50px]">
      <form onSubmit={handleSubmit} className="w-[852px] mx-auto border rounded-lg shadow-lg bg-white">
        <h2 className="text-[28px] font-bold text-center pt-6 text-gray-800">POST YOUR AD</h2>

        {/* Category Section */}
        <div className="border-b border-gray-200 px-[30px] py-4 flex items-center">
          <label className="text-[16px] text-gray-500 mr-4">Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="electronics">Electronics</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        {/* Details Section */}
        <div className="border-b border-gray-200 px-[30px] py-6">
          <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Include Some Details</h3>
          <label className="block text-[14px] font-medium text-gray-600 mb-2">Ad Title *</label>
          <input type="text" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder="Enter ad title" className="w-full mb-6 border rounded-lg p-3" />
          <label className="block text-[14px] font-medium text-gray-600 mb-2">Description *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your item" className="w-full mb-6 border rounded-lg p-3 h-36 resize-none" />
        </div>

        {/* Price Section */}
        <div className="border-b border-gray-200 px-[30px] py-6">
          <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Set a Price</h3>
          <label className="block text-[14px] font-medium text-gray-600 mb-2">Price *</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" className="w-full mb-6 border rounded-lg p-3" />
        </div>

        {/* Photos Section */}
        <div className="border-b border-gray-200 px-[30px] py-6">
          <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Upload Up to 12 Photos</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {[...Array(12)].map((_, idx) => (
              <div key={idx} className={`w-[150px] h-[150px] border-2 rounded-lg flex items-center justify-center relative ${photos[idx] ? 'border-gray-300' : 'border-dashed border-gray-400'}`}>
                {photos[idx] ? (
                  <>
                    <img src={URL.createObjectURL(photos[idx])} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                    <button type="button" onClick={() => removePhoto(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">✕</button>
                  </>
                ) : (
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" multiple />
                    <span className="text-gray-400 text-2xl">＋</span>
                  </label>
                )}
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-500">The first photo is the cover photo.</p>
        </div>

        {/* Additional fields for car/bike */}
        {(category === 'car' || category === 'bike') && (
          <div className="border-b border-gray-200 px-[30px] py-6">
            <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Car/Bike Details</h3>
            <label className="block text-[14px] font-medium text-gray-600 mb-2">Fuel *</label>
            <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="Enter fuel type" className="w-full mb-6 border rounded-lg p-3" />
            <label className="block text-[14px] font-medium text-gray-600 mb-2">Brand *</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Enter brand" className="w-full mb-6 border rounded-lg p-3" />
            <label className="block text-[14px] font-medium text-gray-600 mb-2">Year *</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter year" className="w-full mb-6 border rounded-lg p-3" />
          </div>
        )}

        {/* Location Section */}
        <div className="border-b border-gray-200 px-[30px] py-6">
          <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Confirm Your Location</h3>
          <label className="block text-[14px] font-medium text-gray-600 mb-2">Location *</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your location" className="w-full mb-2 border rounded-lg p-3" />
          <p className="text-[12px] text-gray-500">This field is mandatory.</p>
        </div>


        <div className="px-[30px] py-6">
          <h3 className="text-[20px] font-semibold mb-6 text-gray-800">Review Your Details</h3>
          <button type="submit" disabled={submitting} className={`w-full ${submitting ? 'bg-gray-300' : 'bg-[#ff6f61] hover:bg-[#e65a50]'} text-white py-3 rounded-lg text-[16px] font-semibold transition-all`}>
            {submitting ? 'Posting...' : 'POST NOW'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAdPage;
