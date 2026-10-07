import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import ScrollProgress from "./components/ScrollProgress";

// Home sections
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Categories from "./sections/Categories";
import BestSellers from "./sections/BestSellers";
import PromoBanner from "./sections/PromoBanner";
import BrandStory from "./sections/BrandStory";
import CTA from "./sections/CTA";

// Pages
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductAdmin from "./pages/ProductAdmin";
import OrderSuccess from "./pages/OrderSuccess";

// Route protection
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

/* =========================================
   COMMON PAGE LAYOUT
========================================= */

const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

/* =========================================
   HOME PAGE
========================================= */

const Home = () => {
  return (
    <PageLayout>
      <ScrollReveal direction="up">
        <Hero />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={80}>
        <Features />
      </ScrollReveal>

      <ScrollReveal direction="left" delay={80}>
        <Categories />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <BestSellers />
      </ScrollReveal>

      <ScrollReveal direction="right" delay={100}>
        <PromoBanner />
      </ScrollReveal>

      <ScrollReveal direction="left" delay={100}>
        <BrandStory />
      </ScrollReveal>

      <ScrollReveal direction="scale" delay={100}>
        <CTA />
      </ScrollReveal>
    </PageLayout>
  );
};

/* =========================================
   APP
========================================= */

const App = () => {
  return (
    <>
      {/* Global scroll progress */}
      <ScrollProgress />

      <Routes>

        {/* =====================================
            HOME
        ===================================== */}

        <Route path="/" element={<Home />} />

        {/* =====================================
            SHOP
        ===================================== */}

        <Route
          path="/shop"
          element={
            <PageLayout>
              <Shop />
            </PageLayout>
          }
        />

        {/* =====================================
            PRODUCT DETAILS
        ===================================== */}

        <Route
          path="/product/:id"
          element={
            <PageLayout>
              <ProductDetails />
            </PageLayout>
          }
        />

        {/* =====================================
            CART
        ===================================== */}

        <Route
          path="/cart"
          element={
            <PageLayout>
              <Cart />
            </PageLayout>
          }
        />

        {/* =====================================
            CHECKOUT
            LOGIN REQUIRED
        ===================================== */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/checkout"
            element={
              <PageLayout>
                <Checkout />
              </PageLayout>
            }
          />
        </Route>

        {/* =====================================
            WISHLIST
        ===================================== */}

        <Route
          path="/wishlist"
          element={
            <PageLayout>
              <Wishlist />
            </PageLayout>
          }
        />

        {/* =====================================
            COLLECTIONS
        ===================================== */}

        <Route
          path="/collections"
          element={
            <PageLayout>
              <Collections />
            </PageLayout>
          }
        />

        {/* =====================================
            ABOUT
        ===================================== */}

        <Route
          path="/about"
          element={
            <PageLayout>
              <About />
            </PageLayout>
          }
        />

        {/* =====================================
            CONTACT
        ===================================== */}

        <Route
          path="/contact"
          element={
            <PageLayout>
              <Contact />
            </PageLayout>
          }
        />

        {/* =====================================
            ORDER SUCCESS
        ===================================== */}

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* =====================================
            LOGIN
        ===================================== */}

        <Route path="/login" element={<Login />} />

        {/* =====================================
            REGISTER
        ===================================== */}

        <Route path="/register" element={<Register />} />

        {/* =====================================
            ADMIN PRODUCTS
            ADMIN ONLY
        ===================================== */}

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/products"
            element={
              <PageLayout>
                <ProductAdmin />
              </PageLayout>
            }
          />
        </Route>

        {/* =====================================
            404
        ===================================== */}

        <Route
          path="*"
          element={
            <PageLayout>
              <main className="flex min-h-[60vh] items-center justify-center bg-[#F5EEF7] px-6">
                <div className="text-center">

                  <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#76517F]">
                    YAMA FLYS
                  </p>

                  <h1 className="font-serif text-5xl text-[#281A35]">
                    Page Not Found
                  </h1>

                  <p className="mt-4 text-sm text-[#756A7C]">
                    The page you are looking for does not exist.
                  </p>

                </div>
              </main>
            </PageLayout>
          }
        />

      </Routes>
    </>
  );
};

export default App;