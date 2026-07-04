'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100" style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)' }}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-6 py-6 md:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#0f172a] to-[#0d9488] flex items-center justify-center">
              <span className="text-white font-bold text-sm">MNA</span>
            </div>
            <div>
              <div className="text-base font-700 text-[#0f172a] leading-none">MNA</div>
              <div className="text-xs text-[#0d9488] font-600">Accounting</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/business' },
              { label: 'FAQ', href: '/faq' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-500 text-gray-600 hover:text-[#0d9488] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#0d9488] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-lg bg-[#0d9488] text-white font-600 text-sm hover:bg-[#0f766e] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-900" />
            ) : (
              <Menu size={24} className="text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-gray-50 px-6 py-4 space-y-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Business Services', href: '/business' },
              { label: 'Personal Services', href: '/personal' },
              { label: 'FAQ', href: '/faq' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-[#0d9488] transition-colors font-500"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full mt-4 px-4 py-3 rounded-lg bg-[#0d9488] text-white font-600 text-center hover:bg-[#0f766e] transition-colors"
            >
              Free Consultation
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
