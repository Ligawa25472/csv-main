import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (typeof document !== 'undefined' && document && document.body) {
      if (this.isMenuOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    if (typeof document !== 'undefined' && document && document.body) {
      document.body.classList.remove('no-scroll');
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined' && document && document.body) {
      document.body.classList.remove('no-scroll');
    }
  }
}
