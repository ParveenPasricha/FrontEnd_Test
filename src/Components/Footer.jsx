import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer className="relative bg-[#023a72] text-white pt-16 pb-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-[200%] h-24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.44C192.14,70.65,96.29,102.47,0,120H1200V0C1071.84,13.91,950.6,44.91,829.44,55.23,708.64,65.53,587,54.24,466.41,48.37,409.83,45.52,365.06,50.39,321.39,56.44Z"
              fill="#fff"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo & Contact Button */}
          {/* <div className="mb-8 md:mb-0 text-center md:text-left">
            <img
              src="/images/newlogo.png"
              alt=""
              className="h-20 mx-auto md:mx-0 mb-4 p-2"
            />
          </div> */}

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm mb-8 md:mb-0">
            <div>
              <h3 className="font-semibold mb-2">abc</h3>
              <ul className="space-y-1">
                <li>Unit-I:-Chandigarh</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li className="cursor-pointer" onClick={() => navigate('/')}>Home</li>
                <li className="cursor-pointer" onClick={() => navigate('/products')}>Our Products</li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <p className="mb-2">Mobile: +91-9123456780,</p>
            <p className="mb-2">Customer Care No: +91-9123456780</p>
            <div className="flex justify-center md:justify-end space-x-4">
              <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
              <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
              <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
              <FaEnvelope className="hover:text-yellow-400 cursor-pointer" />
              <FaLinkedinIn className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;