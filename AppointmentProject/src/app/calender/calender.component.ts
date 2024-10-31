import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [ MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {

  doctorId: number;

  appointmentForm: FormGroup;
  slots = [
    { val: 'NineToNineThirty', viewValue: '09:00 - 09:30 AM' },
    { val: 'NineThirtyToTen', viewValue: '09:30 - 10:00 AM' },

    
  ];

  constructor(private fb: FormBuilder, private AuthenticationServiceService:AuthenticationServiceService) {
    this.appointmentForm = this.fb.group({
      appointmentDate: [null, Validators.required],
      slot: [null, Validators.required]
    });
  }

  ngOnInit(){

    this.doctorId = +this.route.snapshot.paramMap.get('doctorId')!;
  }

  onSubmit()
  {
    {
      if(this.appointmentForm.valid)
      {
        const appointmentData={
          DoctorId=this.doctorId,
          PatientId=localStorage.getItem('patientId'),
          slot=this.appointmentForm.value.slot,
          AppointmentDate=this.appointmentForm.value.appointmentDate
        };
        this.AuthenticationServiceService.bookAppoinment(appointmentData);
      }
    }
  }

}

