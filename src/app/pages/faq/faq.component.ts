import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  faqs: FAQItem[] = [
    {
      id: 'fees',
      question: 'How much do accountants charge?',
      answer: `Our fees are transparent and competitively priced. We offer flexible pricing models including fixed fees for standard services and hourly rates for bespoke work. Most small businesses save 40% compared to traditional high-street accountants. We'll provide a clear quote after understanding your specific needs during a free initial consultation.`,
    },
    {
      id: 'remote',
      question: 'Do you work remotely?',
      answer: `Yes, we work entirely remotely. We serve clients across the UK from our base in Birmingham, including Coventry, Warwickshire, and beyond. Working remotely means lower overheads that we pass on as savings to you. You can communicate with us via phone, email, video call, or in-person meetings at our Birmingham office if preferred.`,
    },
    {
      id: 'companies-house',
      question: 'Can you help with Companies House filings?',
      answer: `Absolutely. As an authorised Companies House Director Verification Provider, we handle all aspects of Companies House compliance including annual accounts filings, director verification, confirmation statements, and statutory compliance. We stay updated with the latest Companies House requirements and ensure your filings are accurate and timely.`,
    },
    {
      id: 'advice-fee',
      question: 'Can I call for business advice and is there a fee?',
      answer: `Yes, you can absolutely call us for business advice. We offer free initial consultations where we discuss your accounting and tax needs with no obligation. For ongoing advice, fees depend on the complexity and scope. Many clients find our advice saves them far more than they pay in fees through tax planning and business optimization.`,
    },
    {
      id: 'lower-fees',
      question: 'I\'m worried about your lower fees.',
      answer: `Our lower fees don't mean lower quality. We achieve efficiency through modern cloud-based accounting systems and streamlined processes. We're AAT licensed, AML supervised, and professionally insured just like traditional high-street practices. Our clients receive the same professional expertise and compliance standards, but without the inflated overhead costs.`,
    },
    {
      id: 'deadlines',
      question: 'Can you keep track of my deadlines?',
      answer: `Yes, we proactively manage all your accounting and tax deadlines. We maintain a comprehensive timeline including tax returns, Companies House filings, VAT submissions, and payroll deadlines. You'll receive reminders well in advance, and we handle submission deadlines to ensure you never miss critical dates. This is a key benefit of our ongoing accounting support.`,
    },
    {
      id: 'charging',
      question: 'How do you charge?',
      answer: `We offer flexible charging options: Fixed fees for standard services (bookkeeping, tax returns, companies house filings), hourly rates for bespoke or consulting work, and retainer packages for ongoing support. We provide transparent quotes upfront with no hidden costs. Payment is typically monthly or quarterly depending on your preference.`,
    },
    {
      id: 'mtd',
      question: 'What is Making Tax Digital (MTD)?',
      answer: `Making Tax Digital (MTD) is HMRC's requirement for businesses to keep digital records and submit tax returns using compatible software. Most businesses with a turnover over £85,000 must comply. We help you navigate MTD compliance by setting up cloud-based accounting systems, integrating approved software like Xero or QuickBooks, and managing your quarterly submissions. Our MTD services ensure you stay compliant without the hassle.`,
    },
  ];

  toggleFaq(faq: FAQItem): void {
    faq.isOpen = !faq.isOpen;
  }
}
