import { FormControl } from "@angular/forms";

export interface IupdateDetails {

    PatientName : FormControl<string|null>;
    phone : FormControl<string|null>;
    Email : FormControl<string|null>;
    City : FormControl<string|null>;
    State : FormControl<string|null>;
    Pin : FormControl<string|null>
}
