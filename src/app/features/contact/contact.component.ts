import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
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
  isError = false;
  errorMessage = '';

  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      this.isError = false;
      this.errorMessage = '';

      // Send email via API endpoint
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.contactForm),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send message');
          }
          return response.json();
        })
        .then(() => {
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.resetForm();

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.isSubmitted = false;
          }, 5000);
        })
        .catch((error) => {
          console.error('Contact form error:', error);
          this.isSubmitting = false;
          this.isError = true;
          this.errorMessage =
            'Sorry, we could not send your message. Please try again or call us directly at 07551 551717.';

          // Hide error message after 5 seconds
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
    }
  }

  isFormValid(): boolean {
    if (
      !this.contactForm.name ||
      !this.contactForm.email ||
      !this.contactForm.phone ||
      !this.contactForm.message
    ) {
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactForm.email)) {
      return false;
    }

    return true;
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
  }

  contactMethods = [
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/alexander-shatov-_qsuER9xYOY-unsplash.jpg',
      label: 'Call Us',
      value: '07551 551717',
      action: 'tel:07551551717',
      description: 'Speak directly with our team',
    },
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/mariia-shalabaieva-HyyHIYz_l0A-unsplash.jpg',
      label: 'Email Us',
      value: 'info@mnaaccounting.co.uk',
      action: 'mailto:info@mnaaccounting.co.uk',
      description: 'Send us a message anytime',
    },
    {
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/geojango-maps-Z8UgB80_46w-unsplash.jpg',
      label: 'Location',
      value: 'Birmingham, UK',
      action: '',
      description: 'Serving West Midlands & Remote',
    },
  ];

  socialLinks = [
    {
      name: 'LinkedIn',
      handle: 'MNA Accounting LTD',
      url: 'https://linkedin.com/company/mna-accounting-ltd',
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/alexander-shatov-9Zjd7PE_FRM-unsplash.jpg',
    },
    {
      name: 'Instagram',
      handle: '@MNA accounting LTD',
      url: 'https://instagram.com/mnaaccounting',
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/alexander-shatov-_tF3vug2FhQ-unsplash.jpg',
    },
    {
      name: 'Facebook',
      handle: 'MNA Accounting LTD',
      url: 'https://facebook.com/mnaaccounting',
      imageUrl:
        'https://s7nje1ay02rvfkep.public.blob.vercel-storage.com/mariia-shalabaieva-d64-ghA_rH4-unsplash.jpg',
    },
  ];
}
