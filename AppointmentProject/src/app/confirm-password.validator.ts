import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('Password')?.value;
    const confirmPassword = control.get('ConfirmPassword')?.value;
  
    return password === confirmPassword ? null : { PasswordNoMatch: true };
  };