import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail,
  Sparkles,
  ShoppingBag,
  Loader2,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
   const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // SEND LOGIN REQUEST TO BACKEND
      // =====================================================

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      // =====================================================
      // HANDLE BACKEND ERROR
      // =====================================================

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // =====================================================
      // SAVE LOGIN INFORMATION
      // =====================================================

     login(data, formData.remember);

      // =====================================================
      // REDIRECT BASED ON USER ROLE
      // =====================================================

      if (data.user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error.message ||
          "Unable to login. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordLength = formData.password.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120E0C] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#B78A68]/10 blur-[120px]" />

        <div className="absolute bottom-[-220px] right-[-150px] h-[550px] w-[550px] rounded-full bg-[#8D5F48]/10 blur-[130px]" />

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7B18A]/5 blur-[100px]" />
      </div>

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* =====================================================
          PAGE
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-8 lg:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          {/* =================================================
              LEFT VISUAL
          ================================================= */}

          <section className="relative hidden min-h-[720px] overflow-hidden lg:block">
            <img
              src="/assets/img-1.webp"
              alt="YAMA FLYS Bangles"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[2000ms] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#120E0C]/40 via-[#120E0C]/10 to-[#120E0C]/70" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-[#120E0C]/40" />

            {/* Logo */}

            <div className="absolute left-10 top-10">
              <Link to="/" className="font-serif text-2xl tracking-wide">
                YAMA <span className="italic text-[#D8B18C]">FLYS</span>
              </Link>

              <div className="mt-2 flex items-center gap-2">
                <div className="h-px w-8 bg-[#D8B18C]" />

                <span className="text-[8px] uppercase tracking-[0.4em] text-white/50">
                  Fine Jewellery
                </span>
              </div>
            </div>

            {/* Floating Badge */}

            <div className="absolute right-8 top-10 animate-[floating_5s_ease-in-out_infinite] rounded-2xl border border-white/15 bg-black/20 px-5 py-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8B18C]/30 bg-[#D8B18C]/10">
                  <Sparkles
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#D8B18C]"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium">Crafted with Elegance</p>

                  <p className="mt-1 text-[9px] text-white/40">
                    Timeless • Elegant • Yours
                  </p>
                </div>
              </div>
            </div>

            {/* Main Text */}

            <div className="absolute bottom-12 left-10 right-10">
              <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.5em] text-[#D8B18C]">
                The YAMA FLYS Experience
              </p>

              <h2 className="max-w-xl font-serif text-5xl leading-[1.05] xl:text-6xl">
                Your elegance,
                <span className="block italic text-[#D8B18C]">your story.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
                Step into a world of timeless bangle designs, carefully selected
                to make every occasion special.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-14 bg-[#D8B18C]" />

                <span className="text-[8px] uppercase tracking-[0.35em] text-white/40">
                  YAMA FLYS
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT LOGIN
          ================================================= */}

          <section className="relative flex min-h-[720px] items-center justify-center px-6 py-16 sm:px-10 lg:px-12">
            {/* Mobile Logo */}

            <div className="absolute left-6 top-7 sm:left-10 lg:hidden">
              <Link to="/" className="font-serif text-xl">
                YAMA <span className="italic text-[#D8B18C]">FLYS</span>
              </Link>
            </div>

            <div className="w-full max-w-[390px]">
              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="animate-[fadeUp_0.7s_ease-out]">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8B18C]/20 bg-[#D8B18C]/10">
                    <Sparkles
                      size={18}
                      strokeWidth={1.2}
                      className="text-[#D8B18C]"
                    />
                  </div>

                  <div className="h-px w-10 bg-[#D8B18C]/40" />
                </div>

                <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-[#D8B18C]">
                  Welcome Back
                </p>

                <h1 className="mt-4 font-serif text-5xl tracking-tight">
                  Sign In
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">
                  Enter your details to continue your YAMA FLYS journey.
                </p>
              </div>

              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {error && (
                <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs leading-5 text-red-300">
                  {error}
                </div>
              )}

              {/* =================================================
                  FORM
              ================================================= */}

              <form onSubmit={handleSubmit} className="mt-9 space-y-6">
                {/* EMAIL */}

                <div className="group">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[9px] font-medium uppercase tracking-[0.25em] text-white/45"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      strokeWidth={1.3}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors duration-300 group-focus-within:text-[#D8B18C]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      autoComplete="email"
                      disabled={loading}
                      className="peer w-full rounded-xl border border-white/10 bg-white/[0.045] py-4 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#D8B18C]/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-[#D8B18C]/5 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#D8B18C] transition-all duration-500 peer-focus:w-[90%]" />
                  </div>
                </div>

                {/* PASSWORD */}

                <div className="group">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/45"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setError(
                          "Password recovery will be connected to the backend.",
                        )
                      }
                      className="text-[10px] text-[#D8B18C] transition-colors hover:text-white"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      size={17}
                      strokeWidth={1.3}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors duration-300 group-focus-within:text-[#D8B18C]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="peer w-full rounded-xl border border-white/10 bg-white/[0.045] py-4 pl-12 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/20 focus:border-[#D8B18C]/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-[#D8B18C]/5 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition-all duration-200 hover:scale-110 hover:text-[#D8B18C] disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff size={17} strokeWidth={1.3} />
                      ) : (
                        <Eye size={17} strokeWidth={1.3} />
                      )}
                    </button>

                    <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#D8B18C] transition-all duration-500 peer-focus:w-[90%]" />
                  </div>

                  {/* Password Strength */}

                  {passwordLength > 0 && (
                    <div className="mt-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              passwordLength >= item * 3
                                ? "bg-[#D8B18C]"
                                : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-2 text-[9px] text-white/25">
                        {passwordLength < 6
                          ? "Weak password"
                          : passwordLength < 10
                            ? "Good password"
                            : "Strong password"}
                      </p>
                    </div>
                  )}
                </div>

                {/* REMEMBER ME */}

                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 cursor-pointer accent-[#D8B18C]"
                  />

                  <span className="text-xs text-white/40">Remember me</span>
                </label>

                {/* =================================================
                    LOGIN BUTTON
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#D8B18C] py-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#17110E] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5C5A3] hover:shadow-[0_15px_40px_rgba(216,177,140,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* Shine */}

                  <span className="absolute left-[-100%] top-0 h-full w-20 skew-x-[-20deg] bg-white/30 transition-all duration-700 group-hover:left-[120%]" />

                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* =================================================
                  REGISTER
              ================================================= */}

              <div className="mt-9 text-center">
                <p className="text-xs text-white/35">
                  Don't have a YAMA FLYS account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-[#D8B18C] transition-all duration-300 hover:gap-3 hover:text-white"
                >
                  Create an Account
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* =================================================
                  CONTINUE SHOPPING
              ================================================= */}

              <div className="mt-8 flex justify-center">
                <Link
                  to="/shop"
                  className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25 transition-colors hover:text-[#D8B18C]"
                >
                  <ShoppingBag size={13} strokeWidth={1.2} />
                  Continue Shopping
                </Link>
              </div>

              {/* SECURITY */}

              <div className="mt-8 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/20">
                <Check size={11} />
                Secure Account
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floating {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  );
};

export default Login;
