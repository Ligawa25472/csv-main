import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-making-tax-digital',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './making-tax-digital.component.html',
  styleUrls: ['./making-tax-digital.component.css'],
})
export class MakingTaxDigitalComponent {
  services = [
    {
      icon: 'fileCheck',
      title: 'Making Tax Digital (MTD) Registration',
      description: 'Expert guidance on registering your business with HMRC for Making Tax Digital compliance.',
    },
    {
      icon: 'cloud',
      title: 'Cloud Accounting',
      description: 'We set up and configure cloud-based accounting systems to streamline your tax submissions.',
    },
    {
      icon: 'book',
      title: 'Digital Bookkeeping',
      description: 'Keep accurate digital records that are ready for quarterly HMRC submissions.',
    },
    {
      icon: 'calendar',
      title: 'Quarterly HMRC Submissions',
      description: 'We handle your quarterly submissions, ensuring timely compliance with MTD requirements.',
    },
    {
      icon: 'checkCircle',
      title: 'Tax Compliance Reviews',
      description: 'Regular reviews of your records to ensure full compliance with MTD requirements.',
    },
    {
      icon: 'messageCircle',
      title: 'Ongoing Advice & Support',
      description: 'Dedicated support to help you maintain compliance and optimize your tax position.',
    },
  ];

  softwarePlatforms = [
    { name: 'Xero', icon: '🔷' },
    { name: 'QuickBooks', icon: '📊' },
  ];

  benefits = [
    'Expert guidance through Making Tax Digital registration and compliance',
    'Streamlined quarterly submissions with no surprises',
    'Full digital audit trail for your records',
    'Reduced risk of penalties and errors',
    'Trusted by self-employed professionals across the UK',
    'Available nationwide with local support',
  ];

  whoNeeds = [
    'Self-employed traders and contractors',
    'Partnerships and joint ventures',
    'Small business owners',
    'Landlords with rental income',
    'Directors of limited companies',
  ];
}
