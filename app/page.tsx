import Link from 'next/link';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { SITE } from '@/lib/site.config';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Expert Bookkeeping &<br />Accounting Services
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Save up to 40% on accounting fees with our qualified AAT-licensed accountants. 
            Professional support for businesses and self-employed individuals across the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition"
            >
              Book Free Consultation <ArrowRight size={20} />
            </Link>
            <a 
              href={SITE.phoneHref}
              className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition"
            >
              Call Us Today
            </a>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Business Services', icon: '📊', description: 'Comprehensive accounting solutions for companies' },
              { title: 'Personal Services', icon: '👤', description: 'Tax support for self-employed and individuals' },
              { title: 'Free Initial Consultation', icon: '💬', description: 'No obligation, comprehensive review of your needs' },
            ].map((service, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose MNA Accounting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              'AAT Licensed Accountancy Practice',
              'Save up to 40% on accounting fees',
              'AML Supervised & Compliant',
              'Professional Indemnity Insured',
              'Companies House Verification Provider',
              'Remote services across the UK',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trusted by Clients</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">4.8 rating on Google • 4.9 rating on Trustpilot</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Small Business Owner',
                review: 'Professional and reliable service. They helped us save significant money on our taxes.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Self-Employed Consultant',
                review: 'Great communication and expert advice. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Emma Williams',
                role: 'Director',
                review: 'Outstanding support throughout the year. Great value for money.',
                rating: 5,
              },
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Save on Your Accounting?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Get your free initial consultation and find out how much you could save.
          </p>
          <Link 
            href="/contact"
            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition text-lg"
          >
            Book Your Free Consultation <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
