"use client";
import React from "react";

const ContactMap = () => {
  return (
    <div className="hidden cursor-pointer lg:flex justify-center items-center mt-8 relative bg-slate-900 p-2 rounded-lg">
      {/* Map container */}
      <iframe
        title="Contact Location Map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d58893.139743906206!2d90.36660639999998!3d22.6976978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1727346446205!5m2!1sen!2sbd"
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg z-10"
      ></iframe>

      {/* Overlay for the grayish effect */}
      <div className="absolute inset-0 bg-gray-900 opacity-30 hover:opacity-0 transition-opacity duration-300 rounded-lg z-20"></div>
    </div>
  );
};

export default ContactMap;
