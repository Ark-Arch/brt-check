import { useState } from 'react'
import Signup from './Component/Auth-pages/Signup'
import Passwordreset from './Component/Auth-pages/passwordreset'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/passwordreset" element={<Passwordreset/>} />
      </Routes>

    </>
  )
}

export default App
