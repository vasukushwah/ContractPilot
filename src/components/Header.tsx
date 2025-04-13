// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { Github } from "lucide-react";


const Header: React.FC = () => {
  return (
    <header className="bg-[#1C1C1C] py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-teal-500">
          ContractPilot
        </Link>
        <nav>
          {/* Placeholder for navigation links */}
          {/* <ul className="flex space-x-4">
            <li><Link href="/features" className="hover:text-teal-500">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-teal-500">Pricing</Link></li>
            <li><Link href="/contact" className="hover:text-teal-500">Contact</Link></li>
          </ul> */}
        </nav>
        <div className='flex items-center gap-2'>
          <Link href="/contract-draft" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
            Generate Contract
          </Link>
          <Link href="https://github.com/vasukushwah/ContractPilot" target="_blank" className="hover:text-teal-500"><Github className="w-6 h-6" /><span>GitHub</span></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;