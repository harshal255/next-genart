import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <div className="w-20 sm:w-20 lg:w-32 logo text-2xl text-nowrap">
        Next <span className="text-purple-700">Gen</span>Art
      </div>
      <p className="flex-1 border-gray-400 text-sm text-gray-500 max-sm:hidden">
        | Copyright @Harshal Kahar | All right reserved
      </p>
      <div className="flex gap-4">
        <a
          href="https://github.com/harshal255"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="text-xl text-gray-700 hover:text-black transition-transform duration-200"
        >
          <FaGithub />
        </a>

        <a
          href="https://twitter.com/harshalkahar389"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter profile"
          className="text-xl text-gray-700 hover:text-black transition-transform duration-200"
        >
          <FaTwitter />
        </a>

        <a
          href="https://www.linkedin.com/in/harshal-kahar-4115a321b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="text-xl text-gray-700 hover:text-black transition-transform duration-200"
        >
          <FaLinkedin />
        </a>

      </div>
    </div>
  );
};

export default Footer;