import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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

  appointmentForm: FormGroup;
  slots = [
    { value: 'NineToNineThirty', viewValue: '09:00 - 09:30 AM' },
    { value: 'NineThirtyToTen', viewValue: '09:30 - 10:00 AM' },

    
  ];

  constructor(private fb: FormBuilder, private AuthenticationServiceService:AuthenticationServiceService) {
    this.appointmentForm = this.fb.group({
      appointmentDate: [null, Validators.required],
      slot: [null, Validators.required]
    });
  }


  onSubmit()
  {
    {
      if(this.appointmentForm.valid)
      {
        this.AuthenticationServiceService.bookAppoinment(this.appointmentForm.value);
      }
    }
  }

}

