import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  isSubmitting = false;
  isSubmitted = false;

  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;

      // Simulate form submission - replace with actual API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.resetForm();

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 1000);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.contactForm.name &&
      this.contactForm.email &&
      this.contactForm.phone &&
      this.contactForm.message
    );
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
  }

  socialLinks = [
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/company/mna-accounting-ltd',
      handle: 'MNA Accounting LTD',
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/mnaaccounting',
      handle: '@MNA accounting LTD',
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: 'https://facebook.com/mnaaccounting',
      handle: 'MNA Accounting LTD',
    },
  ];

  contactMethods = [
    {
      icon: '📞',
      label: 'Call Us',
      value: '07551 551717',
      action: 'tel:07551551717',
      description: 'Speak directly with our team',
    },
    {
      icon: '✉️',
      label: 'Email Us',
      value: 'info@mnaaccounting.co.uk',
      action: 'mailto:info@mnaaccounting.co.uk',
      description: 'Send us a message anytime',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Birmingham, UK',
      action: '',
      description: 'Serving West Midlands & Remote',
    },
  ];
}
