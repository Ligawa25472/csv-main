import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-personal-tax-planning',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './personal-tax-planning.component.html',
  styleUrls: ['./personal-tax-planning.component.css'],
})
export class PersonalTaxPlanningComponent {
  steps = [
    'Review your income and tax allowances',
    'Identify opportunities for reliefs and exemptions',
    'Create a long-term personal tax strategy',
    'Monitor changes with proactive advice',
  ];

  benefits = [
    'Greater certainty over yearly tax bills',
    'More efficient use of allowances',
    'Improved cashflow planning',
    'Support for established and growing households',
  ];
}
