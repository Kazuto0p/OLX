
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
  const [view, setView] = useState('profile');
  const [error, setError] = useState(null);

  // Backend API base URL
  const API_URL = 'http://localhost:3000/api'; // Adjust to your backend URL

  // Fetch or create user when authenticated
  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          // Call /signin to create or retrieve user
          const response = await axios.post(`http://localhost:3000/api/signin`, {
            username: user.name,
            email: user.email,
            phone:user.phone
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
          // Fallback to Auth0 data
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

    console.log(localUser.profilePic,"fsdfsd")
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
      setView('profile');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const ProfileView = () => (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={

                `http://localhost:3000${localUser.profilePic}`
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{localUser.username}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{localUser.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{localUser.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium">About</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{localUser.about}</p>
        </div>
      </div>
    </div>
  );

  const EditView = () => (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={
              localUser.profilePic instanceof File
                ? URL.createObjectURL(localUser.profilePic)
                : localUser.profilePic || 'https://via.placeholder.com/150'
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={localUser.username}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={localUser.phone}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={localUser.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
            disabled // Prevent email changes as it's tied to Auth0
          />
        </div>
        <div>
          <label className="block text-sm font-medium">About</label>
          <textarea
            name="about"
            value={localUser.about}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Menu</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <button
                onClick={() => setView('profile')}
                className={`w-full text-left p-2 rounded ${
                  view === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setView('edit')}
                className={`w-full text-left p-2 rounded ${
                  view === 'edit' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                Edit
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="max-w-xl mx-auto">
          {view === 'profile' ? <ProfileView /> : <EditView />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;