import React from 'react';
import Navbar from './Components/Nav/Navbar';
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Nav2 from './Components/Nav2/Nav2';
import Post from './Pages/Sell_Post/Post';
import PostCarAdPage from './Pages/Sell_Post/subpages/PostCarAdPage';
import Card from './Components/Card/Card'; // Changed from Cards to Card
import Carr from './Pages/TEST/Carr';
import Footer2 from './Components/Footer2/Footer2';
import AuthRestore from './Pages/Home/AuthRestore';
import SellBike from './Pages/Sell_Post/subpages/SellBike';
import SellMobile from './Pages/Sell_Post/subpages/SellMobile';
import SellLaptop from './Pages/Sell_Post/subpages/SellLaptop';
import ProductPreview from './Pages/Details/ProductPreview';
import WishList from './Pages/WishList/WishList';

import Profile from './Components/auth/profile/Profile';
import EditProfile from './Pages/EditProfile/EditProfile';
// import Category from './Components/Category/Category';
import Category from './Components/Category/Category';
import Myads from './Pages/myads/Myads';
const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        {/* <AuthRestore /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Card />
                <Footer2 />
                <Footer />
              </>
            }
          />
          <Route
            path="/sell"
            element={
              <>
                <Nav2 />
                <Post />
                <Footer2 />
                <Footer />
              </>
            }
          />
          <Route
            path="/add"
            element={
              <>
                <Nav2 />
                <SellMobile />
                <Footer2 />
                <Footer />
              </>
            }
          />
          <Route
            path="/addcar"
            element={
              <>
                <Nav2 />
                <PostCarAdPage />
                <Footer2 />
                <Footer />
              </>
            }
          />
          <Route
            path="/bike"
            element={
              <>
                <Nav2 />
                <SellBike />
                <Footer2 />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Navbar />
                <ProductPreview />
                <Footer2 />
                <Footer />
              </>
            }
          />
          <Route path='/prof' element={<><Profile /></>} />
          <Route path='/edit' element={<> <Navbar /><EditProfile/> <Footer/></>} />
          <Route path='/wishlist' element={<> <Navbar /> <WishList /> <Footer/></>} />
          <Route path="/category" element={<> <Navbar /> <Category /> <Footer/></>} />
          <Route path="/myads" element={<> <Navbar /> <Myads /> <Footer/></>} />
          {/* Keep commented route for reference */}
          {/* <Route path="/cars" element={<><Nav2 /><Carr /></>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;