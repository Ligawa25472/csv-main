import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-business-services',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './business-services.component.html',
  styleUrl: './business-services.component.css',
})
export class BusinessServicesComponent {
  services = [
    {
      icon: 'briefcase',
      title: 'Corporation Tax',
      description:
        'Proactive and personalised Corporation Tax services designed to keep your business compliant and reduce your tax liability.',
      features: [
        'HMRC Registration Support',
        'Accurate Profit Calculations',
        'Tax Reliefs & Allowable Expenses',
        'Proactive Tax Advice',
      ],
      link: '/business/corporation-tax',
    },
    {
      icon: 'receipt',
      title: 'VAT Returns',
      description:
        'Accurate, timely VAT support for businesses. We simplify the process and ensure compliance while helping you manage cash flow.',
      features: [
        'VAT Registration & Scheme Selection',
        'Preparation & Submission',
        'VAT Reclaims & Deductions',
        'Ongoing Support',
      ],
      link: '/business/vat-returns',
    },
    {
      icon: 'calculator',
      title: 'Payroll & CIS',
      description:
        'Complete payroll solution ensuring your team is paid accurately, your business stays compliant, and operations run smoothly.',
      features: [
        'Payroll Processing',
        'Real Time Information (RTI)',
        'CIS Deductions & Reporting',
        'Payslips & P60s',
      ],
      link: '/business/payroll-cis',
    },
    {
      icon: 'book',
      title: 'Bookkeeping',
      description:
        'Reliable bookkeeping services to keep your business organised, compliant, and ready for growth.',
      features: [
        'Transaction Recording',
        'Bank Reconciliation',
        'Monthly Reports',
        'Software Integration',
      ],
      link: '/business/bookkeeping',
    },
    {
      icon: 'chart',
      title: 'Year End Accounts',
      description:
        'Accurate year-end accounts prepared with precision and clarity to keep you compliant and informed.',
      features: [
        'Annual Financial Statements',
        'HMRC & Companies House Submissions',
        'Tailored Support',
        'Clear Explanations',
      ],
      link: '/business/year-end-accounts',
    },
    {
      icon: 'trending',
      title: 'Management Accounts',
      description:
        'Insightful management accounts for smarter business decisions with timely, tailored reports.',
      features: [
        'Monthly/Quarterly Reports',
        'Financial Insights',
        'Budgeting & Forecasting',
        'Performance Reviews',
      ],
      link: '/business/management-accounts',
    },
    {
      icon: 'target',
      title: 'Tax Planning',
      description:
        'Strategic tax planning to build a stronger, more sustainable business with proactive, personalised strategies.',
      features: [
        'Tax Efficiency Reviews',
        'Allowable Expenses & Reliefs',
        'Dividend & Salary Planning',
        'Year-Round Advisory',
      ],
      link: '/business/tax-planning',
    },
  ];

  benefits = [
    'Trusted by contractors and small to medium businesses',
    'Local expertise with clients across Birmingham, Coventry, Solihull, Warwickshire, Wolverhampton, and the wider West Midlands',
    'Available nationwide as your trusted online accountant',
    'Fixed-fee packages with no hidden costs',
    'Friendly, responsive service from a dedicated team',
  ];
}
