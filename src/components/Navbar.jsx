
  import { useCallback, useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Mic,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useAuth } from "../Context/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const COLORS = {
  green: "#10271E",
  gold: "#D9C28D",
  lightGold: "#E8D5A7",
  cream: "#FFF9EF",
};

const ICON_BUTTON =
  "relative flex h-10 w-10 shrink-0 items-center justify-center " +
  "rounded-full border border-white/15 text-white/90 " +
  "transition duration-300 hover:border-[#D9C28D]/70 " +
  "hover:bg-white/10 hover:text-[#E8D5A7] " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#D9C28D]";

const COUNT_BADGE =
  "absolute -right-1 -top-1 flex h-[17px] min-w-[17px] " +
  "items-center justify-center rounded-full bg-[#D9C28D] " +
  "px-1 text-[9px] font-bold text-[#10271E]";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");

  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  const closePanels = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  const isActive = (href) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname === href ||
        location.pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 35);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closePanels();
    setQuery("");
    setVoiceMessage("");
  }, [location.pathname, closePanels]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePanels();
        recognitionRef.current?.stop();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closePanels]);

  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const goTo = (path) => {
    closePanels();
    navigate(path);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const search = query.trim();

    if (!search) {
      inputRef.current?.focus();
      return;
    }

    recognitionRef.current?.stop();
    navigate(`/shop?search=${encodeURIComponent(search)}`);
    closePanels();
    setQuery("");
    setVoiceMessage("");
  };

  const handleVoiceSearch = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceMessage("Voice search is not supported in this browser.");
      return;
    }

    try {
      recognitionRef.current?.abort();

      const recognition = new SpeechRecognition();

      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
        setVoiceMessage("Listening...");
      };

      recognition.onresult = (event) => {
        const result = event.results?.[0]?.[0]?.transcript?.trim();

        if (result) {
          setQuery(result);
          setVoiceMessage(`Recognized: ${result}`);
        }
      };

      recognition.onerror = (event) => {
        setListening(false);
        setVoiceMessage(
          event.error === "not-allowed"
            ? "Please allow microphone access."
            : "Voice search failed. Please try again."
        );
      };

      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setListening(false);
      setVoiceMessage("Unable to start voice search.");
    }
  };

  const renderNavLink = ({ label, href }, mobile = false) => {
    const active = isActive(href);

    if (mobile) {
      return (
        <Link
          key={href}
          to={href}
          onClick={closePanels}
          className={`flex min-h-12 items-center justify-between rounded-xl px-4 py-3 transition ${
            active
              ? "bg-white/10 text-[#E8D5A7]"
              : "text-white/85 hover:bg-white/[0.06] hover:text-[#E8D5A7]"
          }`}
        >
          <span className="font-serif text-lg">{label}</span>
          <ArrowRight size={16} className="text-[#D9C28D]" />
        </Link>
      );
    }

    return (
      <Link
        key={href}
        to={href}
        className={`rounded-full px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C28D] ${
          active
            ? "bg-white/10 text-[#E8D5A7]"
            : "text-white/80 hover:bg-white/[0.08] hover:text-[#E8D5A7]"
        }`}
      >
        {label}
      </Link>
    );
  };

  const renderCount = (count) =>
    count > 0 ? <span className={COUNT_BADGE}>{count}</span> : null;

  const renderSearchForm = (mobile = false) => (
    <form
      onSubmit={handleSearch}
      role="search"
      className={
        mobile
          ? "flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-2"
          : "mx-auto flex max-w-2xl items-center gap-3 px-4 py-3"
      }
    >
      <Search size={17} className="shrink-0 text-[#D9C28D]" />

      <input
        ref={mobile ? undefined : inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search bangles, designs..."
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <button
        type="button"
        onClick={handleVoiceSearch}
        aria-label={listening ? "Stop voice search" : "Voice search"}
        className={`${ICON_BUTTON} ${
          mobile ? "h-9 w-9" : ""
        } ${listening ? "bg-[#D9C28D]/20 text-[#E8D5A7]" : ""}`}
      >
        <Mic size={mobile ? 16 : 17} />
      </button>

      <button
        type="submit"
        aria-label={mobile ? "Submit search" : undefined}
        className={
          mobile
            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9C28D] text-[#10271E]"
            : "rounded-full bg-[#D9C28D] px-5 py-2.5 text-[9px] font-bold uppercase tracking-wider text-[#10271E] transition hover:bg-[#E8D5A7]"
        }
      >
        {mobile ? <ArrowRight size={16} /> : "Search"}
      </button>
    </form>
  );


const renderAccountActions = (mobile = false) => (
  <>
    <button
      type="button"
      onClick={() => goTo(isAuthenticated ? "/profile" : "/login")}
      aria-label={isAuthenticated ? "Profile" : "Login"}
      className={
        mobile
          ? "flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 text-xs text-white transition hover:bg-white/[0.06]"
          : ICON_BUTTON
      }
    >
      <UserRound size={mobile ? 16 : 18} />
      {mobile && (isAuthenticated ? (user?.name || "Profile") : "Login")}
    </button>

    <button
      type="button"
      onClick={() => goTo("/wishlist")}
      aria-label={`Wishlist, ${wishlistCount} items`}
      className={
        mobile
          ? "flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 text-xs text-white transition hover:bg-white/[0.06]"
          : ICON_BUTTON
      }
    >
      <Heart size={mobile ? 16 : 18} />
      {mobile && "Wishlist"}
      {mobile
        ? wishlistCount > 0 && ` (${wishlistCount})`
        : renderCount(wishlistCount)}
    </button>
  </>
);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      <div
        className={`mx-auto w-full max-w-[1500px] overflow-visible rounded-[22px] border transition-all duration-500 ${
          scrolled
            ? "border-white/15 bg-[#10271E]/85 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
            : "border-white/20 bg-[#10271E]/25 shadow-[0_8px_35px_rgba(0,0,0,0.06)] backdrop-blur-md"
        }`}
      >
        {/* Announcement */}
        <div
          className={`flex items-center justify-center gap-2 overflow-hidden rounded-t-[21px] border-b border-white/10 px-3 text-center transition-all duration-300 ${
            scrolled
              ? "h-0 border-transparent opacity-0"
              : "h-8 opacity-100"
          }`}
        >
          <Sparkles size={11} className="shrink-0 text-[#D9C28D]" />
          <span className="truncate text-[8px] font-medium uppercase tracking-[0.14em] text-white/80 sm:text-[9px] sm:tracking-[0.2em]">
            A little sparkle, a lasting impression
          </span>
        </div>

        {/* Main navigation: three-column grid keeps logo centered */}
        <div className="grid min-h-[66px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:min-h-[72px] sm:px-5 lg:px-6">
          {/* Desktop links */}
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 items-center gap-0.5 xl:flex"
          >
            {NAV_LINKS.map((item) => renderNavLink(item))}
          </nav>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`${ICON_BUTTON} col-start-1 justify-self-start xl:hidden`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Center logo */}
          <Link
            to="/"
            onClick={closePanels}
            aria-label="YAMA FLYS home"
            className="col-start-2 row-start-1 min-w-0 text-center"
          >
            <span className="relative whitespace-nowrap font-serif text-[18px] font-semibold tracking-[0.06em] text-[#FFF9EF] sm:text-[25px] sm:tracking-[0.12em]">
              YAMA FLAYS
              <Sparkles
                size={10}
                className="absolute -right-4 -top-1 text-[#D9C28D] sm:-right-5"
              />
            </span>
            <span className="mt-1 block whitespace-nowrap text-[5px] uppercase tracking-[0.2em] text-white/65 sm:text-[7px] sm:tracking-[0.3em]">
              Pretty Things · Happy You
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="col-start-3 hidden min-w-0 items-center justify-self-end gap-1.5 xl:flex 2xl:gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open);
                setMenuOpen(false);
              }}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              className={`${ICON_BUTTON} w-auto gap-2 px-3`}
            >
              {searchOpen ? <X size={17} /> : <Search size={17} />}
              <span className="text-[9px] font-semibold uppercase tracking-wider">
                Search
              </span>
            </button>

            {renderAccountActions()}

            <button
              type="button"
              onClick={() => goTo("/cart")}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#D9C28D] px-3 text-[#10271E] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E8D5A7] sm:px-4"
            >
              <ShoppingBag size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider">
                Bag
              </span>
              {cartCount > 0 && (
                <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#10271E] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile cart */}
          <button
            type="button"
            onClick={() => goTo("/cart")}
            aria-label={`Shopping bag, ${cartCount} items`}
            className={`${ICON_BUTTON} col-start-3 row-start-1 justify-self-end xl:hidden`}
          >
            <ShoppingBag size={18} />
            {renderCount(cartCount)}
          </button>
        </div>

        {/* Desktop search */}
        <div
          className={`hidden overflow-hidden transition-all duration-300 xl:block ${
            searchOpen
              ? "max-h-28 border-t border-white/10"
              : "max-h-0 border-t border-transparent"
          }`}
        >
          {renderSearchForm()}
          {voiceMessage && (
            <p role="status" className="pb-2 text-center text-xs text-[#E8D5A7]">
              {voiceMessage}
            </p>
          )}
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out xl:hidden ${
            menuOpen
              ? "max-h-[calc(100dvh-100px)] border-t border-white/15"
              : "max-h-0 border-t border-transparent"
          }`}
        >
          <div className="max-h-[calc(100dvh-100px)] overflow-y-auto bg-[#10271E]/95 px-4 pb-5 pt-4 backdrop-blur-2xl sm:px-6">
            {renderSearchForm(true)}

            {voiceMessage && (
              <p role="status" className="mt-2 px-1 text-xs text-[#E8D5A7]">
                {voiceMessage}
              </p>
            )}

            <nav aria-label="Mobile navigation" className="mt-4 space-y-1">
              {NAV_LINKS.map((item) => renderNavLink(item, true))}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {renderAccountActions(true)}
            </div>

            <div className="mt-4 rounded-xl border border-[#D9C28D]/20 bg-[#D9C28D]/[0.06] px-4 py-4 text-center">
              <Sparkles size={18} className="mx-auto text-[#D9C28D]" />
              <p className="mt-2 font-serif text-lg text-[#FFF9EF]">
                A little sparkle, just for you.
              </p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/55">
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
