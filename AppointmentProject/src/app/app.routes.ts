import { Routes } from '@angular/router';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { LandingComponent } from './landing/landing.component';
import { ProfilePageComponent } from './profile-page-patinet/profile-page.component';
import { DoctorInformationComponent } from './doctor-information/doctor-information.component';

export const routes: Routes = [
    {path:'patientSignup',component:PatientSignupComponent},
    {path:'patientLogin',component:PatientLoginComponent},    
    {path:'patientProfile',component:PatientProfileComponent},
    {path:'home',component:LandingComponent},
    {path:'patient-profile',component:ProfilePageComponent},
    {path:'doctor-information',component:DoctorInformationComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'}
];
 