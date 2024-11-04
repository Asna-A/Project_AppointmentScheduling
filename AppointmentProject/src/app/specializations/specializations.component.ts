import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Ispecialization } from '../Interfaces/ispecialization';

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
  DoctorCount:number=0;
  showDoctorCount:boolean=false;
  specializationId:number|null=null;
  DoctorId:string|null=null;
  doctors: doctors[]=[];
  specializations:Ispecialization[]=[]
  constructor(private AuthenticationServiceService:AuthenticationServiceService,private router:Router) {  
  }

  
  ngOnInit() {
  

    this.AuthenticationServiceService.getAllSpecializations();
    this.AuthenticationServiceService.getSpecializationIdNameStatus$.subscribe((response:Ispecialization[])=>
    {
      if(response)
      {
        this.specializations=response;
      }
      else
      {
        alert("error")
      }
    }

    )

    this.AuthenticationServiceService.DoctorCount$.subscribe((count:number) => {
      
        this.showDoctorCount=!this.showDoctorCount;
        this.DoctorCount = count;
      }
    );

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
    this.router.navigate(['/bookAppointment', this.DoctorId]);
  }
  
}
