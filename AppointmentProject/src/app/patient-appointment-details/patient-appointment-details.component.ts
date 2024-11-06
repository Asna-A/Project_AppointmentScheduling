import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';
import { IPatientAppointmentsById } from '../Interfaces/ipatient-appointments-by-id';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-patient-appointment-details',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './patient-appointment-details.component.html',
  styleUrl: './patient-appointment-details.component.scss'
})
export class PatientAppointmentDetailsComponent {

  
  appointmentStatus:string = '';

  list : IPatientAppointmentsById[]=[]
  cancellation: boolean=false;
  cancelled: boolean=false;

  constructor(private AuthenticationServiceService: AuthenticationServiceService,private router:Router){

  }

  ngOnInit(){

    this.AuthenticationServiceService.GetPatinetAppointmentById();
    this.AuthenticationServiceService.PatientAppointmnetsById$.subscribe((list : IPatientAppointmentsById[])=>{
      console.log(list)
      this.list = list.reverse();




    })
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
  isFutureDate(appointmentDate: string): boolean {
    const appointment = new Date(appointmentDate);
    const now = new Date();
    return appointment > now;
  }

 

  // getStatus(status : string) : string{
  //   if(status == "true"){
  //     return "Appointment Not cancelled"
  //   }
  //   else{
  //     return "Appointment Cancelled"
  //   }
  // }

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
    const patientId=localStorage.getItem('patientId');
    this.router.navigate(['/patientProfile',patientId]);
    
  }
  Cancel(AppointmentId : number) : void{

   
    
    this.AuthenticationServiceService.CancelAppoinmentPatient(AppointmentId);

    this.AuthenticationServiceService.CancelAppointmentByPatinet$.subscribe((status: Boolean) => {
      if (status) {

        alert("Cancellation Done");
        const appointment = this.list.find(app => app.id === AppointmentId);
        if(appointment)
        {appointment.status='1'
        }

        // this.cancelled=true;
        // const appointment = this.list.find(app => app.id === AppointmentId);
        
       
      } else {
        alert("Cancellation Failed");
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