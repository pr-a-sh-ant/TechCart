import { Mail, Phone, MapPin } from "lucide-react";

import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 px-4 py-10 sm:px-6 lg:px-10 bg-white mt-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand and Description */}
          <div className="flex flex-col h-full">
            <h2 className="mb-4 text-2xl font-bold">TechCart</h2>
            <p className="text-gray-600 flex-grow">
              TechCart is your go-to destination for the latest electronics.
            </p>
            <div className="flex space-x-4 mt-auto">
              <a
                href="www.x.com"
                target="_blank"
                className="text-gray-500 hover:text-gray-800"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="www.facebook.com"
                target="_blank"
                className="text-gray-500 hover:text-gray-800"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="www.google.com"
                target="_blank"
                className="text-gray-500 hover:text-gray-800"
              >
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>

          {/* Information Links */}
          <div className="flex flex-col h-full">
            <h3 className="mb-4 text-lg font-semibold">INFORMATION</h3>
            <ul className="space-y-2 text-gray-600 flex-grow">
              {" "}
              {/* Added padding left to align */}
              <li>
                <a href="/about-us" className="hover:text-gray-800">
                  About us
                </a>
              </li>
              <li>
                <a href="/business-with-us" className="hover:text-gray-800">
                  Business with us
                </a>
              </li>
              <li>
                <a href="/delivery" className="hover:text-gray-800">
                  Delivery Information
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col h-full">
            <h3 className="mb-4 text-lg font-semibold">USEFUL LINKS</h3>
            <ul className="space-y-2 text-gray-600 flex-grow">
              <li>
                <a href="/policy" className="hover:text-gray-800">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-gray-800">
                  Returns
                </a>
              </li>
              <li>
                <a href="/tac" className="hover:text-gray-800">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-gray-800">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col h-full">
            <h3 className="mb-4 text-lg font-semibold">CONTACT</h3>
            <ul className="space-y-2 text-gray-600 flex-grow">
              <li className="flex items-center">
                <MapPin className="mr-3 w-5 h-5 text-gray-700" />
                <span>123 Tech Street, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 w-5 h-5 text-gray-700" />
                <span>info@techcart.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 w-5 h-5 text-gray-700" />
                <span>+977 9800000000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex items-center justify-center border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">&copy; 2025 TechCart</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
