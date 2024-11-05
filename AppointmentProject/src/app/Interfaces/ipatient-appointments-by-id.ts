import { StickyDirection } from "@angular/cdk/table";

export interface IPatientAppointmentsById {
    id : number
    doctorName : string;
    doctorSpecialization : Array<string>;
    appointmentDate : string;
    slotTime : string;
    status : boolean;
}
