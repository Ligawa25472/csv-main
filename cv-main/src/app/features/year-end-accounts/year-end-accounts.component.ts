import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-year-end-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './year-end-accounts.component.html',
  styleUrl: './year-end-accounts.component.css',
})
export class YearEndAccountsComponent {
  services = [
    {
      icon: '📊',
      title: 'Annual Financial Statement Preparation',
      description:
        'We will compile your profit and loss, balance sheet, and supporting notes in line with UK accounting standards.',
    },
    {
      icon: '📋',
      title: 'HMRC & Companies House Submissions',
      description:
        'We will file your accounts and corporation tax return on time, avoiding penalties and ensuring full compliance.',
    },
    {
      icon: '🏢',
      title: 'Tailored Support for Limited Companies & Sole Traders',
      description:
        "Whether you're incorporated or self-employed, we adapt our approach to suit your structure.",
    },
    {
      icon: '💡',
      title: 'Clear Explanations & Guidance',
      description:
        'We will walk you through your accounts so you understand your numbers and what they mean for your business.',
    },
  ];

  accountTypes = [
    {
      icon: '🏢',
      title: 'Limited Companies',
      description: 'Full statutory accounts preparation and filing',
      requirements: [
        'Profit & Loss Statement',
        'Balance Sheet',
        "Directors' Report",
        'Corporation Tax Return',
      ],
    },
    {
      icon: '👤',
      title: 'Sole Traders',
      description: 'Self-employment accounts for tax purposes',
      requirements: [
        'Income & Expenditure',
        'Tax Calculations',
        'Self Assessment',
        'Business Records',
      ],
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
