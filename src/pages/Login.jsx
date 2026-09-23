
import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo only
    console.log("Login Data:", formData);

    alert("Login functionality will be connected to the backend soon.");

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden border border-[#E5DCD3] bg-white shadow-[0_25px_70px_rgba(44,33,27,0.10)] lg:grid-cols-2">
          
          {/* Left Side */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-[#2C211B] lg:block">
            <img
              src="/assets/img-1.webp"
              alt="YAMA FLYS Bangles"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[2000ms] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B] via-[#2C211B]/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-12 text-white">
              <p className="mb-4 text-xs tracking-[0.35em] text-[#D8B89B]">
                WELCOME TO YAMA FLYS
              </p>

              <h2 className="max-w-md font-serif text-4xl leading-tight md:text-5xl">
                Elegance That
                <span className="block italic text-[#D8B89B]">
                  Belongs to You
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                Sign in to continue exploring our collection of beautiful
                bangles and manage your shopping experience.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex min-h-[650px] items-center justify-center px-7 py-12 sm:px-12 lg:px-14">
            <div className="w-full max-w-md">
              
              {/* Header */}
              <div className="mb-10">
                <Link
                  to="/"
                  className="font-serif text-2xl text-[#2C211B]"
                >
                  YAMA <span className="italic text-[#8B5E3C]">FLYS</span>
                </Link>

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-[#8B5E3C]">
                  Welcome Back
                </p>

                <h1 className="mt-3 font-serif text-4xl text-[#2C211B]">
                  Sign In
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#756A61]">
                  Enter your details to access your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#5F5147]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A887A]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full border border-[#DED4CB] bg-[#FDFBF7] py-3.5 pl-12 pr-4 text-sm text-[#2C211B] outline-none transition-all duration-300 placeholder:text-[#AA9D93] focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#5F5147]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A887A]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full border border-[#DED4CB] bg-[#FDFBF7] py-3.5 pl-12 pr-12 text-sm text-[#2C211B] outline-none transition-all duration-300 placeholder:text-[#AA9D93] focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] transition-colors hover:text-[#2C211B]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} strokeWidth={1.5} />
                      ) : (
                        <Eye size={18} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-[#756A61]">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#8B5E3C]"
                    />

                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm text-[#8B5E3C] transition-colors hover:text-[#2C211B]"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 bg-[#2C211B] py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#8B5E3C] hover:shadow-lg"
                >
                  Sign In

                  <ArrowRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 border-t border-[#E8E0D9] pt-7 text-center">
                <p className="text-sm text-[#756A61]">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-block text-sm font-medium text-[#8B5E3C] transition-colors hover:text-[#2C211B]"
                >
                  Create an Account
                </Link>
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 text-center">
                <Link
                  to="/shop"
                  className="text-xs uppercase tracking-[0.15em] text-[#9A887A] transition-colors hover:text-[#8B5E3C]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

