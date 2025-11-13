import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentOverview } from './appointment-overview';

describe('AppointmentOverview', () => {
  let component: AppointmentOverview;
  let fixture: ComponentFixture<AppointmentOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
