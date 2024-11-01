import { Routes } from '@angular/router';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { LandingComponent } from './landing/landing.component';
import { ProfilePageComponent } from './profile-page-patinet/profile-page.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { CalenderComponent } from './calender/calender.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { PatientAppointmentDetailsComponent } from './patient-appointment-details/patient-appointment-details.component';


export const routes: Routes = [
    {path:'patientSignup',component:PatientSignupComponent},
    {path:'patientLogin',component:PatientLoginComponent},    
    {path:'patientProfile',component:ProfilePageComponent},
    {path:'home',component:LandingComponent},
    {path:'patient-profile',component:ProfilePageComponent},
    {path:'specializations',component:SpecializationsComponent},
    {path:'book-appointment',component:CalenderComponent},
    {path:'doctorDetails',component:DoctorInformationComponent},
    {path: 'editprofile',component:UpdateDetailsComponent},
    {path: 'Appointment-Detail-of-patinetById',component:PatientAppointmentDetailsComponent},
    {path:'book-appointment/:doctorId',component:CalenderComponent},

    {path:'',redirectTo:'/home',pathMatch:'full'}
    

];
