import { StickyDirection } from "@angular/cdk/table";

export interface IPatientAppointmentsById {
    id : string
    doctorName : string;
    doctorSpecialization : Array<string>;
    appointmentDate : string;
    slotTime : string;
    status : string;
}
