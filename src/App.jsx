import Hero from "./sections/Hero";
import Navbar from "./components/Navbar";
import Features from "./sections/Features";
import Categories from "./sections/Categories";
import BestSellers from "./sections/BestSellers";
import PromoBanner from "./sections/PromoBanner";
import BrandStory from "./sections/BrandStory";
import Review from "./sections/Review";
import CTA from "./sections/CTA";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

// =========================
// HOME PAGE
// =========================

const Home = () => {
  return (
    <div>
      <Navbar />

      <Hero />

      <Features />

      <Categories />

      <BestSellers />

      <PromoBanner />

      <BrandStory />

      <Review />

      <CTA />

      <Footer />
    </div>
  );
};

// =========================
// APP
// =========================

const App = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* SHOP */}
      <Route
        path="/shop"
        element={
          <>
            <Navbar />
            <Shop />
            <Footer />
          </>
        }
      />

      {/* PRODUCT DETAILS */}
      <Route
        path="/product/:id"
        element={
          <>
            <Navbar />
            <ProductDetails />
            <Footer />
          </>
        }
      />

      {/* CART */}
      <Route
        path="/cart"
        element={
          <>
            <Navbar />
            <Cart />
            <Footer />
          </>
        }
      />

      <Route
        path="/checkout"
        element={
          <>
            <Navbar />
            <Checkout />
            <Footer />
          </>
        }
      />

      <Route
        path="/wishlist"
        element={
          <>
            <Navbar />
            <Wishlist />
            <Footer />
          </>
        }
      />

      <Route
        path="/collections"
        element={
          <>
            <Navbar />
            <Collections />
            <Footer />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

export default App;
