import { Routes } from '@angular/router';

// Import all your components here as you create them
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BusinessServicesComponent } from './features/business-services/business-services.component';
import { CorporationTaxComponent } from './features/corporation-tax/corporation-tax.component';
import { VatReturnsComponent } from './features/vat-returns/vat-returns.component';
import { PayrollCisComponent } from './features/payroll-cis/payroll-cis.component';
import { BookkeepingComponent } from './features/bookkeeping/bookkeeping.component';
import { YearEndAccountsComponent } from './features/year-end-accounts/year-end-accounts.component';
import { ManagementAccountsComponent } from './features/management-accounts/management-accounts.component';
import { BusinessTaxPlanningComponent } from './features/business-tax-planning/business-tax-planning.component';

// Personal services components
import { PersonalServicesComponent } from './features/personal-services/personal-services.component';
import { SelfAssessmentComponent } from './features/personal-services/self-assessment.component';
import { CapitalGainsTaxComponent } from './features/personal-services/capital-gains-tax.component';
import { PersonalTaxPlanningComponent } from './features/personal-services/personal-tax-planning.component';
import { PersonalCisComponent } from './features/personal-services/personal-cis.component';
import { MakingTaxDigitalComponent } from './features/personal-services/making-tax-digital.component';

// Additional business services
import { CompaniesHouseComponent } from './features/business-services/companies-house.component';
import { BookConsultationComponent } from './pages/book-consultation/book-consultation.component';

// Admin components
import { LoginComponent } from './features/admin/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';

// Error pages
import { Error404Component } from './pages/error-404/error-404.component';
import { Error403Component } from './pages/error-403/error-403.component';
import { Error500Component } from './pages/error-500/error-500.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'book-consultation', component: BookConsultationComponent },
  { path: 'faq', component: FaqComponent },

  // Admin Routes
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },

  // Business Services Routes
  { path: 'business', component: BusinessServicesComponent },
  { path: 'business/corporation-tax', component: CorporationTaxComponent },
  { path: 'business/vat-returns', component: VatReturnsComponent },
  { path: 'business/payroll-cis', component: PayrollCisComponent },
  { path: 'business/bookkeeping', component: BookkeepingComponent },
  { path: 'business/year-end-accounts', component: YearEndAccountsComponent },
  {
    path: 'business/management-accounts',
    component: ManagementAccountsComponent,
  },
  { path: 'business/tax-planning', component: BusinessTaxPlanningComponent },
  { path: 'business/companies-house', component: CompaniesHouseComponent },

  // Personal Services Routes
  { path: 'personal', component: PersonalServicesComponent },
  { path: 'personal/self-assessment', component: SelfAssessmentComponent },
  { path: 'personal/capital-gains-tax', component: CapitalGainsTaxComponent },
  { path: 'personal/tax-planning', component: PersonalTaxPlanningComponent },
  { path: 'personal/cis', component: PersonalCisComponent },
  { path: 'personal/making-tax-digital', component: MakingTaxDigitalComponent },

  // Error Routes
  { path: 'error/403', component: Error403Component },
  { path: 'error/404', component: Error404Component },
  { path: 'error/500', component: Error500Component },

  // Wildcard route - must be last
  { path: '**', component: Error404Component },
];
