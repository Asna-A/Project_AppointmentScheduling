import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [ MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,CommonModule,MatSelectModule,NgSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {

  doctorId: number|null=null;

  appointmentForm: FormGroup;
  slots = [
    { slot: 1, viewValue: '10:30 - 11:00 AM' },
    { slot: 2, viewValue: '11:00 - 11:30 AM' },
    { slot: 3, viewValue: '04:00 - 04:30 PM' },
    { slot: 4, viewValue: '04:30 - 05:00 PM' },
    { slot: 5, viewValue: '05:00 - 05:30 PM' },
    { slot: 6, viewValue: '05:30 - 06:00 PM' },
    { slot: 7, viewValue: '06:00 - 06:30 PM' }, 
  ];
  appointmentDate: any;
  selectedSlot: number|null=null;

  constructor(private fb: FormBuilder, private AuthenticationServiceService:AuthenticationServiceService,private route: ActivatedRoute) {
    this.appointmentForm = this.fb.group({
      appointmentDate:new FormControl('',[Validators.required]),
      slot:new FormControl('',[Validators.required]),
    });
  }


  
  dateChanged($event:any)
  {
    
    var dateForSchedule=$event.target.value
    var formattedDate = dateForSchedule.toISOString().split('T')[0];
    this.appointmentForm.patchValue({appointmentDate:formattedDate})
  }

  ngOnInit(){
    this.doctorId = +this.route.snapshot.paramMap.get('doctorId')!;
  }

  onSubmit()
  {
     if(this.appointmentForm.valid)
    {
        const appointmentData={
          DoctorId: this.doctorId,
          PatientId:+localStorage.getItem('patientId')!,
          slot:this.selectedSlot,
          AppointmentDate:this.appointmentForm.value.appointmentDate,
          Status:true 
        };

        this.AuthenticationServiceService.bookAppoinment(appointmentData);
      
      }
      else {
        console.log(this.appointmentForm.errors); 
        console.log(this.appointmentForm.value); 
      }

}
}
