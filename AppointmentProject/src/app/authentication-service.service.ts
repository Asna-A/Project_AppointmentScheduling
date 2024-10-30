import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http:HttpClient) {

   }
   submitSignup(data:any):void{
    this.http.post("http://localhost:5218/api/SignUp",data).subscribe(
      ()=>
    )
   }
  
}
