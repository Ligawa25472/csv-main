import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatReturnsComponent } from './vat-returns.component';

describe('VatReturnsComponent', () => {
  let component: VatReturnsComponent;
  let fixture: ComponentFixture<VatReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatReturnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VatReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
