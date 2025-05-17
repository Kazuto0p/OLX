import React, { useState, useCallback } from 'react';

const InputField = ({ label, value, onChange, type = 'text', placeholder, maxLength, showCount }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    {type === 'textarea' ? (
      <>
        <textarea
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          className="w-full border rounded-lg p-3 text-gray-700 h-32 resize-none focus:ring-2 focus:ring-blue-500"
        />
        {showCount && <p className="text-xs text-gray-500 mt-1">{value.length} / {maxLength}</p>}
      </>
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

const OptionButtons = ({ label, field, value, options, onSelect }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(field, opt)}
          className={`border rounded-lg py-2 px-4 text-sm ${
            value === opt
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const PhotoGrid = ({ photos, onUpload, onRemove, max = 20 }) => (
  <div className="grid grid-cols-5 gap-3 mb-4">
    {Array.from({ length: max }).map((_, idx) => (
      <div
        key={idx}
        className={`w-[100px] h-[100px] border-2 rounded-lg flex items-center justify-center relative ${
          photos[idx] ? 'border-gray-300' : 'border-dashed border-gray-400'
        }`}
      >
        {photos[idx] ? (
          <>
            <img
              src={URL.createObjectURL(photos[idx])}
              alt={`Upload ${idx}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ✕
            </button>
          </>
        ) : (
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
            <span className="text-gray-400 text-xl">＋</span>
          </label>
        )}
      </div>
    ))}
  </div>
);

const SelectField = ({ label, value, onChange, options, link }) => (
  <div className="mb-4 flex gap-3 items-center">
    <select
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    {link && <a href="#" className="text-sm text-blue-600 hover:underline">{link}</a>}
  </div>
);

const PostCarAdPage = () => {
  const initial = {
    brand: '', year: '', fuel: '', transmission: '', kmDriven: '', owners: '',
    adTitle: '', description: '', price: '', location: '', phone: ''
  };
  const [formData, setFormData] = useState(initial);
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePhotoUpload = useCallback(e => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files].slice(0, 20));
  }, []);

  const removePhoto = useCallback(idx => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const category = "Car";
    const email = localStorage.getItem("email");
  
    try {
      // Validate inputs
      if (!email) {
        throw new Error('Email not found in localStorage');
      }
      if (Object.keys(formData).length === 0) {
        throw new Error('Form data is empty');
      }
  
      // Create FormData
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      photos.forEach((file, index) => {
        if (file instanceof File) {
          data.append('photos', file);
        } else {
          console.warn(`Invalid file at index ${index}:`, file);
        }
      });
      data.append('email', email);
      data.append('category', category);
  
      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
  
      // Debug: Log before sending request
      console.log('Sending request to http://localhost:3000/api/posts...');
  
      // Make the POST request
      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: data,
      });
  
      // Check response
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Network response was not ok: ${res.status} - ${errorText}`);
      }
  
      const result = await res.json();
      console.log('Success:', result);
  
      // Reset form
      setFormData(initial);
      setPhotos([]);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert(`Failed to submit form: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Post Your Car Ad</h2>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Details</h3>
          <SelectField
            label="Brand"
            value={formData.brand}
            onChange={e => updateField('brand', e.target.value)}
            options={ [
              'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Hyundai', 'Nissan', 'Volkswagen', 
              'Kia', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Mazda', 'Jeep', 'Subaru',
              'Renault', 'Peugeot', 'Fiat', 'Skoda', 'Tata', 'Mahindra', 'Maruti Suzuki',
              'Volvo', 'Jaguar', 'Land Rover', 'Mitsubishi', 'Porsche', 'Tesla', 'Isuzu',
              'Datsun', 'Mini', 'Cadillac', 'Buick', 'Chrysler', 'Acura', 'Infiniti',
              'Genesis', 'Daewoo', 'Alfa Romeo', 'Citroën', 'Lamborghini'
            ]}
          />
          <InputField label="Year *" type="number" value={formData.year} onChange={e => updateField('year', e.target.value)} placeholder="e.g. 2022" />
          <OptionButtons label="Fuel *" field="fuel" value={formData.fuel} options={['CNG & Hybrids','Diesel','Electric','LPG','Petrol']} onSelect={updateField} />
          <OptionButtons label="Transmission *" field="transmission" value={formData.transmission} options={['Automatic','Manual']} onSelect={updateField} />
          <InputField label="KM Driven *" type="number" value={formData.kmDriven} onChange={e => updateField('kmDriven', e.target.value)} placeholder="e.g. 45000" />
          <OptionButtons label="No. of Owners *" field="owners" value={formData.owners} options={['1st','2nd','3rd','4th','4+']} onSelect={updateField} />
          <InputField label="Ad Title *" value={formData.adTitle} onChange={e => updateField('adTitle', e.target.value)} placeholder="e.g. Toyota Camry 2022" maxLength={70} showCount />
          <InputField label="Description *" type="textarea" value={formData.description} onChange={e => updateField('description', e.target.value)} placeholder="Describe your car (condition, features, etc.)" maxLength={4096} showCount />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Price</h3>
          <InputField label="Price *" type="number" value={formData.price} onChange={e => updateField('price', e.target.value)} placeholder="e.g. 850000" />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload Photos (Max 20)</h3>
          <PhotoGrid photos={photos} onUpload={handlePhotoUpload} onRemove={removePhoto} />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Location</h3>
          <SelectField
            label="State"
            value={formData.location}
            onChange={e => updateField('location', e.target.value)}
            options={ [
              "Andhra Pradesh",
              "Arunachal Pradesh",
              "Assam",
              "Bihar",
              "Chhattisgarh",
              "Goa",
              "Gujarat",
              "Haryana",
              "Himachal Pradesh",
              "Jharkhand",
              "Karnataka",
              "Kerala",
              "Madhya Pradesh",
              "Maharashtra",
              "Manipur",
              "Meghalaya",
              "Mizoram",
              "Nagaland",
              "Odisha",
              "Punjab",
              "Rajasthan",
              "Sikkim",
              "Tamil Nadu",
              "Telangana",
              "Tripura",
              "Uttar Pradesh",
              "Uttarakhand",
              "West Bengal",
              // Union Territories
              "Andaman and Nicobar Islands",
              "Chandigarh",
              "Dadra and Nagar Haveli and Daman and Diu",
              "Delhi",
              "Jammu and Kashmir",
              "Ladakh",
              "Lakshadweep",
              "Puducherry"
            ]}
            link="Current Location"
          />
        </section>

 
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Verify Identity</h3>
        </section>
        <InputField label="Mobile Phone Number *" type="text" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="Enter mobile number" />

        <button
          type="submit"
          disabled={submitting}
          className={`w-full mt-4 py-3 rounded-lg font-semibold shadow-md ${
            submitting
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Posting...' : 'Post Now'}
        </button>
      </div>
    </form>
  );
};

export default PostCarAdPage;