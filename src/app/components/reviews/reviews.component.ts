import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface Review {
  author: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  source: 'trustpilot';
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  trustpilotRating = 4.3;
  trustpilotReviewCount = 9;
  trustpilotUrl = 'https://uk.trustpilot.com/review/mnaaccounting.co.uk';
  googleUrl = 'https://maps.app.goo.gl/pjHKFXqY649DnPFv5';

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getPartialStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  reviews: Review[] = [
    {
      author: 'Verified Customer',
      rating: 5,
      text: 'Fantastic personal service to guide my new business through first full year of trading. Very highly recommended.',
      service: 'Business Accounting',
      date: '2026-03-14',
      source: 'trustpilot',
    },
    {
      author: 'Verified Customer',
      rating: 5,
      text: 'Amazing, reliable and very organised. Would highly recommend this company. Communication is excellent.',
      service: 'Accounting Services',
      date: '2026-03-02',
      source: 'trustpilot',
    },
    {
      author: 'Verified Customer',
      rating: 5,
      text: 'Great customer service and very knowledgeable.',
      service: 'Accounting Services',
      date: '2026-02-26',
      source: 'trustpilot',
    },
    {
      author: 'Verified Customer',
      rating: 5,
      text: 'Great service and professional, thanks.',
      service: 'Accounting Services',
      date: '2025-12-24',
      source: 'trustpilot',
    },
    {
      author: 'Solman',
      rating: 5,
      text: 'Definitely the best price and best service for you or your business. Very friendly approachable and all around great work! Recommended to all! Friendly, fair knowledgeable and quick!',
      service: 'Business Accounting',
      date: '2025-11-05',
      source: 'trustpilot',
    },
    {
      author: 'Gurmit',
      rating: 5,
      text: 'I\'m very pleased with the professional and efficient service from MNA Accounting. They handled the preparation of my accounts with great attention to detail and made the entire process smooth and stress-free. Communication was clear, timely, and always helpful. It\'s refreshing to work with an accounting firm that is both knowledgeable and approachable. Highly recommended for anyone seeking reliable and thorough financial support.',
      service: 'Accounts Preparation',
      date: '2025-11-03',
      source: 'trustpilot',
    },
    {
      author: 'Verified Customer',
      rating: 5,
      text: 'Highly recommended, reliable, really good advice and fast response.',
      service: 'Accounting Advisory',
      date: '2025-10-10',
      source: 'trustpilot',
    },
    {
      author: 'Denise',
      rating: 5,
      text: 'Good advice, immediate call back, well knowledgeable.',
      service: 'Accounting Services',
      date: '2025-09-16',
      source: 'trustpilot',
    },
    {
      author: 'Verified Customer',
      rating: 5,
      text: 'MNA Accounting is one of the most knowledgeable accounting firms I\'ve worked with. Their pricing is very competitive, and their customer service is outstanding. They\'ve been amazing with the services they provided to my company. Highly recommend!',
      service: 'Business Accounting',
      date: '2025-09-12',
      source: 'trustpilot',
    },
  ];
}
