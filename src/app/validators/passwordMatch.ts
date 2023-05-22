import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl):
    ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
    return password?.value !== passwordConfirm?.value ? { isNotMatching:{value: true } } : null;
};

