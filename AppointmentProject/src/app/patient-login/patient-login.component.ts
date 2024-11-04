import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';

interface patientLogin
 {
  UserName :FormControl<string|null>;
  Password: FormControl<string|null>;
 }
@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})


export class PatientLoginComponent {
  
  patient_login: FormGroup<patientLogin>;

  constructor(private em : FormBuilder,private AuthenticationServiceService:AuthenticationServiceService,private router: Router){
    this.patient_login = this.em.group<patientLogin>({
      UserName: new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),

})}


ngOnInit() {
  this.AuthenticationServiceService.LoginStatus$.subscribe((status: Boolean) => {
    if (status) {
      alert("Login success");
      this.router.navigate(['/patientProfile']);
    } else {
      alert("Login failed");
    }
  });
}

onSubmit()
    {
      if(this.patient_login.valid)
      {
        this.AuthenticationServiceService.submitLogin(this.patient_login.value);
      }
    }


}
