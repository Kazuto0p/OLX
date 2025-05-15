import React from 'react';
import './FooterTailwind.css';

const Footer = () => {
  return (
    <footer className="bg-footer-blue border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6">
          <div className="flex justify-center items-center p-2">
            <img
              className="max-w-[120px] sm:max-w-[140px] h-auto object-contain"
              src="/images/cartrade_tech_1.svg"
              alt="CarTrade Tech Logo"
            />
          </div>
          <div className="flex justify-center items-center p-2">
            <img
              className="max-w-[120px] sm:max-w-[140px] h-auto object-contain"
              src="/images/olx_2025.svg"
              alt="OLX Logo"
            />
          </div>
          <div className="flex justify-center items-center p-2">
            <img
              className="max-w-[120px] sm:max-w-[140px] h-auto object-contain"
              src="/images/carwale.svg"
              alt="CarWale Logo"
            />
          </div>
          <div className="flex justify-center items-center p-2">
            <img
              className="max-w-[120px] sm:max-w-[140px] h-auto object-contain"
              src="/images/bikewale.svg"
              alt="BikeWale Logo"
            />
          </div>
          <div className="flex justify-center items-center p-2">
            <img
              className="max-w-[120px] sm:max-w-[140px] h-auto object-contain"
              src="/images/cartrade.svg"
              alt="CarTrade Logo"
            />
          </div>
          <div className="flex justify-center items-center p-2">
            <img
              className="max-w-[120px] sm:max-w-[140px] h-auto object-contain"
              src="/images/mobility.svg"
              alt="Mobility Logo"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center text-white text-xs sm:text-sm gap-4 sm:gap-0">
          <div>Help - Sitemap</div>
          <div>All rights reserved © 2006-2025 OLX</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;