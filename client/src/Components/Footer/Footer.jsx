import React from 'react';
import './FooterTailwind.css'
// import '/home/synnefo/OLX/client/tailwind.config.js'

const Footer = () => {
  return (
    <footer className="bg-[rgb(0,_72,_150)] border-t border-gray-200 py-6 h-auto p-16">
      <div className="flex justify-between w-full gap-x-8">
        <div className="flex-[2] p-4 flex items-center border-r border-white">
          <img
            className="w-full h-full object-cover"
            src="src/assets/images/cartrade_tech_1.svg"
            alt="Logo"
          />
        </div>
        <div className="flex-1 p-4 items-center"><img className="w-full h-full object-contain" src="src/assets/images/olx_2025.svg" alt="" srcset="" /></div>
        <div className="flex-1 p-4 items-center"><img className="w-full h-full object-contain" src="src/assets/images/carwale.svg" alt="" srcset="" /></div>
        <div className="flex-1 p-4 items-center"><img className="w-full h-full object-contain" src="src/assets/images/bikewale.svg" alt="" srcset="" /></div>
        <div className="flex-1 p-4 items-center"><img className="w-full h-full object-contain" src="src/assets/images/cartrade.svg" alt="" srcset="" /></div>
        <div className="flex-1 p-4 items-center"><img className="w-full h-full object-contain" src="src/assets/images/mobility.svg" alt="" srcset="" /></div>
      </div>
      <div className='flex justify-between text-white' >
        <div className=' text-[12px] '>Help - Sitemap</div>
        <div className=' text-[12px] '>All rights reserved © 2006-2025 OLX</div>
      </div>
    </footer>

  );
};

export default Footer;