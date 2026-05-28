import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-business-tax-planning',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './business-tax-planning.component.html',
  styleUrl: './business-tax-planning.component.css',
})
export class BusinessTaxPlanningComponent {
  services = [
    {
      icon: '🔍',
      title: 'Tax Efficiency Reviews',
      description:
        'We assess your current tax setup and identify opportunities to reduce liabilities and improve cash flow.',
    },
    {
      icon: '📋',
      title: 'Advice on Allowable Expenses & Reliefs',
      description:
        "We ensure you're claiming all eligible deductions, reliefs, and allowances to minimise your tax burden.",
    },
    {
      icon: '💰',
      title: 'Planning for Dividends & Director Salaries',
      description:
        'We help you structure income in the most tax-efficient way, balancing salary, dividends, and benefits.',
    },
    {
      icon: '🚀',
      title: 'Support for Business Restructuring & Growth',
      description:
        "Whether you're expanding, merging, or changing your business model, we provide tax guidance to support your plans.",
    },
    {
      icon: '📅',
      title: 'Year-Round Advisory',
      description:
        "Tax planning isn't just for year-end — we offer ongoing advice to keep your strategy aligned with your goals.",
    },
  ];

  planningAreas = [
    {
      icon: '🏢',
      title: 'Corporation Tax',
      description:
        'Minimize corporation tax liability through strategic planning and allowable deductions',
    },
    {
      icon: '🧾',
      title: 'VAT Planning',
      description:
        'Optimize VAT position and cash flow through scheme selection and timing strategies',
    },
    {
      icon: '💼',
      title: 'Employment Taxes',
      description:
        'Structure remuneration packages efficiently to minimize PAYE and NI contributions',
    },
    {
      icon: '📈',
      title: 'Capital Allowances',
      description:
        'Maximize capital allowances and reliefs on business assets and equipment',
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
