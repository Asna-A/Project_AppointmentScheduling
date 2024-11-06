import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Ispecialization } from '../Interfaces/ispecialization';
import { FormsModule } from '@angular/forms';
import { DoctorFilterPipe } from "../Pipes/doctor-filter.pipe";

interface doctors {
  name: string;
  registrationId: string;
  experience: string;
  doctorId: string;
}
@Component({
  selector: 'app-specializations',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorFilterPipe],
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss'
})
export class SpecializationsComponent {
  cardcount: number=0;
  dermcount:number=0;
  DoctorCount:number=0;
  showDoctorCount:boolean=false;
  specializationId:number|null=null;
  specializationId2:number|null = null;
  DoctorId:string|null=null;
  doctors: doctors[]=[];
  doctorslist : doctors[]=[];
  specializations:Ispecialization[]=[]
  showDoctors: boolean=false;
  setDoctors : boolean=true;
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
      this.showDoctors=!this.showDoctors;
      this.setDoctors = !this.setDoctors;
      this.doctors=doctors;
    });

    this.AuthenticationServiceService.searchDoctor$.subscribe((doctors:doctors[])=>{

      this.doctorslist=doctors;
    });
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

  getDoctors(specializationId: number)
  {
    this.specializationId2 = specializationId;
    this.AuthenticationServiceService.getDoctors(this.specializationId2);
  }

  bookAppointment(DoctorId:string)
  {
    this.DoctorId=DoctorId;
    this.router.navigate(['/bookAppointment', this.DoctorId]);
  }
  goToProfile()
  {
    const patientId=localStorage.getItem('patientId');
    this.router.navigate(['/patientProfile',patientId]);
    
  }
}
