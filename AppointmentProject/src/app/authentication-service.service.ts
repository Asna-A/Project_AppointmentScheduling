import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class AuthenticationServiceService {

  private SignUpStatus=new Subject<Boolean>();
  SignUpStatus$=this.SignUpStatus.asObservable();

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

  
}
  

