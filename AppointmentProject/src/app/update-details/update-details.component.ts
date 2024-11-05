import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IupdateDetails } from '../Interfaces/iupdate-details';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.scss'
})
export class UpdateDetailsComponent {

  update_form : FormGroup;
  patientDetails : any;

  constructor(private em : FormBuilder,private AuthenticationServiceService : AuthenticationServiceService,private router:Router){
    this.update_form = this.em.group<IupdateDetails>({
      PatientName : new FormControl(null,Validators.required),
      phone : new FormControl(null,Validators.required),
      Email : new FormControl(null,Validators.required),
      City: new FormControl(null,Validators.required),
      State : new FormControl(null,Validators.required),
      Pin :  new FormControl(null,Validators.required)
    })
  }
  
  ngOnInit() {
    this.AuthenticationServiceService.UpdateDetails$.subscribe((status: Boolean) => {
      if (status) {
        alert("update Done");
        this.router.navigate(['/patientProfile']);
      } else {
        alert("Update Failed");
      }
    });

    this.AuthenticationServiceService.getPatientDetails()

    this.AuthenticationServiceService.getPatientDetailsStatus$.subscribe(
      (response: any) => {
        if (response) {
          this.patientDetails=response;
          this.update_form.patchValue({
            PatientName: this.patientDetails.patientName,
            phone: this.patientDetails.phone,
            Email: this.patientDetails.email,
            City: this.patientDetails.city,
            State: this.patientDetails.state,
            Pin: this.patientDetails.pin
          });
        } else {
          alert("error!Cant fetch Details");
        }
      }
    );
  }


  onSubmit() {
    console.log(this.update_form.value);
      this.AuthenticationServiceService.submitUpdateDetails(this.update_form.value);
    }
    goToProfile()
  {
    const patientId=localStorage.getItem('patientId');
    this.router.navigate(['/patientProfile',patientId]);
    
  }
  
}


 


