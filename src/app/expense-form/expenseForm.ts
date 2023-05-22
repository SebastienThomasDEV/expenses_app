import {FormControl, FormGroup, Validator, Validators, FormBuilder} from "@angular/forms";
export const expenseForm: FormGroup = new FormGroup( {
    date: new FormControl("",  Validators.required),
    category: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    amount: new FormControl("", Validators.required),
})
