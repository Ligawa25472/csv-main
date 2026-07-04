import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporationTaxComponent } from './corporation-tax.component';

describe('CorporationTaxComponent', () => {
  let component: CorporationTaxComponent;
  let fixture: ComponentFixture<CorporationTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporationTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporationTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
