import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(private router: Router) {}

  async onSubmit(): Promise<void> {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;

    try {
      console.log('[v0] Login attempt for:', this.email);
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      console.log('[v0] API response status:', response.status);
      const data = await response.json();
      console.log('[v0] API response data:', data);

      if (!response.ok) {
        this.errorMessage = data.error || 'Login failed.';
        return;
      }

      // Store token and user data in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));

      // Redirect to dashboard
      this.router.navigate(['/admin/dashboard']);
    } catch (error) {
      console.error('[v0] Login error:', error);
      this.errorMessage = 'An error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
