import React from 'react'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Products from './Components/Products'
import ProductDetails from './Components/ProductDetails'
import { CartProvider } from './Components/CartContext'

const App = () => {
  return (
    <BrowserRouter>
    <CartProvider>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path="/product/:id" element={<><ProductDetails /></>} /> 
      </Routes>
      <Footer/>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
