import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-qr.component.html',
  styleUrls: ['./floating-qr.component.css'],
})
export class FloatingQrComponent {
  isExpanded = signal(false);

  toggleQr() {
    this.isExpanded.update(value => !value);
  }

  closeQr() {
    this.isExpanded.set(false);
  }
}
