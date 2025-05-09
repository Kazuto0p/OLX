import React from 'react'
import Navbar from './Components/Nav/Navbar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route path='/home' element={<><Home /><Footer /></> } />
          <Route path='/footer' element={<Footer />} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
