import { Routes } from '@angular/router';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { LandingComponent } from './landing/landing.component';
import { ProfilePageComponent } from './profile-page-patinet/profile-page.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { CalenderComponent } from './calender/calender.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { PatientAppointmentDetailsComponent } from './patient-appointment-details/patient-appointment-details.component';
import { doctorProfilePageComponent } from './profile-page-doctor/profile-page-doctor.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorAppointmentDetailsComponent } from './doctor-appointment-details/doctor-appointment-details.component';


export const routes: Routes = [
    {path:'patientSignup',component:PatientSignupComponent},
    {path:'patientLogin',component:PatientLoginComponent}, 
    {path:'doctorLogin',component:DoctorLoginComponent},   
    {path:'patientProfile',component:ProfilePageComponent},
    {path:'patientProfile/:patientId',component:ProfilePageComponent},
    {path:'doctorProfile/:doctorId',component:doctorProfilePageComponent},
    {path:'home',component:LandingComponent},
    {path:'doctorProfile',component:doctorProfilePageComponent},
    {path:'specializations',component:SpecializationsComponent},
    {path: 'editProfile',component:UpdateDetailsComponent},
    {path: 'AppointmentDetailOfPatinetById',component:PatientAppointmentDetailsComponent},
    {path:'bookAppointment/:doctorId',component:CalenderComponent},
    {path:'AppointmentDetailByDoctor',component:DoctorAppointmentDetailsComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'}
    



];
