import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [ MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,CommonModule,MatSelectModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {

  doctorId: number|null=null;

  appointmentForm: FormGroup;
  slots = [
    { value: 'NineToNineThirty', viewValue: '09:00 - 09:30 AM' },
    { value: 'NineThirtyToTen', viewValue: '09:30 - 10:00 AM' },

    
  ];

  constructor(private fb: FormBuilder, private AuthenticationServiceService:AuthenticationServiceService,private route: ActivatedRoute) {
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
          DoctorId: this.doctorId,
          PatientId:localStorage.getItem('patientId'),
          slot:this.appointmentForm.value.slot,
          AppointmentDate:this.appointmentForm.value.appointmentDate
        };
        this.AuthenticationServiceService.bookAppoinment(appointmentData);
      }
    }
  }

}

