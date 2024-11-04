import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageDoctorComponent } from './profile-page-doctor.component';

describe('ProfilePageDoctorComponent', () => {
  let component: ProfilePageDoctorComponent;
  let fixture: ComponentFixture<ProfilePageDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
