
import React, { useState } from "react";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello YAMA FLYS,

Name: ${formData.name}
Phone: ${formData.phone}

Message:
${formData.message}`;

    const whatsappUrl = `https://wa.me/917548863591?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#211b17]">
      {/* Hero */}
      <section className="bg-[#f3eee7] px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#8c7b6d]">
            Get In Touch
          </p>

          <h1 className="font-serif text-5xl leading-tight md:text-6xl">
            Contact
            <span className="block italic text-[#8c6f5a]">YAMA FLAYS</span>
          </h1>

          <div className="mx-auto mt-7 h-px w-16 bg-[#211b17]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#756a61] md:text-base">
            Have a question about our bangles, orders, or collections?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Contact Information */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c7b6d]">
              Contact Information
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              We'd Love to
              <span className="block italic text-[#8c6f5a]">
                Hear From You
              </span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#211b17]" />

            <p className="mt-7 text-sm leading-7 text-[#756a61]">
              Reach out to YAMA FLAYS for product enquiries, order assistance,
              collection details, or any other questions.
            </p>

            <div className="mt-10 space-y-7">
              {/* Phone */}
              <a
                href="tel:+917548863591"
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#ddd2c7] bg-white transition-all duration-300 group-hover:bg-[#211b17] group-hover:text-white">
                  <Phone size={17} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a8b7e]">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-[#211b17]">
                    +91 75488 63591
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:janumy686@gmail.com"
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#ddd2c7] bg-white transition-all duration-300 group-hover:bg-[#211b17] group-hover:text-white">
                  <Mail size={17} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a8b7e]">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-[#211b17]">
                    janumy686@gmail.com
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#ddd2c7] bg-white">
                  <MapPin size={17} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a8b7e]">
                    Address
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#211b17]">
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

            {/* Social Links */}
            <div className="mt-10 flex gap-3">


              <a
                href="https://wa.me/917548863591"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center border border-[#ddd2c7] bg-white transition-all duration-300 hover:bg-[#211b17] hover:text-white"
              >
                <MessageCircle size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-[#e2d9d0] bg-white p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8c7b6d]">
                Send a Message
              </p>

              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                How Can We Help?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#756a61]"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full border-b border-[#d9cec3] bg-transparent px-1 py-3 text-sm outline-none transition-colors placeholder:text-[#aaa099] focus:border-[#211b17]"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#756a61]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full border-b border-[#d9cec3] bg-transparent px-1 py-3 text-sm outline-none transition-colors placeholder:text-[#aaa099] focus:border-[#211b17]"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#756a61]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full resize-none border-b border-[#d9cec3] bg-transparent px-1 py-3 text-sm outline-none transition-colors placeholder:text-[#aaa099] focus:border-[#211b17]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 bg-[#211b17] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#3a2d25]"
              >
                Send via WhatsApp
                <Send
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-[#211b17] px-6 py-20 text-center text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <MessageCircle
            size={26}
            strokeWidth={1.3}
            className="mx-auto text-[#d8c8b8]"
          />

          <p className="mt-5 text-xs uppercase tracking-[0.3em] text-[#c8b9aa]">
            Need Quick Assistance?
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Chat With YAMA FLAYS
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#c8beb5]">
            For quick questions about products, orders, or availability,
            connect with us directly on WhatsApp.
          </p>

          <a
            href="https://wa.me/917548863591"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#211b17] transition-all duration-300 hover:bg-[#e8ded4]"
          >
            WhatsApp Us
            <MessageCircle size={16} strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default Contact;

