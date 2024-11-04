import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './others/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetail from './components/ProductDetail';
import PersonalPage from './pages/PersonalPage';
import AccountPage from './pages/AccountPage';
import ViewOrdersHistory from './components/ViewOrdersHistory';

const App = () => (
  <CartProvider>
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/account" element={<AccountPage />}>
          <Route path="personal-info" element={<PersonalPage />} />
          <Route path="order-history" element={<ViewOrdersHistory />} />
        </Route>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:category/brand/:brand" element={<BrandPage />} />
        <Route path="/category/:category/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  </CartProvider >
);

export default App;
