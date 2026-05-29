import { Routes } from '@angular/router';

// Import all your components here as you create them
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { BusinessServicesComponent } from './features/business-services/business-services.component';
import { CorporationTaxComponent } from './features/corporation-tax/corporation-tax.component';
import { VatReturnsComponent } from './features/vat-returns/vat-returns.component';
import { PayrollCisComponent } from './features/payroll-cis/payroll-cis.component';
import { BookkeepingComponent } from './features/bookkeeping/bookkeeping.component';
import { YearEndAccountsComponent } from './features/year-end-accounts/year-end-accounts.component';
import { ManagementAccountsComponent } from './features/management-accounts/management-accounts.component';
import { BusinessTaxPlanningComponent } from './features/business-tax-planning/business-tax-planning.component';

// Personal services components (to be created)
// import { PersonalServicesComponent } from './features/personal-services/personal-services.component';
// import { SelfAssessmentComponent } from './features/self-assessment/self-assessment.component';
// import { CapitalGainsTaxComponent } from './features/capital-gains-tax/capital-gains-tax.component';
// import { PersonalTaxPlanningComponent } from './features/personal-tax-planning/personal-tax-planning.component';
// import { PersonalCisComponent } from './features/personal-cis/personal-cis.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

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

  // Personal Services Routes (uncomment as you create components)
  // { path: 'personal', component: PersonalServicesComponent },
  // { path: 'personal/self-assessment', component: SelfAssessmentComponent },
  // { path: 'personal/capital-gains-tax', component: CapitalGainsTaxComponent },
  // { path: 'personal/tax-planning', component: PersonalTaxPlanningComponent },
  // { path: 'personal/cis', component: PersonalCisComponent },

  // Wildcard route - must be last
  { path: '**', redirectTo: '/home' },
];
