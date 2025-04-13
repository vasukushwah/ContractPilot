import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary py-4 mt-8">
      <div className="container mx-auto text-center text-sm text-gray-500">
        <p>© 2023 ContractCrafter. All rights reserved.</p>
        <ul className="mt-2">
          <li className="inline-block mx-2">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li className="inline-block mx-2">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;