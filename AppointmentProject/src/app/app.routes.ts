import { Routes } from '@angular/router';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {path:'patientSignup',component:PatientSignupComponent},
    {path:'patientLogin',component:PatientLoginComponent},    
    {path:'patientProfile',component:PatientProfileComponent},
    {path:'home',component:LandingComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'}
];
