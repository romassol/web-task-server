import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayFromYourOnlineBankComponent } from './admin-pay-from-your-online-bank.component';

describe('AdminPayFromYourOnlineBankComponent', () => {
  let component: AdminPayFromYourOnlineBankComponent;
  let fixture: ComponentFixture<AdminPayFromYourOnlineBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPayFromYourOnlineBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPayFromYourOnlineBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
