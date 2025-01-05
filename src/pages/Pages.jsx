import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from '../components/navbar/Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const Pages = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default Pages