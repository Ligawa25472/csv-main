import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payroll-cis',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './payroll-cis.component.html',
  styleUrl: './payroll-cis.component.css',
})
export class PayrollCisComponent {
  services = [
    {
      icon: 'pound',
      title: 'Payroll Processing',
      description:
        'We manage weekly, fortnightly, or monthly payroll runs, ensuring your employees are paid correctly and on time.',
    },
    {
      icon: 'chart',
      title: 'Real Time Information (RTI) Submissions',
      description:
        'We submit payroll data directly to HMRC, keeping your business compliant with all reporting obligations.',
    },
    {
      icon: 'hardHat',
      title: 'CIS Deductions & Reporting',
      description:
        'For contractors and subcontractors, we handle Construction Industry Scheme (CIS) deductions and file the necessary returns.',
    },
    {
      icon: 'fileText',
      title: 'Payslips, P60s & End-of-Year Reports',
      description:
        'We generate and distribute all required payroll documents, including payslips, P60s, and P45s.',
    },
  ];

  benefits = [
    'Trusted by contractors and small to medium businesses',
    'Local expertise with clients across Birmingham, Coventry, and the West Midlands',
    'Fixed-fee packages with no hidden costs',
    'Friendly, responsive service from a dedicated team',
  ];
}
