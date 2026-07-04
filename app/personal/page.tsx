import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_SERVICES } from '@/lib/site.config';

export default function PersonalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Personal Services</h1>
          <p className="text-xl text-gray-300">Tax support for self-employed and individuals</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PERSONAL_SERVICES.map((service) => (
              <Link
                key={service.link}
                href={service.link}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-teal-600 transition group"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">Professional tax advice</p>
                <span className="inline-flex items-center gap-2 text-teal-600 font-semibold">
                  Learn More <ArrowRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
