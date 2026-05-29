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

  contactMethods = [
    {
      icon: 'phone',
      label: 'Call Us',
      value: '07551 551717',
      action: 'tel:07551551717',
      description: 'Speak directly with our team',
    },
    {
      icon: 'mail',
      label: 'Email Us',
      value: 'info@mnaaccounting.co.uk',
      action: 'mailto:info@mnaaccounting.co.uk',
      description: 'Send us a message anytime',
    },
    {
      icon: 'mapPin',
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
