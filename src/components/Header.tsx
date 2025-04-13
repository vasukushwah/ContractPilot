// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-teal-500">
          ContractWingman
        </Link>
        <nav>
          {/* Placeholder for navigation links */}
          {/* <ul className="flex space-x-4">
            <li><Link href="/features" className="hover:text-teal-500">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-teal-500">Pricing</Link></li>
            <li><Link href="/contact" className="hover:text-teal-500">Contact</Link></li>
          </ul> */}
        </nav>
        <Link href="/contract-draft" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Generate Contract
        </Link>
      </div>
    </header>
  );
};

export default Header;