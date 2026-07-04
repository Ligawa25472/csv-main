import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-management-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './management-accounts.component.html',
  styleUrl: './management-accounts.component.css',
})
export class ManagementAccountsComponent {
  services = [
    {
      icon: 'chart',
      title: 'Monthly or Quarterly Management Accounts',
      description:
        'Regular reporting tailored to your business needs, including profit and loss, balance sheets, and cash flow summaries.',
    },
    {
      icon: 'sparkles',
      title: 'Customised Financial Insights',
      description:
        'We highlight key trends, variances, and opportunities to help you stay in control of your finances.',
    },
    {
      icon: 'trending',
      title: 'Budgeting & Forecasting Support',
      description:
        'We help you set realistic budgets and financial forecasts to guide your business strategy.',
    },
    {
      icon: 'search',
      title: 'Performance Reviews & Advisory',
      description:
        'We meet with you to review your numbers and provide practical advice to improve profitability and efficiency.',
    },
  ];

  reportingFrequency = [
    {
      icon: 'clock',
      title: 'Monthly Reports',
      description:
        'Detailed monthly management accounts for businesses requiring frequent financial oversight',
      benefits: [
        'Real-time financial control',
        'Quick decision making',
        'Early problem identification',
      ],
    },
    {
      icon: 'chart',
      title: 'Quarterly Reports',
      description:
        'Comprehensive quarterly reviews perfect for established businesses with stable operations',
      benefits: [
        'Strategic planning focus',
        'Seasonal analysis',
        'Cost-effective reporting',
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
