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
      answer: `We charge significantly less than many traditional firms while maintaining a professional and personalised service.`,
    },
    {
      id: 'remote',
      question: 'Do you work remotely?',
      answer: `Yes. We support clients throughout the UK using cloud accounting software and secure document sharing.`,
    },
    {
      id: 'companies-house',
      question: 'Can you help with Companies House filings?',
      answer: `Yes. We can assist with company accounts, confirmation statements and director verification requirements.`,
    },
    {
      id: 'advice-fee',
      question: 'If I need advice or to talk about my business plans can I call you? And is there a fee?',
      answer: `Yes, we do not charge for giving advice or helping business owners thrive, our aim is to create a professional environment where business owners thrive and feel comfortable sharing ideas.`,
    },
    {
      id: 'lower-fees',
      question: 'With your lower fees, I am worried about the quality of service.',
      answer: `Not at all. Our lower fees are the result of operating efficiently and keeping overhead costs low, not cutting corners on service quality. MNA Accounting is an AAT Licensed Accountancy Practice led by an ACCA-qualified accountant, and we provide the same core accounting, tax, payroll, and advisory services you would expect from larger firms. We believe professional accounting services should be affordable and accessible to small and medium businesses. You'll receive personalised support, direct access to your accountant, and a service tailored to your specific needs—without paying inflated fees. We believe that by helping businesses thrive, it will enable MNA to also thrive and grow as a business. Many of our clients are pleasantly surprised by the level of support they receive compared to what they were paying elsewhere.`,
    },
    {
      id: 'deadlines',
      question: 'I can't keep track of my deadline, is this something you can help me with? And will I be charged for this?',
      answer: `Once we onboard a client, we keep track of all deadlines and send reminders ahead of time, we do not charge for this.`,
    },
    {
      id: 'charging',
      question: 'Do you charge your fees on a monthly, quarterly, or yearly basis?',
      answer: `We are flexible in terms of payment to work around our client's needs.`,
    },
    {
      id: 'mtd',
      question: 'What is Making Tax Digital (MTD)?',
      answer: `Making Tax Digital (MTD) is HMRC's initiative to modernise the UK tax system by requiring certain taxpayers to keep digital records and submit information to HMRC using compatible software. From April 2026, many self-employed individuals and landlords with qualifying income will need to comply with MTD for Income Tax. This means keeping digital records and submitting regular updates to HMRC throughout the year, rather than relying solely on an annual Self Assessment tax return. At MNA Accounting, we can help you prepare for Making Tax Digital, choose suitable software, maintain compliant records, and ensure all submissions are made accurately and on time, giving you peace of mind and allowing you to focus on running your business. Need help with Making Tax Digital? Contact us today for expert guidance and a free consultation.`,
    },
  ];

  toggleFaq(faq: FAQItem): void {
    faq.isOpen = !faq.isOpen;
  }
}
