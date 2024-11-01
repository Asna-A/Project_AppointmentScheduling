import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';

interface doctorLogin
 {
  UserName :FormControl<string|null>;
  Password: FormControl<string|null>;
 }


@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.scss'
})
export class DoctorLoginComponent {
  doctor_login: FormGroup<doctorLogin>;

  constructor(private em : FormBuilder,private AuthenticationServiceService:AuthenticationServiceService,private router: Router){
    this.doctor_login = this.em.group<doctorLogin>({
      UserName: new FormControl(null,Validators.required),
      Password: new FormControl(null,Validators.required),

})}


ngOnInit() {
  this.AuthenticationServiceService.LoginStatus$.subscribe((status: Boolean) => {
    if (status) {
      alert("Login success");
      this.router.navigate(['/patient-profile']);
    } else {
      alert("Login failed");
    }
  });
}

onSubmit()
    {
      if(this.doctor_login.valid)
      {
        this.AuthenticationServiceService.submitLogin(this.doctor_login.value);
      }
    }


}
