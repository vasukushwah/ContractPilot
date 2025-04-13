import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#009B7D] py-4 mt-8 text-white">
      <div className="container mx-auto text-center text-sm ">
        <p>© 2025 ContractPilot. All rights reserved. </p>
        <ul className="mt-2">
          <li className="inline-block mx-2">
            <a href="/terms-of-service" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li className="inline-block mx-2">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;