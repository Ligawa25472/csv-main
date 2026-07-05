import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  isMenuOpen = false;
  activeDropdown: string | null = null;

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

  toggleDropdown(menu: string, event: Event) {
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  isDropdownOpen(menu: string): boolean {
    return this.activeDropdown === menu;
  }

  closeDropdown() {
    this.activeDropdown = null;
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
