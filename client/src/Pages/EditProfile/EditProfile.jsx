import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const EditProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [localUser, setLocalUser] = useState({
    profilePic: '',
    username: '',
    phone: '',
    email: '',
    about: '',
  });
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.post(`${API_URL}/signin`, {
            username: user.name,
            email: user.email,
            phone: user.phone,
          });
          const dbUser = response.data;
          setLocalUser({
            profilePic: dbUser.profilePic || user.picture || '',
            username: dbUser.username || user.name || '',
            phone: dbUser.phone || '',
            email: dbUser.email || user.email || '',
            about: dbUser.about || '',
          });
        } catch (err) {
          console.error('Error fetching user:', err);
          setError('Failed to load user data');
          setLocalUser({
            profilePic: user.picture || '',
            username: user.name || '',
            phone: '',
            email: user.email || '',
            about: '',
          });
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalUser((prev) => ({ ...prev, profilePic: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append('email', localUser.email);
      formData.append('username', localUser.username);
      formData.append('phone', localUser.phone);
      formData.append('about', localUser.about);
      if (localUser.profilePic instanceof File) {
        formData.append('profilePic', localUser.profilePic);
      } else {
        formData.append('profilePic', localUser.profilePic);
      }

      const response = await axios.put(`${API_URL}/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLocalUser({
        profilePic: response.data.profilePic,
        username: response.data.username,
        phone: response.data.phone,
        email: response.data.email,
        about: response.data.about,
      });
      alert('Profile updated!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start justify-between bg-white shadow-md p-6 rounded-md gap-6">
        {/* Left side: profile preview */}
        <div className="flex flex-col items-center sm:items-start gap-4 sm:w-1/2">
          <div>
            <img
              src={
                localUser.profilePic instanceof File
                  ? URL.createObjectURL(localUser.profilePic)
                  : localUser.profilePic?.startsWith('http')
                  ? localUser.profilePic
                  : `http://localhost:3000${localUser.profilePic}`
              }
              alt="Profile"
              className="rounded-full w-20 h-20 object-cover"
            />
          </div>
          <div className="text-center sm:text-left w-full">
            <h2 className="text-xl font-semibold">{localUser.username}</h2>
            <p className="text-gray-600 text-sm mt-1">{localUser.email}</p>
            <p className="text-gray-600 text-sm">📱 {localUser.phone || 'No phone added'}</p>
            <p className="text-gray-600 text-sm mt-1">
              {localUser.about || 'No bio yet'}
            </p>
          </div>
        </div>

        {/* Right side: edit form */}
        <div className="flex-1 w-full">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={localUser.username}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={localUser.phone}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={localUser.email}
                disabled
                className="mt-1 w-full p-2 border rounded text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">About</label>
              <textarea
                name="about"
                value={localUser.about}
                onChange={handleChange}
                rows="4"
                className="mt-1 w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-blue-800 border hover:border-blue-800 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
