import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-book-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './book-consultation.component.html',
  styleUrl: './book-consultation.component.css',
})
export class BookConsultationComponent {
  bookingForm = {
    name: '',
    email: '',
    phone: '',
    businessType: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  };

  isSubmitting = false;
  isSubmitted = false;
  isError = false;
  errorMessage = '';

  businessTypes = [
    'Sole Trader',
    'Partnership',
    'Limited Company',
    'Limited Liability Partnership',
    'Non-Profit',
    'Other',
  ];

  consultationTypes = [
    'Tax Planning & Compliance',
    'Bookkeeping & Accounting',
    'Payroll & PAYE',
    'VAT & HMRC Compliance',
    'Business Setup',
    'Other',
  ];

  timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  isFormValid(): boolean {
    return (
      this.bookingForm.name.trim() !== '' &&
      this.bookingForm.email.trim() !== '' &&
      this.bookingForm.phone.trim() !== '' &&
      this.bookingForm.businessType.trim() !== '' &&
      this.bookingForm.consultationType.trim() !== '' &&
      this.bookingForm.preferredDate.trim() !== ''
    );
  }

  onSubmit(): void {
    if (!this.isFormValid() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.isError = false;

    fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.bookingForm.name,
        email: this.bookingForm.email,
        phone: this.bookingForm.phone,
        businessType: this.bookingForm.businessType,
        topic: this.bookingForm.consultationType,
        preferredDate: this.bookingForm.preferredDate,
        preferredTime: this.bookingForm.preferredTime,
        format: 'Not specified',
        notes: this.bookingForm.message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit booking');
        }
        return response.json();
      })
      .then(() => {
        this.isSubmitted = true;
        this.isSubmitting = false;

        // Reset form after 3 seconds
        setTimeout(() => {
          this.resetForm();
        }, 3000);
      })
      .catch((error) => {
        console.error('Booking form error:', error);
        this.isError = true;
        this.errorMessage =
          'Sorry, we could not submit your booking. Please try again or call us at 07551 551717.';
        this.isSubmitting = false;

        // Hide error message after 5 seconds
        setTimeout(() => {
          this.isError = false;
        }, 5000);
      });
  }

  resetForm(): void {
    this.bookingForm = {
      name: '',
      email: '',
      phone: '',
      businessType: '',
      consultationType: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    };
    this.isSubmitted = false;
    this.isError = false;
  }
}
