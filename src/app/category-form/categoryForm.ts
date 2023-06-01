import {FormControl, FormGroup, Validators} from "@angular/forms";

export const categoryForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required]),
})
