
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Package,
  ShoppingBag,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Pencil,
} from "lucide-react";

import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showDetails, setShowDetails] = useState(false);

  // Redirect users who are not logged in.
  if (!user) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0E8] text-[#28583D]">
            <UserRound size={30} />
          </div>

          <h1 className="text-2xl font-semibold text-[#173D2B]">
            Your Profile
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Please log in to view your account details.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-[#173D2B] px-6 py-3 font-medium text-white transition hover:bg-[#28583D]"
          >
            Login to Continue
          </Link>
        </div>
      </main>
    );
  }

  const displayName =
    user.name || user.fullName || user.username || "YAMA FLYS Customer";

  const displayEmail = user.email || "Email not available";
  const displayPhone = user.phone || user.mobile || "Not added yet";
  const displayAddress = user.address || "No address added yet";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] pb-16">
      {/* Profile hero */}
      <section className="relative overflow-hidden bg-[#173D2B] px-5 pb-24 pt-12 text-white">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-5 -top-10 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C18E]">
            YAMA FLYS
          </p>

          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            My Account
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
            Welcome back! Manage your account and discover something beautiful.
          </p>
        </div>
      </section>

      {/* Main profile card */}
      <section className="relative mx-auto -mt-14 max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-[#F5F0E4] bg-[#28583D] text-2xl font-semibold text-white">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                initials || <UserRound size={30} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="break-words text-2xl font-semibold text-[#173D2B]">
                  {displayName}
                </h2>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F0E8] px-3 py-1 text-xs font-medium text-[#28583D]">
                  <ShieldCheck size={14} />
                  Customer
                </span>
              </div>

              <p className="mt-2 break-all text-sm text-gray-500">
                {displayEmail}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Welcome to your YAMA FLYS account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails((current) => !current)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#28583D]/20 px-4 py-3 text-sm font-medium text-[#173D2B] transition hover:bg-[#F0F4EF]"
            >
              <Pencil size={16} />
              {showDetails ? "Hide Details" : "View Details"}
            </button>
          </div>

          {showDetails && (
            <div className="border-t border-gray-100 bg-[#FAFBF9] px-6 py-6 sm:px-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={displayEmail}
                />
                <InfoItem
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  value={displayPhone}
                />
                <InfoItem
                  icon={<MapPin size={18} />}
                  label="Delivery Address"
                  value={displayAddress}
                />
                <InfoItem
                  icon={<UserRound size={18} />}
                  label="Account Name"
                  value={displayName}
                />
              </div>
            </div>
          )}
        </div>

        {/* Account actions */}
        <div className="mt-7">
          <h3 className="mb-4 text-lg font-semibold text-[#173D2B]">
            My Account
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              icon={<Package size={22} />}
              title="My Orders"
              description="View your purchases and order status."
              onClick={() => navigate("/my-orders")}
            />

            <ActionCard
              icon={<ShoppingBag size={22} />}
              title="Continue Shopping"
              description="Explore bangles and find your favourites."
              onClick={() => navigate("/shop")}
            />
          </div>
        </div>

        {/* Logout */}
        <div className="mt-7 rounded-2xl border border-red-100 bg-white p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Sign out</h3>
            <p className="mt-1 text-sm text-gray-500">
              Sign out of your YAMA FLYS account on this device.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:mt-0"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </section>
    </main>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex min-w-0 items-start gap-3">
    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#28583D]">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left transition hover:border-[#28583D]/30 hover:shadow-sm"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F0E8] text-[#28583D] transition group-hover:bg-[#173D2B] group-hover:text-white">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <h4 className="font-semibold text-[#173D2B]">{title}</h4>
      <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
    </div>

    <ChevronRight
      size={20}
      className="shrink-0 text-gray-400 transition group-hover:translate-x-1"
    />
  </button>
);

export default Profile;
