import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>,
);