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

    // Simulate form submission
    setTimeout(() => {
      try {
        // Here you would normally send the form data to your backend
        console.log('Booking submitted:', this.bookingForm);
        
        this.isSubmitted = true;
        this.isSubmitting = false;

        // Reset form after 3 seconds
        setTimeout(() => {
          this.resetForm();
        }, 3000);
      } catch (error: any) {
        this.isError = true;
        this.errorMessage = error.message || 'Failed to submit booking. Please try again.';
        this.isSubmitting = false;
      }
    }, 1500);
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
