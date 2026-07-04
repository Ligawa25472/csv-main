import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-personal-services',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './personal-services.component.html',
  styleUrls: ['./personal-services.component.css'],
})
export class PersonalServicesComponent {
  services = [
    {
      icon: 'receipt',
      title: 'Self Assessment',
      description:
        'Prepare and file your tax return accurately with clear guidance, compliant reporting and tailored support for contractors, freelancers and sole traders.',
      features: [
        'Detailed income review',
        'Expense claims & allowable costs',
        'HMRC submission support',
        'Deadline reminders and review',
      ],
      link: '/personal/self-assessment',
    },
    {
      icon: 'pound',
      title: 'Capital Gains Tax',
      description:
        'Plan around property, investments and asset disposals with proactive advice that helps reduce your personal CGT exposure and preserve more of your gains.',
      features: [
        'Asset disposal strategy',
        'Reliefs and exemptions',
        'Property gain calculations',
        'Claiming annual allowances',
      ],
      link: '/personal/capital-gains-tax',
    },
    {
      icon: 'target',
      title: 'Personal Tax Planning',
      description:
        'Create a smarter personal tax strategy that aligns with your financial goals, reduces liability and supports long-term wealth management.',
      features: [
        'Income & dividend planning',
        'Pension and ISA advice',
        'Allowance optimisation',
        'Year-round tax reviews',
      ],
      link: '/personal/tax-planning',
    },
    {
      icon: 'briefcase',
      title: 'CIS Refunds',
      description:
        'Fast, accurate CIS refund support for subcontractors and sole traders, with clear help to reclaim overpaid deductions and manage HMRC compliance.',
      features: [
        'Refund calculations',
        'Submission support',
        'Subcontractor guidance',
        'Document review and filing',
      ],
      link: '/personal/cis',
    },
  ];

  highlights = [
    'A dedicated personal service for individuals and small businesses',
    'Mobile-first pages designed for fast access on phones and tablets',
    'Clear, honest pricing and professional UK tax support',
  ];
}
