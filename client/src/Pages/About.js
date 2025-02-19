import React from "react";
import {
  Mail,
  Truck,
  CreditCard,
  PhoneCall,
  Package,
  Award,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              About <span className="text-blue-600">TechCart</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Welcome to{" "}
              <span className="font-semibold text-blue-600">TechCart</span>,
              your one-stop destination for the latest and greatest electronic
              products. We are dedicated to providing high-quality gadgets,
              accessories, and tech solutions at unbeatable prices.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At TechCart, we aim to make technology accessible to everyone.
              Whether you are looking for the latest smartphones, laptops,
              gaming accessories, or smart home devices, we have got you
              covered.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Package className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wide Product Range
              </h3>
              <p className="text-gray-600">
                Extensive selection of electronic products to meet all your tech
                needs
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <Truck className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <CreditCard className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Multiple safe payment options for your convenience
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <PhoneCall className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer service to assist you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl bg-blue-600 p-8 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">Have questions? We're here to help!</p>
            <div className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-full">
              <Mail className="h-5 w-5" />
              <span className="font-medium">support@techcart.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="py-8 text-center">
        <div className="inline-flex items-center space-x-2 text-gray-600">
          <Award className="h-5 w-5" />
          <span>Trusted by thousands of customers worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
