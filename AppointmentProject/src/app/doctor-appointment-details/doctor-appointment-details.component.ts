import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IdoctorAppointmentDetails } from '../Interfaces/idoctor-appointment-details';

@Component({
  selector: 'app-doctor-appointment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-appointment-details.component.html',
  styleUrl: './doctor-appointment-details.component.scss'
})
export class DoctorAppointmentDetailsComponent {
  constructor(private AuthenticationServiceService: AuthenticationServiceService,private router:Router){

  }
  appointmentDetails:IdoctorAppointmentDetails[]=[];
  status:boolean=false;
  

  ngOnInit()
  {
    this.AuthenticationServiceService.GetDoctorAppointmentById();
    this.AuthenticationServiceService.AppointmentDetailsByDoctor$.subscribe(
      (response:any)=>{
        this.status=true;
        this.appointmentDetails=response.reverse();
      }
    );

  }

  isFutureDate(appointmentDate: string): boolean {
    const appointment = new Date(appointmentDate);
    const now = new Date();
    return appointment > now;
  }

  getStatus(status : string) : string{
    if(status == 'true'){
      return "Appointment Not cancelled"
    }
    else{
      return "Appointment Cancelled"
    }
  }

  getSlotTime(slot: string): string {
    const dict: { [key: string]: string } = {
      1: '9:30 AM - 10:00 AM',
      2: '10:00 AM - 10:30 AM',
      3: '10:30 AM - 11:00 AM',
      4: '11:00 AM - 11:30 AM',
      5: '4:00 PM - 4:30 PM',
      6: '4:30 PM - 5:00 PM',
      7: '5:00 PM - 5:30 PM',
      8: '5:30 PM - 6:00 PM',
      9: '6:00 PM - 6:30 PM'
    };
  
    return dict[slot] ;
  }



  slotStatus:boolean=false;
  SlotTimeCheck(slot:string):boolean{
    if(slot!="0")
    {
      return true;
    }
    else{
      return false;
    }
  }


  goToProfile()
  {
    
    const doctorId=localStorage.getItem('doctorId');
    this.router.navigate(['/doctorProfile',doctorId]);
    
  }
  Cancel(AppointmentId : number) : void{


    this.AuthenticationServiceService.CancelAppoinmentPatient(AppointmentId);

    this.AuthenticationServiceService.CancelAppointmentByPatinet$.subscribe((status: Boolean) => {
      if (status) {
        alert("Cancellation Done");
        const appointment = this.appointmentDetails.find(app => app.id === AppointmentId);
        if(appointment)
        {appointment.status='1'
        }
        
      } else {
        alert("Cancellation Failed");
      }
    });



  }



  updateConsultation(AppointmentId : number):void{

    this.AuthenticationServiceService.updateConsultation(AppointmentId);

    this.AuthenticationServiceService.updateConsult$.subscribe((status: boolean) => {
      if (status) {
        alert("Marked as consulted"); 
        const appointment = this.appointmentDetails.find(app => app.id === AppointmentId);
        if(appointment)
        {appointment.status='2'
        }
      } 
      else {
        alert("Consultation marking failed");
      }  
    });

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
