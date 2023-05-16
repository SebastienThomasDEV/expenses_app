import {Component} from '@angular/core';
import {registerForm } from "./registerForm";
import {FormGroup, ReactiveFormsModule} from "@angular/forms"
import User from '../interface/User'
import {RegisterService} from "../register.service"


interface formStatus {
  isValid: boolean
  isChecked: boolean,
  errors: {
    email: string
    password: string
    passwordConfirm: string
  }
}

interface requestStatus {
  fetch: boolean
  success: boolean
  message: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(protected registerService: RegisterService) {}
  form = registerForm
  messageAfterRegister: string = ""
  formStatus: formStatus = {
    isValid: false,
    isChecked: false,
    errors: {
      email: "",
      password: "",
      passwordConfirm:""
    }
  }

  requestStatus: requestStatus = {
    fetch: false,
    success: false,
    message: ""
  }

  register(): void {
    this.checkForm(this.form)
    if (this.formStatus.isValid) {
      let user: User = {
        email: this.form.controls["email"].value,
        password: this.form.controls["password"].value
      }
      try {
        this.registerService.registerInDatabase(user).subscribe(response => {
          this.requestStatus= {
            fetch: true,
            success: response.success,
            message: response.message
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }


  checkForm(form : FormGroup): void {
   if (form.controls["email"].errors) {
     this.formStatus.errors.email = "l'email n'est pas valide"
     this.formStatus.isValid = false
   }
   if (form.controls["password"].errors) {
     this.formStatus.errors.password = "le mot de passe doit faire plus de 6 caractères"
     this.formStatus.isValid = false
   }
   if (form.controls["password"].value !== this.form.controls["passwordConfirm"].value) {
     this.formStatus.errors.passwordConfirm = "le mot de passe doit être identique"
     this.formStatus.isValid = false
   }
   this.formStatus.isChecked = true;
   if (form.valid) {
     this.formStatus.isValid = true
   }
  }


  clearErrors(): void {
    this.formStatus.isChecked = false;
    this.formStatus.errors.email = "";
    this.formStatus.errors.password = "";
    this.formStatus.errors.passwordConfirm = "";
    this.requestStatus.fetch = false;
    this.requestStatus.message = "";
  }


  protected readonly Object = Object;
}
