import {
  Component,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit {
  site = SITE;
  businessUnitId = '689fa533dd17b897f89e2acc';
  dataToken = '92be7690-1180-46e4-bee7-5524ee38f2c3';
  values = [
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/istockphoto-1129810557-612x612.jpg',
      title: 'Affordability',
      description: 'Transparent pricing with no hidden fees.',
    },
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/istockphoto-1311977471-612x612.jpg',
      title: 'Growth-Focused Advice',
      description: 'We go beyond compliance to help you grow.',
    },
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/istockphoto-1330234595-612x612.jpg',
      title: 'Local Expertise',
      description:
        'Deep understanding of the West Midlands business landscape.',
    },
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/istockphoto-1338373163-612x612.jpg',
      title: 'Personal Service',
      description: "You'll always deal with someone who knows your business.",
    },
  ];

  clientTypes = [
    {
      icon: 'building',
      title: 'Small to Medium Businesses',
      description: 'Complete accounting solutions for growing companies',
    },
    {
      icon: 'tie',
      title: 'Sole Traders',
      description: 'Tailored services for individual business owners',
    },
    {
      icon: 'hammer',
      title: 'Contractors & Freelancers',
      description: 'Specialist support for independent professionals',
    },
    {
      icon: 'rocket',
      title: 'Startups & Growing Companies',
      description: 'Flexible services that scale with your business',
    },
  ];

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeTrustbox();
      }, 100);
    }
  }

  private initializeTrustbox(): void {
    if (typeof (window as any).Trustpilot !== 'undefined') {
      const trustboxElement =
        this.elementRef.nativeElement.querySelector('.trustpilot-widget');
      if (trustboxElement) {
        (window as any).Trustpilot.loadFromElement(trustboxElement);
      }
    }
  }

  scrollToContact() {
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
