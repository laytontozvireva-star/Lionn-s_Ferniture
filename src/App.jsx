import { Routes, Route } from 'react-router-dom';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import CustomFurniture from './pages/CustomFurniture';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import OrderConfirmation from './pages/OrderConfirmation';
import Payment from './pages/Payment';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#101726] font-sans">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/custom-furniture" element={<CustomFurniture />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#101726] font-sans">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/shop"              element={<Shop />} />
          <Route path="/shop/:id"          element={<ProductDetails />} />
          <Route path="/custom-furniture"  element={<CustomFurniture />} />
          <Route path="/about"             element={<About />} />
          <Route path="/contact"           element={<Contact />} />
          <Route path="/wishlist"          element={<Wishlist />} />
          <Route path="/cart"              element={<Cart />} />
          <Route path="/checkout"          element={<Checkout />} />
          <Route path="/thank-you"          element={<ThankYou />} />
          <Route path="/account"           element={<Account />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
