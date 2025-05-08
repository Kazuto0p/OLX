import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-4">
        {/* Quick Links Section */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-lg font-bold text-gray-700 mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:underline">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">About</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Copyright Section */}
        <div className="flex-1 min-w-[200px] text-gray-600 text-sm">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;