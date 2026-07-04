import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import {
  SITE,
  BUSINESS_SERVICES,
  PERSONAL_SERVICES,
} from '../../core/site.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  site = SITE;
  businessServices = BUSINESS_SERVICES;
  personalServices = PERSONAL_SERVICES;
  year = new Date().getFullYear();
}
