
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
  ShieldCheck,
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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

      const response = await fetch(
        "https://yama-flays-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password.");
      }

      if (!data.user || !data.user.role) {
        throw new Error("Invalid login response. Please try again.");
      }

      login(data, formData.remember);

    if (data.user?.role === "admin") {
  navigate("/admin/products");
} else {
  navigate("/profile");
}
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error.message ||
          "Unable to login. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordLength = formData.password.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F5] text-[#173D2B]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#DCE9DF]/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-[#E6EAE4]/80 blur-3xl" />

      {/* Subtle Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#173D2B_1px,transparent_1px),linear-gradient(90deg,#173D2B_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Page */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#E0E7E0] bg-white shadow-[0_30px_90px_rgba(23,61,43,0.12)] lg:grid-cols-[1.05fr_0.95fr]">

          {/* LEFT HERO SECTION */}
          <section className="relative hidden min-h-[720px] overflow-hidden lg:block">
            <img
              src="/assets/img-1.webp"
              alt="YAMA FLYS bangle collection"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
            />

            {/* Green Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#173D2B]/85 via-[#173D2B]/50 to-[#10291D]/90" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10291D]/80 via-transparent to-[#173D2B]/30" />

            {/* Decorative Circles */}
            <div className="pointer-events-none absolute -right-20 top-32 h-72 w-72 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -right-10 top-42 h-52 w-52 rounded-full border border-white/10" />

            {/* Brand */}
            <div className="absolute left-10 top-10">
              <Link to="/" className="font-serif text-2xl tracking-wide text-white">
                YAMA <span className="italic text-[#D8C18E]">FLYS</span>
              </Link>

              <div className="mt-2 flex items-center gap-2">
                <div className="h-px w-8 bg-[#D8C18E]" />
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/65">
                  Fine Jewellery
                </span>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute right-7 top-10 animate-[floating_5s_ease-in-out_infinite] rounded-2xl border border-white/20 bg-[#173D2B]/45 px-4 py-4 backdrop-blur-xl xl:right-8 xl:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8C18E]/40 bg-white/10">
                  <Sparkles
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#D8C18E]"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-white">
                    Crafted with Elegance
                  </p>
                  <p className="mt-1 text-[9px] text-white/65">
                    Timeless · Elegant · Yours
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-12 left-10 right-10">
              <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.4em] text-[#D8C18E]">
                The YAMA FLYS Experience
              </p>

              <h2 className="max-w-xl font-serif text-5xl leading-[1.08] text-white xl:text-6xl">
                Your elegance,
                <span className="mt-2 block italic text-[#D8C18E]">
                  your story.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
                Discover timeless bangle designs, thoughtfully selected to
                make your everyday moments and special occasions memorable.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-14 bg-[#D8C18E]" />
                <span className="text-[8px] uppercase tracking-[0.35em] text-white/65">
                  Beauty in every detail
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT LOGIN SECTION */}
          <section className="relative flex min-h-[680px] items-center justify-center px-5 py-20 sm:px-10 sm:py-16 lg:px-12">
            {/* Mobile Brand */}
            <div className="absolute left-6 top-6 lg:hidden">
              <Link to="/" className="font-serif text-xl text-[#173D2B]">
                YAMA <span className="italic text-[#64856B]">FLYS</span>
              </Link>
            </div>

            <div className="w-full max-w-[390px]">

              {/* Header */}
              <div className="animate-[fadeUp_0.7s_ease-out]">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE7DD] bg-[#EDF3ED]">
                    <Sparkles
                      size={19}
                      strokeWidth={1.4}
                      className="text-[#28583D]"
                    />
                  </div>
                  <div className="h-px w-10 bg-[#C5A66A]" />
                </div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#64856B]">
                  Welcome Back
                </p>

                <h1 className="mt-4 font-serif text-5xl tracking-tight text-[#173D2B]">
                  Sign In
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-6 text-[#78847A]">
                  Sign in to continue your YAMA FLYS journey.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-9 space-y-6">

                {/* Email */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#627568]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9A8D] transition-colors group-focus-within:text-[#28583D]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      autoComplete="email"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-[#DFE6DF] bg-[#F9FAF8] py-4 pl-12 pr-4 text-sm text-[#173D2B] outline-none transition-all placeholder:text-[#A3ADA4] hover:border-[#B7CBB9] focus:border-[#64856B] focus:bg-white focus:ring-4 focus:ring-[#28583D]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#627568]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setError(
                          "Password recovery is not available yet. Please contact the store for assistance."
                        )
                      }
                      disabled={loading}
                      className="text-[10px] font-medium text-[#64856B] transition-colors hover:text-[#173D2B] disabled:opacity-50"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      size={17}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9A8D] transition-colors group-focus-within:text-[#28583D]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      minLength={6}
                      disabled={loading}
                      className="w-full rounded-xl border border-[#DFE6DF] bg-[#F9FAF8] py-4 pl-12 pr-12 text-sm text-[#173D2B] outline-none transition-all placeholder:text-[#A3ADA4] hover:border-[#B7CBB9] focus:border-[#64856B] focus:bg-white focus:ring-4 focus:ring-[#28583D]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B9A8D] transition hover:text-[#28583D] disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff size={17} strokeWidth={1.5} />
                      ) : (
                        <Eye size={17} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordLength > 0 && (
                    <div className="mt-3">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              passwordLength >= item * 3
                                ? "bg-[#64856B]"
                                : "bg-[#E4E9E3]"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-2 text-[10px] text-[#849186]">
                        {passwordLength < 6
                          ? "Enter at least 6 characters"
                          : passwordLength < 10
                            ? "Password length looks good"
                            : "Good password length"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Remember Me */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 cursor-pointer accent-[#28583D]"
                  />

                  <span className="text-xs text-[#78847A]">
                    Remember me
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex min-h-[54px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#173D2B] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#28583D] hover:shadow-[0_12px_30px_rgba(23,61,43,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute -left-1/2 top-0 h-full w-20 skew-x-[-20deg] bg-white/10 transition-all duration-700 group-hover:left-[120%]" />

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
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="mt-9 text-center">
                <p className="text-xs text-[#849186]">
                  Don't have a YAMA FLYS account?
                </p>

                <Link
                  to="/register"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#28583D] transition-all hover:gap-3 hover:text-[#64856B]"
                >
                  Create an Account
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 flex justify-center">
                <Link
                  to="/shop"
                  className="group flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#849186] transition-colors hover:text-[#173D2B]"
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Continue Shopping
                </Link>
              </div>

              {/* Security Note */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[#9AA59B]">
                <ShieldCheck size={13} />
                Secure Account Access
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </main>
  );
};

export default Login;
