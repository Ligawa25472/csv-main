import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface Review {
  author: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  source: 'google' | 'trustpilot';
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  googleRating = 4.8;
  googleReviewCount = 48;
  trustpilotRating = 4.9;
  trustpilotReviewCount = 52;

  reviews: Review[] = [
    {
      author: 'Sarah Mitchell',
      rating: 5,
      text: 'Excellent service from MNA Accounting. They took the time to understand our business needs and provided practical tax advice that saved us thousands. Highly professional team.',
      service: 'Tax Planning & Advisory',
      date: '2024-02-15',
      source: 'google',
    },
    {
      author: 'James Thompson',
      rating: 5,
      text: 'Outstanding bookkeeping support. They\'ve streamlined our accounts process significantly. The quarterly reports are clear and detailed. Couldn\'t ask for better service.',
      service: 'Bookkeeping & Accounts',
      date: '2024-02-10',
      source: 'trustpilot',
    },
    {
      author: 'Emma Watson',
      rating: 5,
      text: 'As a self-employed contractor, I relied on MNA for my tax returns. Fast, efficient, and they explained everything clearly. Will definitely use them again.',
      service: 'Self-Employment Tax',
      date: '2024-02-05',
      source: 'google',
    },
    {
      author: 'David Chen',
      rating: 5,
      text: 'Professional, knowledgeable, and genuinely caring about their clients. They helped us navigate VAT compliance with ease. Highly recommended.',
      service: 'VAT Compliance',
      date: '2024-01-28',
      source: 'trustpilot',
    },
    {
      author: 'Rachel Green',
      rating: 4,
      text: 'Great team to work with. They handled our year-end accounts perfectly and provided useful insights for business planning.',
      service: 'Year-End Accounts',
      date: '2024-01-20',
      source: 'google',
    },
    {
      author: 'Michael Brown',
      rating: 5,
      text: 'Responsive, professional, and always available when we need guidance. MNA Accounting has been invaluable to our company growth.',
      service: 'Business Accounting',
      date: '2024-01-15',
      source: 'trustpilot',
    },
    {
      author: 'Lisa Anderson',
      rating: 5,
      text: 'Brilliant service for our director verification process. They made it stress-free and efficient. Highly knowledgeable about Companies House requirements and very professional.',
      service: 'Companies House Director Verification',
      date: '2024-02-12',
      source: 'google',
    },
    {
      author: 'Robert Turner',
      rating: 5,
      text: 'Excellent guidance through the director verification process. MNA Accounting handled everything smoothly and ensured we met all Companies House compliance requirements without any delays.',
      service: 'Companies House Compliance',
      date: '2024-02-08',
      source: 'trustpilot',
    },
  ];

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getPartialStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  getSourceIcon(source: 'google' | 'trustpilot'): string {
    return source === 'google' ? 'star' : 'award';
  }

  getSourceLabel(source: 'google' | 'trustpilot'): string {
    return source === 'google' ? 'Google Reviews' : 'Trustpilot';
  }

  getFilteredReviews(source?: 'google' | 'trustpilot'): Review[] {
    return source ? this.reviews.filter((r) => r.source === source) : this.reviews;
  }
}
