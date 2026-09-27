import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements AfterViewInit {
  constructor(
    private readonly elementRef: ElementRef,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const trustpilot = (window as Window & { Trustpilot?: { loadFromElement: (element: Element) => void } }).Trustpilot;
    const widget = this.elementRef.nativeElement.querySelector('.trustpilot-widget');

    if (trustpilot && widget) {
      trustpilot.loadFromElement(widget);
    }
  }
}
