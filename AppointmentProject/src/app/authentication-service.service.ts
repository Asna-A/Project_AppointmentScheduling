import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { IPatientAppointmentsById } from './Interfaces/ipatient-appointments-by-id';
import { IupdateDetails } from './Interfaces/iupdate-details';


interface GetCountDTO {
  count: number;
}
interface IDoctorDetails {
    
  id : number;
  Name : string;
  Experience : number;  
}

interface IPatientDetails{

}


@Injectable({
  providedIn: 'root'

})
export class AuthenticationServiceService {

  private SignUpStatus=new Subject<Boolean>();
  SignUpStatus$=this.SignUpStatus.asObservable();

  private LoginStatus=new Subject<Boolean>();
  LoginStatus$=this.LoginStatus.asObservable();

  private doctorLoginStatus=new Subject<Boolean>();
  doctorLoginStatus$=this.doctorLoginStatus.asObservable();

  private DoctorCount=new Subject<number>();
  DoctorCount$=this.DoctorCount.asObservable();

  private Doctordetails = new Subject<Array<IDoctorDetails>>();
  public Doctordetails$ = this.Doctordetails.asObservable();



  private doctorsDetails=new Subject<any[]>();
  public doctorsDetails$=this.doctorsDetails.asObservable();


  private UpdateDetails = new Subject<boolean>();
  public UpdateDetails$ = this.UpdateDetails.asObservable();

  private PatientAppointmnetsById = new Subject<IPatientAppointmentsById[]>();
  public PatientAppointmnetsById$ = this.PatientAppointmnetsById.asObservable();

  private CancelAppointmentByPatinet = new Subject<boolean>();
  public CancelAppointmentByPatinet$ = this.CancelAppointmentByPatinet.asObservable();

  private getPatientDetailsStatus = new Subject<IPatientDetails>();
  public getPatientDetailsStatus$ = this.getPatientDetailsStatus.asObservable();

  private getDoctorProfileStatus = new Subject<any>();
  public getDoctorProfileStatus$ = this.getDoctorProfileStatus.asObservable();

  private bookAppointmentStatus=new Subject<boolean>();
  public bookAppointmentStatus$=this.bookAppointmentStatus.asObservable();


  private AppointmentDetailsByDoctor=new Subject<any>();
  public AppointmentDetailsByDoctor$=this.AppointmentDetailsByDoctor.asObservable()

  constructor(private http:HttpClient) {}

   submitSignup(data: any): any{
     this.http.post("http://localhost:5218/api/SignUp", data).subscribe(
      {
      next:(response)=>{this.SignUpStatus.next(true);},
      error:(error)=>{this.SignUpStatus.next(false);}
 
      }
    );
  }


  submitLogin(data:any):any{
    this.http.post("http://localhost:5218/api/Login", data).subscribe(
      {
      next:(response:any)=>{
        console.log(response)
        if(response && response.patientId){
        localStorage.setItem('patientId', response.patientId);
        
        this.LoginStatus.next(true);}
        else {
          this.LoginStatus.next(false);
        }},
      error:(error)=>{this.LoginStatus.next(false);}
 
      }
    );

  }



  doctorLogin(data:any):any{
    this.http.post("http://localhost:5218/api/doctorLogin", data).subscribe(
      {
      next:(response:any)=>{
        console.log(response)
        if(response && response.doctorId){
        localStorage.setItem('doctorId', response.doctorId);
        this.doctorLoginStatus.next(true);}
        else {
          this.doctorLoginStatus.next(false);
        }},
      error:(error)=>{this.doctorLoginStatus.next(false);}
 
      }
    );

  }

  getPatientDetails():any{
    console.log("hai")
    const patientId = localStorage.getItem('patientId');
    console.log(patientId)
    if(patientId)
    {
      
      this.http.get(`http://localhost:5218/api/getPatientDetails/${patientId}`).subscribe(
        {
        next:(response:any)=>{
          this.getPatientDetailsStatus.next(response);
         
        },
          
        error:(error)=>{this.LoginStatus.next(error);
         
        }

        }
      );
    }
  }

  getDoctorDetailProfile():any{
    const doctorId = localStorage.getItem('doctorId');
    if(doctorId)
    {
     
      this.http.get(`http://localhost:5218/api/getDoctorProfile/${doctorId}`).subscribe(
        {
        next:(response:any)=>{
          console.log("hai")
          this.getDoctorProfileStatus.next(response);},
        error:(error)=>{this.getDoctorProfileStatus.next(error);}
        }
      );
    }
  }

  doctors: any[] = [];
  viewDoctors(specializationId:number):any{

    this.http.get(`http://localhost:5218/api/GetDoctorBySpec/${specializationId}/specialization/`)
      .subscribe({
        next: (response: any) => {
          this.doctorsDetails.next(response);
          console.log(response)

        },
        error: (error) => {
          console.error("Error fetching doctors:", error);
        }
      });
  }
  


  CountDoctor(specializationId:number):any{
    
    this.http.get<GetCountDTO>(`http://localhost:5218/api/countdoctor/${specializationId}/doctor-count`).subscribe(
      {
      next:(response:GetCountDTO)=>{
        console.log(`Received doctor count: ${response.count}`);
        this.DoctorCount.next(response.count);},
     
      error:(error)=>{
        console.error('Error fetching doctor count:', error); 
        this.DoctorCount.next(0);}
 
      }
    );
  }
  
  getDoctorDetails(): void {
    this.http.get<Array<IDoctorDetails>>("http://localhost:5218/api/GetAllDoctors").subscribe(
      {
        next:(response :Array<IDoctorDetails> ) => {
          this.Doctordetails.next(response); 
          console.log(`direct ${response}`)
        },
        error:(error) => {
          console.error("Error fetching doctor details:", error); 
        }
      }
      
    );
  }

  bookAppoinment(data:any):void{
    
    this.http.post("http://localhost:5218/api/CheckSlot", data).subscribe(
      {
        next:(response:any) => {
          if(response)
          {
            this.http.post("http://localhost:5218/api/BookDoctor", data).subscribe(
              {
                next:(response:any) => {
                  alert("booking success")
                  this.bookAppointmentStatus.next(true);
                  
                },
                error:(error) => {
                  console.error("Error fetching doctor details:", error); 
                  console.log(error)
                  alert("booking failed");
                }
              }
            );
          }
          else{
            alert("select other Slot");
          }
          
        },
        error:(error) => {
          console.error("Error fetching doctor details:", error); 
          console.log(error)
          alert("booking failed");
      }
    }
    );  
  } 



  GetDoctorAppointmentById():any{
    const id=localStorage.getItem('doctorId')
    
  this.http.get(`https://localhost:7076/api/getAppointmentDetailsByDoctor/${id}`).subscribe(
    {
    
      next:(Response : any)=>{
        this.AppointmentDetailsByDoctor.next(Response);
        console.log(Response)
      },
        error:(error) =>{
          console.log(error)
          this.AppointmentDetailsByDoctor.next(error);}
      });
    }
  

    // username : any 

    // submitSignup(data:any):any{
    //   console.log("hiiiii")
    //   console.log(data.UserName)
    //   this.username = String(data.UserName)
    //   console.log(this.username)
    //   const model = { userName: this.username };
    //   this.http.post("https://localhost:7076/api/CheckUserNameAvailable", model).subscribe(
    //     {
    //       next:(Response:any)=>{
    //         if(Response)
    //         {
    //           console.log(Response)
    //           this.http.post("http://localhost:5218/api/SignUp", data).subscribe(
    //             {
    //             next:(response)=>{this.SignUpStatus.next(true);},
    //             error:(error)=>{this.SignUpStatus.next(false);}
           
    //             }
    //           );
    //         }
    //       },
    //       error:(Error : any)=>{
    //         debugger;
    //         alert("UserName Already Exist")
    //       }
    //     }
    //   )
  
    // }




  submitUpdateDetails(updateData: IupdateDetails & { Id: number }): void{
    this.http.patch(`http://localhost:5218/api/UpdateDetails/${updateData.Id}`,updateData).subscribe(
     {
     next:(response)=>{
      console.log(response)
      this.UpdateDetails.next(true);},
     error:(error)=>{this.UpdateDetails.next(false);}

     }
   );
 }



GetPatinetAppointmentById() : any{

  const id=localStorage.getItem('patientId')
  this.http.get(`https://localhost:7076/api/GetAllAppointmentsById/${id}`).subscribe(
    {
    
      next:(Response : any)=>{
        this.PatientAppointmnetsById.next(Response);
        console.log(Response)
      },
        error:(error) =>{
          console.log(error)
          this.PatientAppointmnetsById.next(error);}
      });
    }









    GetAppointmentDetailsByDoctor(id : number) : any{
      this.http.get(`https://localhost:7076/api/GetAppointmentDetailsByDoctor/${id}`).subscribe(
        {
          next:(response:any)=>{
            this.AppointmentDetailsByDoctor.next(Response);},
            error:(error) =>{this.AppointmentDetailsByDoctor.next(error);}
          });
        }
    






    CancelAppoinmentPatient(id :number): void{
      this.http.patch(`https://localhost:7076/api/CancelAppointmentByPatient`,{id}).subscribe(
       {
       next:(response)=>{
        this.CancelAppointmentByPatinet.next(true);},
       error:(error)=>{this.CancelAppointmentByPatinet.next(false);}
  
       }
     );
   }

}
  

