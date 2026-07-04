import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-companies-house',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './companies-house.component.html',
  styleUrls: ['./companies-house.component.css'],
})
export class CompaniesHouseComponent {
  services = [
    'Director identity verification',
    'Companies House compliance guidance',
    'Verification assistance for director appointments',
    'Statutory filing support',
    'Board meeting preparation and documentation',
    'Governance compliance advice',
  ];

  benefits = [
    'Professional, authorised verification provider',
    'Streamlined director appointment process',
    'Full compliance with Companies House requirements',
    'Reduced risk of rejection or queries',
    'Expert guidance on corporate governance',
    'Qualified, regulated, and insured service',
  ];

  whyChoose = [
    'Authorised as a Director Verification Provider by Companies House',
    'AAT Licensed Accountancy Practice with professional standards',
    'AML Supervised for security and compliance',
    'Professional Indemnity Insured for protection',
    'Experienced in supporting business directors',
    'Remote UK-wide service for convenience',
  ];
}
