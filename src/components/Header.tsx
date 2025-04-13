// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { Github } from "lucide-react";


const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
       <Link href="/" >
          <img src="/logo.png" alt="ContractPilot Logo" className="h-8 w-auto" />
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
          <Link href="/contract-generator" className="bg-[#009B7D] text-white px-4 py-2 rounded hover:bg-[#00705d]">
            Generate Contract
          </Link>
          <Link href="https://github.com/vasukushwah/ContractPilot" target="_blank" className="bg-[#009B7D] text-white px-4 py-2 rounded hover:bg-[#00705d] flex items-center"><Github className="w-6 h-6" />GitHub</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;