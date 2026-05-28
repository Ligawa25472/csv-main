import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTaxPlanningComponent } from './business-tax-planning.component';

describe('BusinessTaxPlanningComponent', () => {
  let component: BusinessTaxPlanningComponent;
  let fixture: ComponentFixture<BusinessTaxPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTaxPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessTaxPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
