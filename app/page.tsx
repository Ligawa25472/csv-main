import Link from 'next/link';
import { ArrowRight, CheckCircle, Star, TrendingUp, Shield, Zap } from 'lucide-react';
import { SITE } from '@/lib/site.config';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d9488]/20 text-white py-24 md:py-40">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0d9488]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#0d9488]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-[#0d9488]/20 rounded-full border border-[#0d9488]/40">
              <span className="text-sm font-600 text-[#14b8a6]">Professional Accounting Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-800 leading-tight mb-6">
              Expert Accounting, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#06d6d6]">
                Affordable Pricing
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Save up to 40% on accounting fees with our AAT-licensed accountants. Professional support for businesses and self-employed individuals across the UK.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#0d9488] hover:bg-[#0f766e] text-white font-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Free Consultation <ArrowRight size={20} />
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-700 border border-white/20 transition-all duration-300"
              >
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'AAT Licensed', icon: '✓' },
              { label: 'AML Supervised', icon: '✓' },
              { label: 'Professional Indemnity', icon: '✓' },
              { label: 'Companies House Verified', icon: '✓' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 text-sm md:text-base">
                <div className="w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {badge.icon}
                </div>
                <span className="text-gray-700 font-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview - Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-800 mb-6 text-[#0f172a]">
              Comprehensive Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From bookkeeping to tax planning, we provide the full range of professional accounting services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Business Services',
                description: 'Bookkeeping, VAT, payroll, tax planning and corporate accounting',
                link: '/business',
              },
              {
                icon: Shield,
                title: 'Personal Services',
                description: 'Self-assessment, capital gains tax, CIS refunds and tax planning',
                link: '/personal',
              },
              {
                icon: Zap,
                title: 'Quick Setup',
                description: 'Get started today with our free initial consultation, no obligation',
                link: '/contact',
              },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={i}
                  href={service.link}
                  className="group p-8 rounded-xl border border-gray-200 hover:border-[#0d9488] bg-white hover:bg-[#f0fdfa] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#0d9488]/10 flex items-center justify-center mb-6 group-hover:bg-[#0d9488]/20 transition-colors">
                    <Icon className="text-[#0d9488]" size={24} />
                  </div>
                  <h3 className="text-xl font-700 text-[#0f172a] mb-3 group-hover:text-[#0d9488] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#0d9488] font-600 text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={18} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-800 mb-16 text-[#0f172a] text-center">
            Why Choose MNA Accounting
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              'Save up to 40% on accounting fees',
              'AAT Licensed Accountancy Practice',
              'AML Supervised & Compliant',
              'Professional Indemnity Insured',
              'Companies House Verification Provider',
              'Remote services across the UK',
              'Proactive deadline management',
              'Dedicated personalized support',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#0d9488] flex-shrink-0 flex items-center justify-center mt-1">
                  <CheckCircle size={18} className="text-white" />
                </div>
                <p className="text-lg text-gray-700 font-600">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-800 mb-4 text-[#0f172a]">
              Trusted by Businesses
            </h2>
            <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
              <div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="font-700 text-gray-900">4.8 on Google</div>
                <div className="text-gray-600 text-xs">48 reviews</div>
              </div>
              <div className="w-px h-16 bg-gray-300 hidden sm:block" />
              <div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="font-700 text-gray-900">4.9 on Trustpilot</div>
                <div className="text-gray-600 text-xs">52 reviews</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Business Owner',
                review: 'Professional service with great attention to detail. Saved us thousands on taxes!',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Consultant',
                review: 'Excellent communication and expert advice. Highly recommended for any business!',
                rating: 5,
              },
              {
                name: 'Emma Williams',
                role: 'Director',
                review: 'Outstanding support and superb value. Best decision for our accounts!',
                rating: 5,
              },
            ].map((review, i) => (
              <div key={i} className="p-8 rounded-xl border border-gray-200 hover:border-[#0d9488] bg-gray-50 hover:bg-white transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array(review.rating).fill(null).map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{review.review}"</p>
                <div>
                  <p className="font-700 text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-800 mb-6">
            Ready to Save on Your Accounting?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Schedule your free consultation today and discover how much you could save with professional, affordable accounting.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-[#0d9488] font-700 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Your Consultation <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
