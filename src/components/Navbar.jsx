import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { Search, UserRound, Heart, ShoppingBag, Menu, X, User, } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop Bangles", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);

    setSearchOpen(false);
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#faf8f3] text-[#2c211b]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        {/* ================= LOGO + BRAND ================= */}
        <div className="flex min-w-0 items-center">
          <Link to="/" className="shrink-0">
            <img
              src="/assets/logo.png"
              alt="YAMA FLYS"
              className="h-14 w-auto sm:h-16 lg:h-20"
            />
          </Link>

          <Link
            to="/"
            className="ml-2 hidden min-[400px]:block sm:ml-3 lg:ml-5"
          >
            <h1 className="font-serif text-lg tracking-[0.12em] sm:text-xl lg:text-3xl">
              YAMA FLAYS
            </h1>

            <p className="mt-1 hidden font-serif text-xs tracking-wide text-[#6B4F3A] sm:block lg:mt-3 lg:text-sm">
              Elegant bangles, made for every moment.
            </p>
          </Link>
        </div>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="relative whitespace-nowrap text-sm font-serif transition-colors duration-300 hover:text-[#a4774d] hover:underline underline-offset-8"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
            className="transition-transform duration-300 hover:scale-110"
          >
            <Search size={20} strokeWidth={1.7} />
          </button>

          {/* Account */}
          <Link to="/login">
            <User size={20} strokeWidth={1.5} />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative transition-transform duration-300 hover:scale-110"
          >
            <Heart size={20} strokeWidth={1.7} />

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2c211b] text-[9px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Shopping Bag"
            className="relative transition-transform duration-300 hover:scale-110"
          >
            <ShoppingBag size={20} strokeWidth={1.7} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2c211b] text-[9px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          {isMenuOpen ? (
            <X size={25} strokeWidth={1.7} />
          ) : (
            <Menu size={25} strokeWidth={1.7} />
          )}
        </button>
      </nav>

      {/* ================= SEARCH BOX ================= */}
      {searchOpen && (
        <div className="border-t border-[#e7e0d7] bg-[#faf8f3] px-4 py-4 sm:px-6">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-2xl items-center border-b border-[#2c211b]"
          >
            <Search
              size={19}
              strokeWidth={1.5}
              className="mr-3 shrink-0 text-[#8c7b6d]"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bangles..."
              autoFocus
              className="w-full bg-transparent py-3 text-sm text-[#2c211b] outline-none placeholder:text-[#9a8b7e]"
            />
          </form>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-[#e7e0d7] bg-[#faf8f3] px-5 pb-6 lg:hidden">
          {/* Mobile Navigation */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-[#e7e0d7] py-4 text-sm font-medium transition-colors duration-300 hover:text-[#a4774d]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-6 pt-5">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setIsMenuOpen(false);
              }}
            >
              <Search size={20} strokeWidth={1.7} />
            </button>

            {/* Account */}
            <button type="button" aria-label="Account">
              <UserRound size={20} strokeWidth={1.7} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Wishlist"
              className="relative"
            >
              <Heart size={20} strokeWidth={1.7} />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2c211b] text-[9px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Shopping Bag"
              className="relative"
            >
              <ShoppingBag size={20} strokeWidth={1.7} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2c211b] text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
