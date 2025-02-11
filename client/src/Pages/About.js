import React from "react";

const AboutUs = () => {
  return (
    <>
    <div className="mb-10">
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">About TechCart</h1>
    
      <p className="text-lg text-gray-600 mb-6 ">
        Welcome to <span className="font-semibold text-blue-600">TechCart</span>, your one-stop destination for the latest and greatest electronic products. 
        We are dedicated to providing high-quality gadgets, accessories, and tech solutions at unbeatable prices.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
      <p className="text-gray-600 mb-6">
        At TechCart, we aim to make technology accessible to everyone. Whether you are looking for the latest 
        smartphones, laptops, gaming accessories, or smart home devices, we have got you covered.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>
      <ul className="text-gray-600 space-y-3">
        <li>💡 <span className="font-medium">Wide range</span> of electronic products</li>
        <li>🚀 <span className="font-medium">Fast and reliable</span> shipping</li>
        <li>🔒 <span className="font-medium">Secure payment</span> options</li>
        <li>💬 <span className="font-medium">24/7 customer support</span></li>
        <li>⭐ <span className="font-medium">Trusted by thousands</span> of customers</li>
      </ul>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-3">Contact Us</h2>
      <p className="text-gray-600">
        Have questions? Feel free to reach out to us at 
        <span className="text-blue-500 font-medium"> support@techcart.com</span>.
      </p>
      </div>
    </>
  );
};

export default AboutUs;
