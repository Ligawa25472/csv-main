import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-capital-gains-tax',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './capital-gains-tax.component.html',
  styleUrls: ['./capital-gains-tax.component.css'],
})
export class CapitalGainsTaxComponent {
  points = [
    'Values asset disposals and gains accurately',
    'Targets reliefs like private residence relief and annual exemptions',
    'Helps with tax-efficient disposal timing',
    'Supports property, shares and investment gains reporting',
  ];

  benefits = [
    'Clear calculation of CGT liabilities',
    'Advice on exemptions and reliefs',
    'Support for HMRC reporting',
    'Practical long-term planning for gains',
  ];
}
