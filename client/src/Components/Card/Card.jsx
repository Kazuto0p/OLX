import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
  const [posts, setPosts] = useState([]);



  async function loaddata() {
    try {
        const res = await axios.get("http://localhost:8080/api/loadposts")
        console.log(res.data.data)
        setPosts(res.data.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    loaddata()
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4">
            <img
              src={`http://localhost:8080/${post.photos}`} 
              alt="Post Image"
              className="w-full h-48  rounded-md mb-3 object-contain"
              onError={(e) => {
                e.target.src = 'https://picsum.photos/200/150';
              }}
            />
            <h3 className="text-lg font-semibold mb-1">₹{post.price}</h3>
            <p className="text-sm ">{post.adTitle}</p>
            <p className="text-sm text-gray-600 mb-1">{post.description}</p>
            <p className="text-xs text-gray-400 mt-2">{post.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
