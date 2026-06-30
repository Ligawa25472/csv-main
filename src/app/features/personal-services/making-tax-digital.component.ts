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
    'MTD-compliant bookkeeping setup',
    'Integration with approved software',
    'Quarterly tax submissions to HMRC',
    'Cloud-based financial records',
    'Real-time reporting and analytics',
    'Ongoing compliance support',
  ];

  benefits = [
    'Stay compliant with HMRC digital tax requirements',
    'Automated quarterly submissions reduce penalties',
    'Real-time financial visibility for your business',
    'Reduced admin burden with cloud integration',
    'Professional guidance from qualified accountants',
    'Remote UK-wide support for all businesses',
  ];

  whoNeeds = [
    'Self-employed traders and contractors',
    'Partnerships and joint ventures',
    'Small business owners',
    'Landlords with rental income',
    'Directors of limited companies',
  ];
}
