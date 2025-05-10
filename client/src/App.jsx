import React from 'react'
import Navbar from './Components/Nav/Navbar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Nav2 from './Components/Nav2/Nav2'

const App = () => {
  return (
    <div>
     
      <BrowserRouter>
      {/* <Navbar /> */}
      <Nav2 />
      
        <Routes>
          <Route path='/home' element={<><Home /><Footer /></> } />
          {/* <Route path='/footer' element={<Nav2 />} /> */}
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
