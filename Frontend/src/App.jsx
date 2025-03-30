import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Router ,Routes } from 'react-router-dom'
import Cart from './Cart/Cart'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'


function App() {
  const [count, setCount] = useState(0)

  return (
  
  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
  

  )
}

export default App
