import React from 'react';


const ShippingPolicy = () => {
  return (
    <div className='p-8 '>
      <h2 className='mb-4 text-2xl font-bold'>Shipping Policy</h2>
      <p className='mb-4'>
        At TechCart, we prioritize timely and secure delivery of your orders.
        Our goal is to ensure that you receive your items as quickly as possible
        while maintaining high standards of service.
      </p>
      <h3 className='mb-2 mt-6 text-xl font-semibold'>Processing Time</h3>
      <p className='mb-4'>
        All orders are processed within 1-3 business days. During peak seasons
        or sales, processing times may increase slightly. We will keep you
        informed about any delays.
      </p>
      <h3 className='mb-2 mt-6 text-xl font-semibold'>
        Shipping Methods & Rates
      </h3>
      <p className='mb-4'>
        We offer several shipping options to meet your needs, including
        standard, express, and international shipping. Rates are calculated at
        checkout based on your location and selected shipping method.
      </p>
      <h3 className='mb-2 mt-6 text-xl font-semibold'>Tracking Your Order</h3>
      <p className='mb-4'>
        Once your order has been shipped, you will receive an email with
        tracking information. You can use this to monitor the status of your
        delivery.
      </p>
      <p className='mb-4'>
        For any questions or concerns regarding shipping, please contact our
        support team.
      </p>
    </div>
  );
};

export default ShippingPolicy;
