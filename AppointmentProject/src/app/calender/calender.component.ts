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
    { slot: 1, viewValue: '09:30 - 10:00 AM' },
    { slot: 2, viewValue: '10:00 - 10:30 AM' },
    { slot: 3, viewValue: '10:30 - 11:00 AM' },
    { slot: 4, viewValue: '11:00 - 11:30 AM' },
    { slot: 5, viewValue: '04:00 - 04:30 PM' },
    { slot: 6, viewValue: '04:30 - 05:00 PM' },
    { slot: 7, viewValue: '05:00 - 05:30 PM' }, 
    { slot: 8, viewValue: '05:30 - 06:00 PM' }, 
    { slot: 9, viewValue: '06:00 - 06:30 PM' }, 

  ];
  appointmentDate: any;
  selectedSlot: number|null=null;

  constructor(private fb: FormBuilder, private AuthenticationServiceService:AuthenticationServiceService,private route: ActivatedRoute,private router: Router) {
    this.appointmentForm = this.fb.group({
      appointmentDate:new FormControl('',[Validators.required]),
      slot:new FormControl('',[Validators.required]),
    });
  }

  dateChanged($event: any) {
    const dateForSchedule = new Date($event.target.value);
    const year = dateForSchedule.getFullYear();
    const month = (dateForSchedule.getMonth() + 1).toString().padStart(2, '0'); 
    const day = dateForSchedule.getDate().toString().padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    const selectedDate= new Date(formattedDate);
    const currentDate = new Date();
    if(selectedDate < currentDate)
    {
      alert("select an upcoming date")
    }
    console.log(formattedDate)
    this.appointmentForm.patchValue({ appointmentDate: formattedDate });
  }
  ngOnInit(){
    this.doctorId = +this.route.snapshot.paramMap.get('doctorId')!;

    this.AuthenticationServiceService.bookAppointmentStatus$.subscribe((status:boolean)=>
    {
      if (status) {
        this.router.navigate(['/patientProfile']);
      } else {
        alert("Booking error");
      }
    });
  }

  goToProfile()
  {
    const patientId=localStorage.getItem('patientId');
    this.router.navigate(['/patientProfile',patientId]);
    
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
