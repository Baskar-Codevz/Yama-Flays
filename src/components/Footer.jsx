import React from "react";

const Footer = () => {
  const instagramUrl =
    "https://www.instagram.com/sharlin_desings?stkn=YnlkbmVwcGJ6NW5r";

  const youtubeUrl = "https://m.youtube.com/@sharlin-Designs08";

  const phoneNumber = "7548863591";

  const whatsappUrl = `https://wa.me/91${phoneNumber}`;

  return (
    <footer className="bg-[#211b] text-[#faf8f4]">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-3xl tracking-wide">YAMA FLAYS</h2>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#cfc4ba]">
              Discover beautiful bangle designs created to add an elegant
              finishing touch to your style.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6f5b4b] text-[#c9a77d] transition-all duration-300 hover:border-[#c9a77d] hover:bg-[#c9a77d] hover:text-[#211b17]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6f5b4b] text-[#c9a77d] transition-all duration-300 hover:border-[#c9a77d] hover:bg-[#c9a77d] hover:text-[#211b17]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8Z" />
                  <path d="m9.75 15.5 6-3.5-6-3.5v7Z" fill="#211b17" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6f5b4b] text-[#c9a77d] transition-all duration-300 hover:border-[#c9a77d] hover:bg-[#c9a77d] hover:text-[#211b17]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L4 20l1.2-4.2A8.5 8.5 0 1 1 21 11.5Z" />
                  <path d="M8.5 8.5c.3-.5.7-.5 1-.1l.9 1c.3.3.3.6.1.9l-.4.5c.8 1.4 1.9 2.4 3.3 3.1l.5-.4c.3-.2.6-.2.9.1l1 .9c.4.3.4.7-.1 1-.5.4-1.1.6-1.7.4-3.3-.9-5.8-3.4-6.7-6.7-.2-.6 0-1.2.4-1.7Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[#c9a77d]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#home"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#collection"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  Collection
                </a>
              </li>

              <li>
                <a
                  href="#reviews"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[#c9a77d]">
              Shop
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#collection"
                  className="group inline-flex items-center gap-2 text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  All Bangles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#collection"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  Best Sellers
                </a>
              </li>

              <li>
                <a
                  href="#collection"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="#reviews"
                  className="text-sm text-[#cfc4ba] transition-colors duration-300 hover:text-[#c9a77d]"
                >
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[#c9a77d]">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-sm leading-6 text-[#cfc4ba]">
              {/* Phone */}
              <a
                href={`tel:+91${phoneNumber}`}
                className="block transition-colors duration-300 hover:text-[#c9a77d]"
              >
                +91 {phoneNumber}
              </a>

              {/* Email */}
              <a
                href="mailto:janumy686@gmail.com"
                className="block transition-colors duration-300 hover:text-[#c9a77d]"
              >
                janumy686@gmail.com
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-[#c9a77d]"
              >
                WhatsApp
              </a>

              {/* Address */}
              <p>
                No. 4/1301, Madha Kovil Street,
                <br />
                Near Vinnarasi Madha Church,
                <br />
                Thirunavallur, Maranodai,
                <br />
                Kallakurichi, Tamil Nadu - 607204
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-[#4a3c32]" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-xs text-[#9f9186]">
            © {new Date().getFullYear()} YAMA FLAYS. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-[#9f9186] transition-colors duration-300 hover:text-[#c9a77d]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-[#9f9186] transition-colors duration-300 hover:text-[#c9a77d]"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
