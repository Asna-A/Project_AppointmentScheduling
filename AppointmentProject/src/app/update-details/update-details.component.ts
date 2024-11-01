import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IupdateDetails } from '../Interfaces/iupdate-details';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-update-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.scss'
})
export class UpdateDetailsComponent {

  update_form : FormGroup;

  constructor(private em : FormBuilder,private AuthenticationServiceService : AuthenticationServiceService){
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
      } else {
        alert("Update Failed");
      }
    });
  }
 patientId : number = 3

  onSubmit() {
    console.log(this.update_form.value);
    if (this.update_form.valid && this.patientId != null) {
      console.log(this.update_form.value);
      const updateData = { ...this.update_form.value, Id: this.patientId }; 
      console.log("11"+updateData);
      this.AuthenticationServiceService.submitUpdateDetails(updateData);
    }
  }
}


 


