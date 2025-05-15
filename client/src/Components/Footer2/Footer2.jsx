import React from 'react';

const Footer2 = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-4 sm:mx-8 lg:mx-32 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8">
          <div>
            <h4 className="text-sm sm:text-base font-bold tracking-tight mb-2">POPULAR LOCATIONS</h4>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Kolkata</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Mumbai</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Chennai</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Pune</p>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold tracking-tight mb-2">TRENDING LOCATIONS</h4>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Bhubaneshwar</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Hyderabad</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Chandigarh</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Nashik</p>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold tracking-tight mb-2">ABOUT US</h4>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Tech@OLX</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Careers</p>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold tracking-tight mb-2">OLX</h4>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Blog</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Help</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Sitemap</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Legal & Privacy information</p>
            <p className="text-sm text-gray-500 hover:text-black cursor-pointer">Vulnerability Disclosure Program</p>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold tracking-tight mb-2">FOLLOW US</h4>
            <div className="flex gap-3 mb-4">
              <img src="/images/7e50890d-a4a0-4e03-826f-78e34f811e7a.svg" alt="Facebook" className="h-6 sm:h-7 max-w-full" />
              <img src="/images/insta.svg" alt="Instagram" className="h-6 sm:h-7 max-w-full" />
              <img src="/images/twitter.svg" alt="Twitter" className="h-6 sm:h-7 max-w-full" />
              <img src="/images/play.svg" alt="YouTube" className="h-6 sm:h-7 max-w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <img
                src="https://statics.olx.in/external/base/img/playstore.png"
                alt="Google Play Store"
                className="h-8 sm:h-10 max-w-full"
              />
              <img
                src="https://statics.olx.in/external/base/img/appstore.png"
                alt="App Store"
                className="h-8 sm:h-10 max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
