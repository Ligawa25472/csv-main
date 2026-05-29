import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vat-returns',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './vat-returns.component.html',
  styleUrl: './vat-returns.component.css',
})
export class VatReturnsComponent {
  services = [
    {
      icon: 'fileText',
      title: 'VAT Registration & Scheme Selection',
      description:
        "We help you register for VAT and choose the most suitable scheme — whether it's Standard, Flat Rate, or Annual Accounting — based on your business type and turnover.",
    },
    {
      icon: 'chart',
      title: 'Preparation & Submission of VAT Returns',
      description:
        'We prepare and file your VAT returns accurately and on time, ensuring you meet all HMRC deadlines and avoid penalties.',
    },
    {
      icon: 'pound',
      title: 'Advice on VAT Reclaims & Deductions',
      description:
        "We identify opportunities to reclaim VAT on eligible expenses and ensure you're not overpaying.",
    },
    {
      icon: 'bell',
      title: 'Ongoing Support & Deadline Reminders',
      description:
        'We keep you informed of upcoming VAT deadlines and provide ongoing support to answer any VAT-related questions.',
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
