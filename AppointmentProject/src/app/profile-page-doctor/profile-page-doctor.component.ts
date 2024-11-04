import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
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

  constructor(private router:Router,private AuthenticationServiceService:AuthenticationServiceService) {
    
    
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
}
