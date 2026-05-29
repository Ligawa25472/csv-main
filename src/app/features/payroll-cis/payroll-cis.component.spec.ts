import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCisComponent } from './payroll-cis.component';

describe('PayrollCisComponent', () => {
  let component: PayrollCisComponent;
  let fixture: ComponentFixture<PayrollCisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollCisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollCisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
