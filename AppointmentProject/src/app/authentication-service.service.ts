import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';


interface GetCountDTO {
  count: number;
}
interface IDoctorDetails {
    
  id : number;
  Name : string;
  Experience : number;  
}
@Injectable({
  providedIn: 'root'

})
export class AuthenticationServiceService {

  private SignUpStatus=new Subject<Boolean>();
  SignUpStatus$=this.SignUpStatus.asObservable();

  private LoginStatus=new Subject<Boolean>();
  LoginStatus$=this.LoginStatus.asObservable();



  private DoctorCount=new Subject<number>();
  DoctorCount$=this.DoctorCount.asObservable();

  private Doctordetails = new Subject<Array<IDoctorDetails>>();
  public Doctordetails$ = this.Doctordetails.asObservable();



  private doctorsDetails=new Subject<any[]>();
  public doctorsDetails$=this.doctorsDetails.asObservable();


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
    this.http.post<{patientId:string}>("http://localhost:5218/api/Login", data).subscribe(
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
    console.log("booook")
    this.http.post("http://localhost:5218/api/BookDoctor", data).subscribe(
      {
        next:(response:any) => {
          alert("booking success")
        },
        error:(error) => {
          console.error("Error fetching doctor details:", error); 
          console.log(error)
          alert("booking failed");
        }
      }
      
    );
  } 
}
  

