import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-self-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css'],
})
export class SelfAssessmentComponent {
  features = [
    'Complete tax return preparation',
    'HMRC submission with accuracy checks',
    'Claim allowable expenses and reliefs',
    'Self-employed, landlord and contractor support',
  ];

  outcomes = [
    'Reduced risk of errors or penalties',
    'Confidence ahead of every deadline',
    'Optimised tax position for the tax year',
    'Personalised support for UK individuals',
  ];
}
