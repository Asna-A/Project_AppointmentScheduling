import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientSignupComponent } from "./patient-signup/patient-signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,PatientSignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AppointmentProject';
}
