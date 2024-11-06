import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule, PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './profile-page-doctor.component.html',
  styleUrl: './profile-page-doctor.component.scss'
})
export class doctorProfilePageComponent {
  doctorDetails: any;
  status:boolean=false;

  constructor(private router:Router,private AuthenticationServiceService:AuthenticationServiceService,private PlatformLocation : PlatformLocation) {
    
      history.pushState(null, '', location.href);
  
      this.PlatformLocation.onPopState(() => {
        history.pushState(null, '', location.href);
      });
  
    
  }

  ngOnInit() {
    this.AuthenticationServiceService.getDoctorDetailProfile();
    this.AuthenticationServiceService.getDoctorProfileStatus$.subscribe(
      (response: any) => {
        if (response) {
          this.status=true;
          this.doctorDetails=response;  
        } else {
          alert("error!Cant fetch Details");
        }
      }
    );
   
  }

  

  goToSpecializations() {
    this.router.navigate(['/specializations']);
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
