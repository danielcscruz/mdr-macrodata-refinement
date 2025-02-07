import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Numbers from './Components/Numbers'
import Boxes from './Components/Boxes'
import Footer from './Components/Footer'


function App() {

  return (
    <>
      <Navbar />
      <Numbers />
      <Boxes /> 
      <Footer />
      
    </>
  )
}

export default App
