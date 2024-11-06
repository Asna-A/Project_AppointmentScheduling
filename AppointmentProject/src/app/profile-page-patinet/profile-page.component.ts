import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule, PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  patientDetails: any;
  status:boolean=false;

  constructor(private router:Router,private AuthenticationServiceService:AuthenticationServiceService,private PlatformLocation : PlatformLocation) {
    this.AuthenticationServiceService.getPatientDetails();

      history.pushState(null, '', location.href);
  
      this.PlatformLocation.onPopState(() => {
        history.pushState(null, '', location.href);
      });
    
  }

  ngOnInit() {
    
    this.AuthenticationServiceService.getPatientDetailsStatus$.subscribe(
      (response: any) => {
        if (response) {

          this.status=true;
          this.patientDetails=response;
          console.log(this.patientDetails)  
        } else {
          alert("error!Cant fetch Details");
        }
      }
    );
    
  }

  logOut(){
    if(localStorage.getItem('patientId'))
    {
      localStorage.setItem('patientId','')
    }
    else{
      localStorage.setItem('doctorId','')
    }
    
      {this.router.navigate(['/home']);}
  }
 
  
 
}
