'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How much do accountants charge?',
    answer: 'Our fees are transparent and competitive. We typically charge between £60-150 per hour depending on the complexity of your work, or we offer fixed-price packages for standard services like bookkeeping and tax returns. Many clients save 30-40% compared to high street accountants.',
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes! We offer full remote services across the UK. We can manage all your accounting needs online through secure digital systems. You can discuss your account via video call, phone, or email whenever suits you best.',
  },
  {
    question: 'Can you help with Companies House filings?',
    answer: 'Absolutely. As an authorised Companies House Director Verification Provider, we can help with director verifications, company filings, and all statutory obligations. We ensure your company stays compliant with Companies House requirements.',
  },
  {
    question: 'Can I call for business advice and is there a fee?',
    answer: 'Yes, you can call us anytime for advice. We provide free telephone consultations during business hours. For formal advice or complex matters requiring detailed analysis, we\'ll quote beforehand so you know the cost.',
  },
  {
    question: 'I\'m worried about your lower fees.',
    answer: 'Our lower fees don\'t mean lower quality. We use modern cloud-based accounting software and efficient processes to reduce overhead costs. We\'re AAT-licensed with full professional indemnity insurance, and our clients enjoy the same expert service at better value.',
  },
  {
    question: 'Can you keep track of my deadlines?',
    answer: 'Yes. We maintain a deadline tracking system and proactively notify you of upcoming tax deadlines, filing dates, and important compliance dates. You\'ll never miss a deadline with our support.',
  },
  {
    question: 'How do you charge?',
    answer: 'We offer flexible charging options: hourly rates, fixed-price packages for standard services, or monthly retainers for ongoing support. We discuss your needs first and recommend the best option for your situation.',
  },
  {
    question: 'What is Making Tax Digital (MTD)?',
    answer: 'Making Tax Digital (MTD) is HMRC\'s digital tax initiative requiring digital record-keeping and quarterly submissions using approved software. We help set up compliant systems, integrate with software like Xero or QuickBooks, and manage your quarterly submissions so you stay compliant without stress.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d9488]/20 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0d9488]/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">Find answers to common questions about our services and pricing.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 hover:border-[#0d9488] hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-left font-700 text-lg text-[#0f172a]">{faq.question}</h3>
                  <ChevronDown
                    size={24}
                    className={`text-[#0d9488] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-8 py-5 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-[#f0fdfa] to-gray-50 border border-[#0d9488]/30 rounded-xl p-10 text-center">
            <h3 className="text-2xl font-800 text-[#0f172a] mb-3">Didn't find your answer?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Get in touch with our team for a free consultation and we'll answer any questions you have.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-3 rounded-lg font-700 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
