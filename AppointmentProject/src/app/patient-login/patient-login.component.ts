import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
interface patientLogin
 {
  UserName :FormControl<string|null>;
  Password: FormControl<string|null>;
 }
@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})
export class PatientLoginComponent {

  constructor(private em : FormBuilder,private AuthenticationServiceService:AuthenticationServiceService,private router: Router){
    this.patient_login = this.em.group<patientLogin>({
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
      if(this.patient_login.valid)
      {
        this.AuthenticationServiceService.submitLogin(this.patient_login.value);
      }
    }


}
