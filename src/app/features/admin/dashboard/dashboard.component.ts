import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_type: string;
  topic: string;
  preferred_date: string;
  preferred_time: string;
  format: string;
  notes: string;
  status: string;
  created_at: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  adminUser: any = null;
  contactMessages: ContactMessage[] = [];
  bookings: Booking[] = [];
  isLoading = true;
  activeTab: 'messages' | 'bookings' = 'messages';
  errorMessage = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData(): void {
    const token = localStorage.getItem('admin_token');
    const userStr = localStorage.getItem('admin_user');

    if (!token || !userStr) {
      this.router.navigate(['/admin/login']);
      return;
    }

    try {
      this.adminUser = JSON.parse(userStr);
      this.fetchContactMessages(token);
      this.fetchBookings(token);
    } catch (error) {
      this.router.navigate(['/admin/login']);
    }
  }

  async fetchContactMessages(token: string): Promise<void> {
    try {
      const response = await fetch('/api/admin/contact-messages', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      this.contactMessages = data.data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      this.errorMessage = 'Failed to load contact messages.';
    } finally {
      this.isLoading = false;
    }
  }

  async fetchBookings(token: string): Promise<void> {
    try {
      const response = await fetch('/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      this.bookings = data.data || [];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      this.errorMessage = 'Failed to load bookings.';
    }
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    this.router.navigate(['/admin/login']);
  }

  setActiveTab(tab: 'messages' | 'bookings'): void {
    this.activeTab = tab;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).catch(() => {
      alert('Failed to copy');
    });
  }
}
