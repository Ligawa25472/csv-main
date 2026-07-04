import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-corporation-tax',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './corporation-tax.component.html',
  styleUrl: './corporation-tax.component.css',
})
export class CorporationTaxComponent {
  services = [
    {
      icon: 'fileText',
      title: 'HMRC Registration Support',
      description:
        'We handle all the paperwork to register your business for Corporation Tax with HMRC.',
    },
    {
      icon: 'coins',
      title: 'Accurate Profit Calculations',
      description:
        'After preparing your company accounts, we calculate your Corporation Tax liability using expert knowledge and up-to-date tax rules.',
    },
    {
      icon: 'shield',
      title: 'Tax Reliefs & Allowable Expenses',
      description:
        'We ensure your business claims all eligible tax reliefs and expenses to minimise your tax bill.',
    },
    {
      icon: 'chart',
      title: 'Proactive Tax Advice',
      description:
        "Beyond compliance, we offer strategic tax planning to help you pay only what's necessary — and nothing more.",
    },
    {
      icon: 'clock',
      title: 'Payment Reminders',
      description:
        'We notify you of upcoming Corporation Tax deadlines to help you avoid penalties and stay on track.',
    },
    {
      icon: 'pound',
      title: 'Fixed Fees & Flexible Packages',
      description:
        'Our services are tailored to your business needs, with transparent pricing and no hidden costs.',
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
