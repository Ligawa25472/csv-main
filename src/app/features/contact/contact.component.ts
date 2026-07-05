import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../components/icon/icon.component';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  site = SITE;

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
          console.log('[v0] Contact API response status:', response.status);
          if (!response.ok) {
            return response.json().then((data) => {
              console.log('[v0] API error response:', data);
              throw new Error(data.error || 'Failed to send message');
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log('[v0] Contact form success:', data);
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.resetForm();

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.isSubmitted = false;
          }, 5000);
        })
        .catch((error) => {
          console.error('[v0] Contact form error caught:', error.message);
          this.isSubmitting = false;
          this.isError = true;
          // Display the actual error from API or fallback message
          this.errorMessage = error.message || 'Sorry, we could not send your message. Please try again or call us directly at 07551 551717.';

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
      imageUrl: '/images/call-icon.png',
      label: 'Call Us',
      value: '07551 551717',
      action: 'tel:07551551717',
      description: 'Speak directly with our team',
    },
    {
      imageUrl: '/images/email-icon.png',
      label: 'Email Us',
      value: 'info@mnaaccounting.co.uk',
      action: 'mailto:info@mnaaccounting.co.uk',
      description: 'Send us a message anytime',
    },
    {
      imageUrl: '/images/location-icon.png',
      label: 'Location',
      value: 'Birmingham, UK',
      action: '',
      description: 'Serving West Midlands & Remote',
    },
  ];

  socialLinks = [
    {
      name: 'LinkedIn',
      handle: '',
      url: 'https://www.linkedin.com/in/mna-accounting-ltd-406b7936b?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      imageUrl: '/images/linkedin-icon.png',
    },
    {
      name: 'Instagram',
      handle: '',
      url: 'https://www.instagram.com/mnaaccountingltd?igsh=MTB4cm9ucWQxbHBhag%3D%3D&utm_source=qr',
      imageUrl: '/images/instagram-icon.png',
    },
    {
      name: 'Facebook',
      handle: '',
      url: 'https://www.facebook.com/share/14hwqqGV56W/?mibextid=wwXIfr',
      imageUrl: '/images/facebook-icon.png',
    },
    {
      name: 'WhatsApp',
      handle: '',
      url: 'https://wa.me/447551551717',
      imageUrl: '/images/whatsapp-social.png',
    },
  ];
}
