import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  /* =========================================
     SCROLL EFFECT
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================
     ROUTE CHANGE
  ========================================= */

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  /* =========================================
     ESCAPE KEY
  ========================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================
     BODY SCROLL LOCK
  ========================================= */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);

    setSearchQuery("");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  /* =========================================
     ACTIVE LINK
  ========================================= */

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === href ||
      location.pathname.startsWith(`${href}/`)
    );
  };

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const closeMenu = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const goTo = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <header
      className={`
        fixed
        left-0
        top-0
        z-[100]
        w-full
        px-2
        transition-all
        duration-500
        sm:px-4
        lg:px-7
        ${scrolled ? "pt-2" : "pt-2.5 sm:pt-3"}
      `}
    >
      <div
        className={`
          mx-auto
          w-full
          max-w-[1440px]
          overflow-hidden
          border
          border-[#eadbdd]
          bg-[#fffaf8]/95
          backdrop-blur-2xl
          transition-all
          duration-500
          ${
            scrolled
              ? "rounded-[18px] shadow-[0_10px_35px_rgba(75,43,52,0.14)]"
              : "rounded-[20px] shadow-[0_12px_45px_rgba(75,43,52,0.09)] sm:rounded-[26px]"
          }
        `}
      >
        {/* =========================================
            ANNOUNCEMENT BAR
        ========================================== */}

        <div
          className="
            flex
            min-h-[29px]
            items-center
            justify-center
            gap-1.5
            bg-[#f5e1e5]
            px-3
            py-1.5
            text-center
            sm:gap-2
            sm:px-4
          "
        >
          <Sparkles
            size={10}
            strokeWidth={1.5}
            className="shrink-0 text-[#a56b79]"
          />

          <p
            className="
              text-[7px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-[#704953]
              sm:text-[9px]
              sm:tracking-[0.17em]
            "
          >
            New arrivals are here
          </p>

          <span className="text-[9px] text-[#c28b99]">
            ♡
          </span>
        </div>

        {/* =========================================
            MAIN NAV
        ========================================== */}

        <div
          className="
            relative
            flex
            min-h-[62px]
            items-center
            px-2
            py-2
            sm:min-h-[72px]
            sm:px-5
            lg:min-h-[76px]
            lg:px-7
          "
        >
          {/* =======================================
              DESKTOP NAV
          ======================================== */}

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              to="/"
              className={`
                rounded-full
                px-4
                py-2.5
                text-[10px]
                font-medium
                uppercase
                tracking-[0.13em]
                transition-all
                duration-300
                ${
                  isActive("/")
                    ? "bg-[#493238] text-white"
                    : "text-[#493238] hover:bg-[#f7eceb]"
                }
              `}
            >
              Home
            </Link>

            {navLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  rounded-full
                  px-4
                  py-2.5
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.13em]
                  transition-all
                  duration-300
                  ${
                    isActive(item.href)
                      ? "bg-[#493238] text-white"
                      : "text-[#493238] hover:bg-[#f7eceb]"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* =======================================
              MOBILE LEFT - MENU
          ======================================== */}

          <button
            type="button"
            onClick={() => {
              setMenuOpen((value) => !value);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#f7eceb]
              text-[#493238]
              transition-all
              duration-300
              hover:bg-[#f1dfe1]
              lg:hidden
            "
          >
            {menuOpen ? (
              <X size={19} strokeWidth={1.7} />
            ) : (
              <Menu size={19} strokeWidth={1.7} />
            )}
          </button>

          {/* =======================================
              LOGO
          ======================================== */}

          <Link
            to="/"
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              text-center
            "
          >
            <div
              className="
                relative
                whitespace-nowrap
                font-serif
                text-[18px]
                font-semibold
                tracking-[0.07em]
                text-[#493238]
                transition-transform
                duration-300
                hover:-rotate-1
                sm:text-[24px]
                sm:tracking-[0.11em]
              "
            >
              YAMA FLYS

              <span
                className="
                  absolute
                  -right-3
                  -top-2
                  text-[9px]
                  text-[#c59b54]
                  sm:-right-4
                  sm:-top-2
                  sm:text-[11px]
                "
              >
                ✦
              </span>
            </div>

            <p
              className="
                mt-0.5
                whitespace-nowrap
                text-[4.5px]
                font-medium
                uppercase
                tracking-[0.27em]
                text-[#a56b79]
                sm:text-[6.5px]
                sm:tracking-[0.35em]
              "
            >
              Pretty Things • Happy You
            </p>
          </Link>

          {/* =======================================
              DESKTOP RIGHT ACTIONS
          ======================================== */}

          <div className="ml-auto hidden items-center gap-1 lg:flex">
            {/* SEARCH */}

            <button
              type="button"
              onClick={() => {
                setSearchOpen((value) => !value);
                setMenuOpen(false);
              }}
              aria-label="Search"
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-full
                px-3
                text-[#493238]
                transition-all
                duration-300
                hover:bg-[#f7eceb]
                hover:text-[#a56b79]
              "
            >
              <Search size={16} strokeWidth={1.7} />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                "
              >
                Search
              </span>
            </button>

            {/* ACCOUNT */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              aria-label="Account"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-[#493238]
                transition-all
                duration-300
                hover:bg-[#f7eceb]
                hover:text-[#a56b79]
              "
            >
              <UserRound size={17} strokeWidth={1.7} />
            </button>

            {/* WISHLIST */}

            <button
              type="button"
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-[#493238]
                transition-all
                duration-300
                hover:bg-[#f7eceb]
                hover:text-[#a56b79]
              "
            >
              <Heart size={17} strokeWidth={1.7} />

              {wishlistCount > 0 && (
                <span
                  className="
                    absolute
                    right-0
                    top-0
                    flex
                    h-[16px]
                    min-w-[16px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#b97888]
                    px-1
                    text-[8px]
                    font-semibold
                    text-white
                  "
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* BAG */}

            <button
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Shopping bag"
              className="
                relative
                flex
                h-10
                items-center
                gap-2
                rounded-full
                bg-[#493238]
                px-4
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#5b3e45]
              "
            >
              <ShoppingBag size={16} strokeWidth={1.7} />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                "
              >
                Bag
              </span>

              {cartCount > 0 && (
                <span
                  className="
                    flex
                    h-[16px]
                    min-w-[16px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#e9c3ca]
                    px-1
                    text-[8px]
                    font-semibold
                    text-[#493238]
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* =======================================
              MOBILE BAG
          ======================================== */}

          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label="Shopping bag"
            className="
              relative
              ml-auto
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#493238]
              text-white
              transition-all
              duration-300
              hover:bg-[#5b3e45]
              lg:hidden
            "
          >
            <ShoppingBag size={17} strokeWidth={1.7} />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  h-[16px]
                  min-w-[16px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e9c3ca]
                  px-1
                  text-[8px]
                  font-semibold
                  text-[#493238]
                "
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* =========================================
            SEARCH PANEL
        ========================================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            ${
              searchOpen
                ? "max-h-[120px] border-t border-[#eadbdd]"
                : "max-h-0"
            }
          `}
        >
          <form
            onSubmit={handleSearch}
            className="px-3 py-3 sm:px-7 sm:py-4"
          >
            <div
              className="
                mx-auto
                flex
                max-w-2xl
                items-center
                gap-2
                rounded-full
                border
                border-[#e3d2d5]
                bg-white
                px-3
                py-1.5
                shadow-sm
                sm:px-4
                sm:py-2
              "
            >
              <Search
                size={15}
                strokeWidth={1.5}
                className="shrink-0 text-[#aa7b85]"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search bangles, collections..."
                aria-label="Search products"
                autoFocus={searchOpen}
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1
                  py-2
                  text-[13px]
                  text-[#493238]
                  outline-none
                  placeholder:text-[#b9a8ad]
                  sm:text-sm
                "
              />

              <button
                type="submit"
                className="
                  shrink-0
                  rounded-full
                  bg-[#493238]
                  px-3.5
                  py-2
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#5b3e45]
                  sm:px-4
                  sm:text-[8px]
                "
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* =========================================
            MOBILE MENU
        ========================================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            lg:hidden
            ${
              menuOpen
                ? "max-h-[calc(100vh-95px)] border-t border-[#eadbdd]"
                : "max-h-0"
            }
          `}
        >
          <div
            className="
              max-h-[calc(100vh-95px)]
              overflow-y-auto
              bg-[#fffaf8]
              px-3
              pb-5
              pt-3
              sm:px-6
              sm:pb-6
              sm:pt-4
            "
          >
            {/* SEARCH */}

            <form onSubmit={handleSearch} className="mb-3">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#eadbdd]
                  bg-white
                  px-3
                  py-2
                "
              >
                <Search
                  size={16}
                  className="shrink-0 text-[#a56b79]"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search bangles..."
                  aria-label="Search products"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    py-2
                    text-sm
                    text-[#493238]
                    outline-none
                    placeholder:text-[#b9a8ad]
                  "
                />

                <button
                  type="submit"
                  className="
                    rounded-xl
                    bg-[#493238]
                    px-3
                    py-2
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.1em]
                    text-white
                  "
                >
                  Search
                </button>
              </div>
            </form>

            {/* NAV LINKS */}

            <div className="space-y-1.5">
              <Link
                to="/"
                onClick={closeMenu}
                className={`
                  flex
                  min-h-[52px]
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3
                  transition-all
                  duration-300
                  ${
                    isActive("/")
                      ? "bg-[#f5e1e5]"
                      : "hover:bg-[#faf0ef]"
                  }
                `}
              >
                <span className="font-serif text-lg text-[#493238]">
                  Home
                </span>

                <ArrowRight
                  size={16}
                  className="text-[#b37b88]"
                />
              </Link>

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className={`
                    flex
                    min-h-[52px]
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-3
                    transition-all
                    duration-300
                    ${
                      isActive(item.href)
                        ? "bg-[#f5e1e5]"
                        : "hover:bg-[#faf0ef]"
                    }
                  `}
                >
                  <span className="font-serif text-lg text-[#493238]">
                    {item.label}
                  </span>

                  <ArrowRight
                    size={16}
                    className="text-[#b37b88]"
                  />
                </Link>
              ))}
            </div>

            {/* ACCOUNT / WISHLIST */}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => goTo("/login")}
                className="
                  flex
                  min-h-[50px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#eadbdd]
                  bg-white
                  px-3
                  py-3
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  text-[#493238]
                  transition-all
                  hover:bg-[#faf0ef]
                "
              >
                <UserRound size={15} />
                Account
              </button>

              <button
                type="button"
                onClick={() => goTo("/wishlist")}
                className="
                  flex
                  min-h-[50px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#eadbdd]
                  bg-white
                  px-3
                  py-3
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.1em]
                  text-[#493238]
                  transition-all
                  hover:bg-[#faf0ef]
                "
              >
                <Heart size={15} />

                Wishlist

                {wishlistCount > 0 && (
                  <span className="text-[#b97888]">
                    ({wishlistCount})
                  </span>
                )}
              </button>
            </div>

            {/* BRAND MESSAGE */}

            <div
              className="
                mt-3
                rounded-[18px]
                bg-[#f5e1e5]
                px-4
                py-4
                text-center
              "
            >
              <Sparkles
                size={15}
                className="mx-auto text-[#b47784]"
              />

              <p className="mt-2 font-serif text-lg text-[#704953]">
                A little sparkle,
                <br />
                just for you.
              </p>

              <p
                className="
                  mt-2
                  text-[7px]
                  uppercase
                  tracking-[0.18em]
                  text-[#a56b79]
                "
              >
                YAMA FLYS
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;