import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    // Set the page title and meta description for SEO
    this.titleService.setTitle(
      'MNA Accounting LTD | Accountants for Small to Medium Businesses in Birmingham, Coventry, Warwickshire, and Beyond – Supporting Clients Locally and Remotely Across the UK'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Trusted accountants serving Birmingham, Coventry, Warwickshire, and beyond. MNA Accounting provides tax, VAT, payroll, and bookkeeping services for small to medium businesses – locally and remotely across the UK.',
    });
  }

  services = [
    {
      icon: 'book',
      name: 'Bookkeeping',
      description:
        'Complete financial record management and transaction tracking for your business',
      link: '/business/bookkeeping',
    },
    {
      icon: 'fileText',
      name: 'Self Assessment',
      description:
        'Personal and business tax return preparation and submission',
      link: '/personal/self-assessment',
    },
    {
      icon: 'calculator',
      name: 'Payroll & CIS',
      description:
        'Employee payment processing and Construction Industry Scheme management',
      link: '/business/payroll-cis',
    },
    {
      icon: 'receipt',
      name: 'VAT Returns',
      description:
        'VAT registration, calculations and timely submissions to HMRC',
      link: '/business/vat-returns',
    },
    {
      icon: 'chart',
      name: 'Management Accounts',
      description: 'Financial reporting and business performance analysis',
      link: '/business/management-accounts',
    },
    {
      icon: 'briefcase',
      name: 'Corporation Tax',
      description: 'Expert corporation tax services for limited companies',
      link: '/business/corporation-tax',
    },
  ];

  benefits = [
    {
      icon: 'dollarSign',
      title: '40% Lower Fees',
      description: 'On average, we charge 40% less than other accountants',
    },
    {
      icon: 'target',
      title: 'Local Expertise',
      description:
        'Deep understanding of Birmingham and West Midlands business landscape',
    },
    {
      icon: 'smartphone',
      title: 'Remote Support',
      description: 'Full online accounting services available nationwide',
    },
    {
      icon: 'handshake',
      title: 'Personal Service',
      description: 'You always deal with someone who knows your business',
    },
  ];

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
