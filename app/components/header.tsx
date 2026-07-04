'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/lib/site.config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-slate-900">
            {SITE.name.split(' ')[0]}
            <span className="text-teal-600">{SITE.name.split(' ').slice(1).join(' ')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition">
              About
            </Link>
            <Link href="/business" className="text-gray-700 hover:text-teal-600 transition">
              Business Services
            </Link>
            <Link href="/personal" className="text-gray-700 hover:text-teal-600 transition">
              Personal Services
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-teal-600 transition">
              FAQ
            </Link>
            <Link href="/contact" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4 border-t pt-4">
            <Link href="/" className="block text-gray-700 hover:text-teal-600">
              Home
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-teal-600">
              About
            </Link>
            <Link href="/business" className="block text-gray-700 hover:text-teal-600">
              Business Services
            </Link>
            <Link href="/personal" className="block text-gray-700 hover:text-teal-600">
              Personal Services
            </Link>
            <Link href="/faq" className="block text-gray-700 hover:text-teal-600">
              FAQ
            </Link>
            <Link href="/contact" className="block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 text-center">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
