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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">Find answers to common questions about our services and pricing.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="text-left font-semibold text-lg text-gray-900">{faq.question}</h3>
                  <ChevronDown
                    size={24}
                    className={`text-teal-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-teal-50 border border-teal-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Didn't find your answer?</h3>
            <p className="text-gray-700 mb-6">
              Get in touch with our team for a free consultation and we'll answer any questions you have.
            </p>
            <a
              href="/contact"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
