import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface doctors {
  name: string;
  registrationId: string;
  experience: string;
  doctorId: string;
}
@Component({
  selector: 'app-specializations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss'
})
export class SpecializationsComponent {
  cardcount: number=0;
  dermcount:number=0;
  showDermCount:boolean=false;
  showCardCount:boolean=false;
  specializationId:number|null=null;
  DoctorId:string|null=null;
  doctors: doctors[]=[];
  constructor(private AuthenticationServiceService:AuthenticationServiceService,private router:Router) {  
  }

  
  ngOnInit() {
    this.AuthenticationServiceService.DoctorCount$.subscribe((count:number) => {
      if (this.specializationId == 1) {
        this.showDermCount=true;
        this.dermcount = count;
      } else if (this.specializationId == 3) {
        this.showCardCount=true;
        this.cardcount = count;
      }
    });

    this.AuthenticationServiceService.doctorsDetails$.subscribe((doctors:doctors[])=>{
      this.doctors=doctors;
    })
  }
  
  onSubmit(specializationId: number)
  {
    this.specializationId = specializationId;
    this.AuthenticationServiceService.CountDoctor(specializationId);
  }

  viewDoctors(specializationId: number)
  {
    this.specializationId = specializationId;
    this.AuthenticationServiceService.viewDoctors(specializationId);
  }

  bookAppointment(DoctorId:string)
  {
    this.DoctorId=DoctorId;
    this.router.navigate(['/book-appointment', this.DoctorId]);

  }
  
}
