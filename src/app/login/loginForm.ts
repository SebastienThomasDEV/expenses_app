import {FormControl, FormGroup, Validators} from "@angular/forms";

export const loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
})
