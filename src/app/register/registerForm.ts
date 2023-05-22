import {FormControl, FormGroup, Validator, Validators, FormBuilder} from "@angular/forms";
import {passwordMatchValidator} from "../validators/passwordMatch";
export const registerForm: FormGroup = new FormGroup({
  email: new FormControl("", [Validators.email, Validators.required]),
  password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  passwordConfirm: new FormControl("", [Validators.required])
}, {
  validators: passwordMatchValidator
})
