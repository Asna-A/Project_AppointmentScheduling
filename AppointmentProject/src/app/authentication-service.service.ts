import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { IDoctorDetails } from './Interfaces/idoctor-details';



@Injectable({
  providedIn: 'root'

})
export class AuthenticationServiceService {

  private SignUpStatus=new Subject<Boolean>();
  SignUpStatus$=this.SignUpStatus.asObservable();

  private Doctordetails = new Subject<Array<IDoctorDetails>>();
  public Doctordetails$ = this.Doctordetails.asObservable();

  constructor(private http:HttpClient) {

   }

   submitSignup(data: any): any{
     this.http.post("http://localhost:5218/api/SignUp", data).subscribe(
      {
      next:(response)=>{this.SignUpStatus.next(true);},
      error:(error)=>{this.SignUpStatus.next(false);}
 
      }
    );
  }

  getDoctorDetails(): void {
    this.http.get<Array<IDoctorDetails>>("http://localhost:5218/api/GetAllDoctors").subscribe(
      {
        next:(response :Array<IDoctorDetails> ) => {
          this.Doctordetails.next(response); // Emit the doctor details to the subject
          console.log(`direct ${response}`)
        },
        error:(error) => {
          console.error("Error fetching doctor details:", error); // Handle errors if needed
        }
      }
      
    );
  }

  
}
  

