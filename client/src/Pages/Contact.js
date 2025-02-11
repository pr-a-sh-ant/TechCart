import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 mb-10 pb-10">
      <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Got questions? We'd love to hear from you! Reach out to us for any
        inquiries, support, or feedback.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
        {/* Contact Info Section */}
        <div className="bg-slate-50 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 space-y-4">
            <span className="block">
              📍 <strong>Address:</strong> 123 Tech Street, Kathmandu, Nepal
            </span>
            <span className="block">
              📞 <strong>Phone:</strong>{" "}
              <a
                href="tel:+9779800000000"
                className="font-medium text-blue-600 hover:underline"
              >
                +977 9800000000
              </a>
            </span>
            <span className="block">
              ✉️ <strong>Email:</strong>{" "}
              <a
                href="mailto:support@techcart.com"
                className="font-medium text-blue-600 hover:underline"
              >
                support@techcart.com
              </a>
            </span>
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="bg-slate-50 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
