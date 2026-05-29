/**
 * Single source of truth for business (NAP) details, used across the footer,
 * contact page, SEO meta and LocalBusiness structured data.
 */
export const SITE = {
  name: 'MNA Accounting Ltd',
  legalName: 'MNA Accounting Ltd',
  tagline: 'Expert qualified bookkeeping & accounting',
  url: 'https://www.mnaaccounting.co.uk',
  email: 'info@mnaaccounting.co.uk',
  phone: '07551 551717',
  phoneHref: 'tel:07551551717',
  priceRange: '££',
  foundingYear: 2019,
  address: {
    street: '32 The Link',
    locality: 'Birmingham',
    region: 'West Midlands',
    postalCode: 'B27 7SS',
    country: 'GB',
  },
  // Approx. coordinates for B27 7SS (Birmingham) for LocalBusiness schema
  geo: { lat: 52.4516, lng: -1.8203 },
  openingHours: 'Mon–Fri 09:00–17:30',
  areasServed: [
    'Birmingham',
    'Solihull',
    'Coventry',
    'Warwickshire',
    'Wolverhampton',
    'West Midlands',
  ],
  social: {
    linkedin: 'https://linkedin.com/company/mna-accounting-ltd',
    instagram: 'https://instagram.com/mnaaccounting',
    facebook: 'https://facebook.com/mnaaccounting',
  },
} as const;

export const BUSINESS_SERVICES = [
  { name: 'Bookkeeping', link: '/business/bookkeeping' },
  { name: 'VAT Returns', link: '/business/vat-returns' },
  { name: 'Payroll & CIS', link: '/business/payroll-cis' },
  { name: 'Corporation Tax', link: '/business/corporation-tax' },
  { name: 'Year End Accounts', link: '/business/year-end-accounts' },
  { name: 'Management Accounts', link: '/business/management-accounts' },
  { name: 'Tax Planning', link: '/business/tax-planning' },
];

export const PERSONAL_SERVICES = [
  { name: 'Self Assessment', link: '/personal/self-assessment' },
  { name: 'Capital Gains Tax', link: '/personal/capital-gains-tax' },
  { name: 'Personal Tax Planning', link: '/personal/tax-planning' },
  { name: 'CIS Refunds', link: '/personal/cis' },
];
