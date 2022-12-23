import React from 'react'
import Homepage from '../../Pages/Homepage'
import Login from '../../Pages/Login/Login'
import Register from '../../Pages/Register/Register'
import Products from '../../Pages/Products'
import ProductDetail from '../../Pages/ProductDetail'
import News from '../../Pages/News'
import CartModal from '../../Components/CartModal/CartModal'
import FigurePeekModal from '../../Components/FigurePeekModal/FigurePeekModal'
import ScrollToTop from '../../Components/ScrollToTop'
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router"

function Main() {
  const location = useLocation()


  return (
    <ScrollToTop>
      <CartModal />
      <FigurePeekModal />
      <Routes location={location}>

        <Route path="/" element={
          <Homepage title="Trang chủ" />
        } />

        <Route path="/login" element={
          <Login title="Đăng nhập" />
        } />

        <Route path="/register" element={
          <Register title="Đăng ký" />
        } />

        <Route path="/products" element={
          <Products title="Sản phẩm" />
        } />

        <Route path="/news" element={
          <News title="Tin tức" />
        } />

        <Route path="/detail/:name" element={
          <ProductDetail />
        } />

      </Routes>
    </ScrollToTop>
  )
}

export default Main