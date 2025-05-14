import React from 'react'
import Navbar from './Components/Nav/Navbar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Nav2 from './Components/Nav2/Nav2'
import Post from './Pages/Sell_Post/Post'

import PostCarAdPage from './Pages/Sell_Post/subpages/PostCarAdPage'

import Cards from './Components/Card/Card'
import Carr from './Pages/TEST/Carr'
// import Signup from './Pages/Signup/Signup'
import Footer2 from './Components/Footer2/Footer2'
import AuthRestore from './Pages/Home/AuthRestore'
import SellBike from './Pages/Sell_Post/subpages/SellBike'
import SellMobile from './Pages/Sell_Post/subpages/SellMobile'
import SellLaptop from './Pages/Sell_Post/subpages/SellLaptop'

const App = () => {
  return (
    <div>
  
     
      <BrowserRouter>
      <AuthRestore />
      {/* <Navbar /> */}
      
      {/* <Nav2 /> */}
      {/* <PostAdPage /> */}
      {/* <PostCarAdPage /> */}
      
      
      {/* <SellLaptop /> */}
      
        <Routes>

          {/* <Route path='/sign' element={<><Signup /></>} /> */}
          <Route path='/' element={<><Navbar /> <Cards/><Footer2 /><Footer /></> } />
          {/* <Route path='/footer' element={<Nav2 />} /> */}
          <Route path='/sell' element={<><Nav2 /><Post /></>} />
          <Route path='/add' element={<><Nav2/><SellMobile /></>} />
          <Route path='/addcar' element={<><Nav2/><PostCarAdPage /></>} />
          <Route path='/bike' element={<><Nav2 /><SellBike /></>} />
          {/* <Route path='/cars' element={<><Nav2 /><Carr /></>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
