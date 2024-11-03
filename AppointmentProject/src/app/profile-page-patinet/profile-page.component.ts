import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
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

  constructor(private router:Router,private AuthenticationServiceService:AuthenticationServiceService) {
    
    
  }

  ngOnInit() {
    this.AuthenticationServiceService.getPatientDetails();
    this.AuthenticationServiceService.getPatientDetailsStatus$.subscribe(
      (response: any) => {
        if (response) {
          this.status=true;
          this.patientDetails=response;  
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
