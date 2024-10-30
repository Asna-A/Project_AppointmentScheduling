import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';

interface IDoctorDetails {
    
  id : number;
  Name : string;
  Experience : number;  
}

@Component({
  selector: 'app-doctor-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-information.component.html',
  styleUrl: './doctor-information.component.scss'
})
export class DoctorInformationComponent {
  drlist : Array<IDoctorDetails> =[];

constructor(private AuthenticationServiceService: AuthenticationServiceService  ){}


ngOnInit() {
  this.AuthenticationServiceService.getDoctorDetails();
  this.AuthenticationServiceService.Doctordetails$.subscribe((doctorlist: Array<IDoctorDetails>) => {
    console.log(doctorlist);
    this.drlist=doctorlist;
    console.log(this.drlist);
  });
}
}
