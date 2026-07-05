import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type IconPaths = { [key: string]: string };

/**
 * Lightweight inline SVG icon set (stroke-based, currentColor).
 * Replaces emoji "icons" across the site for a professional, accessible look.
 */
const EMOJI_ICON_MAP: IconPaths = {
  '📞': 'phone',
  '✉️': 'mail',
  '📧': 'mail',
  '📊': 'chart',
  '📈': 'trending',
  '📅': 'calendar',
  '💼': 'briefcase',
  '💰': 'pound',
  '🎯': 'target',
  '🧾': 'receipt',
  '📚': 'book',
  '💻': 'mobile',
  '📱': 'mobile',
  '⚡': 'sparkles',
  '🤝': 'handshake',
  '🏢': 'building',
  '✅': 'check',
  '💷': 'pound',
  '📋': 'fileText',
  '☰': 'menu',
  '✕': 'close',
};

const ICONS: IconPaths = {
  // Services
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  receipt:
    '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
  coins:
    '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  calculator:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="18" x2="12" y2="18"/>',
  chart:
    '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  trending:
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  briefcase:
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  fileText:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  home: '<path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/>',
  building:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="15" y1="14" x2="15" y2="14"/><path d="M10 22v-4h4v4"/>',
  hardHat:
    '<path d="M2 18h20"/><path d="M10 4v4"/><path d="M14 4v4"/><path d="M4 18a8 8 0 0 1 16 0"/><path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4H9z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  trendingUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 2 17"/><polyline points="17 6 23 6 23 12"/>',
  // Benefits / trust
  pound:
    '<path d="M18 7c0-2.2-1.8-4-4-4S10 4.8 10 7v3"/><path d="M7 13h7"/><path d="M7 21h11a4 4 0 0 0-3-6 4 4 0 0 0 1-3"/><path d="M7 21V10"/>',
  target:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mobile:
    '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/>',
  handshake:
    '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  mapPin:
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:
    '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  checkCircle:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  shield:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  award:
    '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  starFilled: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>',
  facebook:
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  bell: '<circle cx="12" cy="12" r="9"/><path d="M8 13a4 4 0 0 0 8 0c0-3.31-1.79-6-4-6s-4 2.69-4 6"/><path d="M9 17h6">',
  search: '<circle cx="11" cy="11" r="6"/><line x1="21" y1="21" x2="16.65" y2="16.65">',
  lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a6 6 0 0 0-4 10c.82.85 1.67 1.6 2 3v1h4v-1c.33-1.4 1.18-2.15 2-3a6 6 0 0 0-4-10z">',
  rocket: '<path d="M5 16.18 4 20l3.82-1 5.5-5.5"/><path d="M10 9a5 5 0 1 1 5 5"/><path d="M12 2l3 3"/><path d="M13 3 9 7">',
  diamond: '<path d="M12 2 22 12 12 22 2 12 12 2"/><path d="M2 12h20">',
  tie: '<path d="M12 2 15 9 12 14 9 9 12 2"/><path d="M12 14v8">',
  hammer: '<path d="M2 22 10 14"/><path d="M16 8 22 2l2 2-6 6-3 3-6 6-2-2 6-6 3-3">',
  camera: '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M7 6h2">',
  // Additional icons used in templates
  scale: '<path d="M6 21h12"/><path d="M12 3v18"/><path d="M4 10h4l2-4 2 4h4"/>',
  droplet: '<path d="M12 2s6 6 6 10a6 6 0 0 1-12 0c0-4 6-10 6-10z"/><circle cx="12" cy="14" r="1"/>',
  sparkles:
    '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<span
    class="icon-svg"
    [innerHTML]="svg"
    aria-hidden="true"
  ></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
        vertical-align: middle;
      }

      .icon-svg {
        display: inline-flex;
        width: 1em;
        height: 1em;
      }

      :host ::ng-deep svg {
        width: 1em;
        height: 1em;
        stroke-width: 2;
      }
    `,
  ],
})
export class IconComponent {
  @Input() set name(value: string) {
    this._name = value;
    this.render();
  }
  get name() {
    return this._name;
  }
  private _name = '';

  svg: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  private render() {
    const iconKey = EMOJI_ICON_MAP[this._name] || this._name;
    const path = ICONS[iconKey] || '';
    const markup = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" focusable="false">${path}</svg>`;
    this.svg = this.sanitizer.bypassSecurityTrustHtml(markup);
  }
}
