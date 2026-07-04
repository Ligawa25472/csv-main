import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEndAccountsComponent } from './year-end-accounts.component';

describe('YearEndAccountsComponent', () => {
  let component: YearEndAccountsComponent;
  let fixture: ComponentFixture<YearEndAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearEndAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearEndAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
