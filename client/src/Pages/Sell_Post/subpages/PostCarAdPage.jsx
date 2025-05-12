import React, { useState } from 'react';

const PostCarAdPage = () => {
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    fuel: '',
    transmission: '',
    kmDriven: '',
    owners: '',
    adTitle: '',
    description: '',
    price: '',
    location: '',
    phone: '',
  });
  const [photos, setPhotos] = useState([]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files].slice(0, 20));
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const InputField = ({ label, type = 'text', field, placeholder }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const SectionTitle = ({ title }) => (
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
  );

  const OptionButtons = ({ field, options }) => (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => updateField(field, opt)}
          className={`border rounded-lg py-2 px-4 text-sm ${
            formData[field] === opt
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Post Your Car Ad</h2>

        <SectionTitle title="Details" />

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Brand *</label>
            <select
              value={formData.brand}
              onChange={(e) => updateField('brand', e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
            </select>
          </div>

          <InputField label="Year *" field="year" placeholder="e.g. 2022" type="number" />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fuel *</label>
            <OptionButtons
              field="fuel"
              options={['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol']}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Transmission *</label>
            <OptionButtons field="transmission" options={['Automatic', 'Manual']} />
          </div>

          <InputField label="KM Driven *" field="kmDriven" type="number" placeholder="e.g. 45000" />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">No. of Owners *</label>
            <OptionButtons field="owners" options={['1st', '2nd', '3rd', '4th', '4+']} />
          </div>

          <InputField
            label="Ad Title *"
            field="adTitle"
            placeholder="e.g. Toyota Camry 2022"
          />
          <p className="text-xs text-gray-500 mb-3">{formData.adTitle.length} / 70</p>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 h-32 resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your car (condition, features, etc.)"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length} / 4096</p>
          </div>
        </div>

        <SectionTitle title="Price" />
        <InputField field="price" type="number" placeholder="e.g. 850000" label="Price *" />

        <SectionTitle title="Upload Photos (Max 20)" />
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className={`w-[100px] h-[100px] border-2 rounded-lg flex items-center justify-center relative ${
                photos[index] ? 'border-gray-300' : 'border-dashed border-gray-400'
              }`}
            >
              {photos[index] ? (
                <>
                  <img
                    src={URL.createObjectURL(photos[index])}
                    alt={`Upload ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <span className="text-gray-400 text-xl">＋</span>
                </label>
              )}
            </div>
          ))}
        </div>

        <SectionTitle title="Location" />
        <div className="flex gap-3 items-center mb-4">
          <select
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
          </select>
          <a href="#" className="text-sm text-blue-600 hover:underline">Current Location</a>
        </div>

        <SectionTitle title="Verify Identity" />
        <InputField
          field="phone"
          type="text"
          label="Mobile Phone Number *"
          placeholder="Enter mobile number"
        />

        <button
          disabled
          className="w-full mt-4 bg-gray-300 text-white py-3 rounded-lg font-semibold shadow-md cursor-not-allowed"
        >
          Post Now
        </button>
      </div>
    </div>
  );
};

export default PostCarAdPage;
