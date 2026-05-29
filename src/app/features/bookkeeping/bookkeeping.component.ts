import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookkeeping',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookkeeping.component.html',
  styleUrl: './bookkeeping.component.css',
})
export class BookkeepingComponent {
  services = [
    {
      icon: '📊',
      title: 'Day-to-Day Transaction Recording',
      description:
        'We track income, expenses, and bank activity to keep your records up to date.',
    },
    {
      icon: '🏦',
      title: 'Bank Reconciliation & Expense Tracking',
      description:
        'We ensure your accounts match your bank statements and help you monitor spending.',
    },
    {
      icon: '📈',
      title: 'Monthly Reports & Cash Flow Summaries',
      description:
        'Get clear insights into your financial health with regular reporting.',
    },
    {
      icon: '💻',
      title: 'Software Integration',
      description:
        'We work with platforms like Xero, QuickBooks, and FreeAgent to streamline your bookkeeping.',
    },
    {
      icon: '📋',
      title: 'Payables Report Preparation',
      description:
        'Stay on top of your cash flow with clear, weekly reports outlining your outstanding supplier payments. We help you prioritise payments, manage due dates, and maintain strong supplier relationships.',
    },
  ];

  softwarePlatforms = [
    { name: 'Xero', icon: '🔷' },
    { name: 'QuickBooks', icon: '📊' },
    { name: 'FreeAgent', icon: '💼' },
    { name: 'Sage', icon: '📈' },
  ];

  benefits = [
    'Trusted by contractors and small to medium businesses',
    'Local expertise with clients across Birmingham, Coventry, Solihull, Warwickshire, Wolverhampton, and the wider West Midlands',
    'Available nationwide as your trusted online accountant',
    'Fixed-fee packages with no hidden costs',
    'Friendly, responsive service from a dedicated team',
  ];
}
