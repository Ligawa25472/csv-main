import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-personal-cis',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './personal-cis.component.html',
  styleUrls: ['./personal-cis.component.css'],
})
export class PersonalCisComponent {
  items = [
    'Accurate CIS refund calculations',
    'Claim overpaid deductions for subcontractors',
    'Complete HMRC filing and support',
    'Advice for working contractors and sole traders',
  ];

  benefits = [
    'Improved cashflow through refunds',
    'Fewer errors with professional review',
    'Faster support during the claims process',
    'A clear path to compliant CIS returns',
  ];
}
