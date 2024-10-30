import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface patientForm {
  Name :FormControl<string|null>;
  Age: FormControl<string|null>;
  Email: FormControl<string|null>;
  Gender : FormControl<string|null>;
  Phone : FormControl<string|null>;
  City :FormControl<string|null>;
  State: FormControl<string|null>;
  Pin : FormControl<string|null>;
  UserName:FormControl<string|null>;
  Password: FormControl<string|null>;
  
}


@Component({
  selector: 'app-patient-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './patient-signup.component.html',
  styleUrl: './patient-signup.component.scss'
})


export class PatientSignupComponent {

  patient_form : FormGroup<patientForm>;

  constructor(private em : FormBuilder){
    this.patient_form = this.em.group<patientForm>({
      Name: new FormControl(null,Validators.required),
      Age: new FormControl(null,Validators.required),
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Gender : new FormControl(null,[Validators.required]),
      Phone: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      City: new FormControl(null,Validators.required),
      State: new FormControl(null,Validators.required),
      Pin: new FormControl(null,Validators.required),
      UserName: new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),
      
    })}

      

}
