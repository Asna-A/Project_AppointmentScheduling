import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { confirmPasswordValidator } from '../confirm-password.validator';
import { AuthenticationServiceService } from '../authentication-service.service';


interface patientForm
 {
  PatientName :FormControl<string|null>;
  Age: FormControl<string|null>;
  Email: FormControl<string|null>;
  Gender : FormControl<string|null>;
  Phone : FormControl<string|null>;
  City :FormControl<string|null>;
  State: FormControl<string|null>;
  Pin : FormControl<string|null>;
  UserName:FormControl<string|null>;
  Password: FormControl<string|null>;
  ConfirmPassword: FormControl<string|null>
  
}


@Component({
  selector: 'app-patient-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './patient-signup.component.html',
  styleUrl: './patient-signup.component.scss',
 
})


export class PatientSignupComponent {

 

  patient_form : FormGroup<patientForm>;
 

  constructor(private em : FormBuilder,private AuthenticationServiceService:AuthenticationServiceService,private router:Router){
    this.patient_form = this.em.group<patientForm>({
      PatientName: new FormControl(null,Validators.required),
      Age: new FormControl(null,Validators.required),
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Gender : new FormControl(null,[Validators.required]),
      Phone: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      City: new FormControl(null,Validators.required),
      State: new FormControl(null,Validators.required),
      Pin: new FormControl(null,Validators.required),
      UserName: new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),
      ConfirmPassword: new FormControl(null,Validators.required),
      
    }, { validators: [confirmPasswordValidator]})}



    ngOnInit() {
      this.AuthenticationServiceService.SignUpStatus$.subscribe((status: Boolean) => {
        if (status) {
          alert("patient added");
          this.router.navigate(['/patientLogin'])
        } else {
          alert("Signup failed");
        }
      });
    }
  

    onSubmit()
    {
      if(this.patient_form.valid)
      {

        const data={
          PatientName: this.patient_form.value,
          Age: this.patient_form.value,
          Email: this.patient_form.value,
          Gender :this.patient_form.value,
          Phone: this.patient_form.value,
          City: this.patient_form.value,
          State:this.patient_form.value,
          Pin: this.patient_form.value,
          UserName: this.patient_form.value,
          Password:this.patient_form.value
         

        }
        this.AuthenticationServiceService.submitSignup(data,this.patient_form.value);
      }
    }


   
}
