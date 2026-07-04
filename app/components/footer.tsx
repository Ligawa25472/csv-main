import Link from 'next/link';
import { SITE, BUSINESS_SERVICES, PERSONAL_SERVICES } from '@/lib/site.config';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">{SITE.name}</h3>
            <p className="text-gray-300 mb-6">{SITE.tagline}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-teal-400" />
                <a href={SITE.phoneHref} className="hover:text-teal-400 transition">
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-teal-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-teal-400 transition">
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-400 flex-shrink-0 mt-1" />
                <div className="text-sm">
                  {SITE.address.street}, {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                </div>
              </div>
            </div>
          </div>

          {/* Business Services */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Business Services</h4>
            <ul className="space-y-3">
              {BUSINESS_SERVICES.slice(0, 5).map((service) => (
                <li key={service.link}>
                  <Link href={service.link} className="text-gray-300 hover:text-teal-400 transition">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Services */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Personal Services</h4>
            <ul className="space-y-3">
              {PERSONAL_SERVICES.map((service) => (
                <li key={service.link}>
                  <Link href={service.link} className="text-gray-300 hover:text-teal-400 transition">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-teal-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-teal-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-teal-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-teal-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-teal-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Credentials Section */}
        <div className="border-t border-slate-700 pt-12 mb-8">
          <h4 className="font-bold mb-6 text-lg">Professional Accreditations & Registrations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold text-teal-400">Company Registration Number</p>
              <p className="text-gray-300 font-mono text-sm mt-2">{SITE.companyNumber}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold text-teal-400">AAT Organisation Number</p>
              <p className="text-gray-300 font-mono text-sm mt-2">{SITE.aatOrgNumber}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold text-teal-400">AAT Licensed Accountancy Practice</p>
              <p className="text-gray-300 text-sm mt-2">Association of Accounting Technicians</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="font-semibold text-teal-400">AML Supervised</p>
              <p className="text-gray-300 text-sm mt-2">Anti-Money Laundering Compliance</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {SITE.social.linkedin && (
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
                LinkedIn
              </a>
            )}
            {SITE.social.instagram && (
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
                Instagram
              </a>
            )}
            {SITE.social.facebook && (
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
