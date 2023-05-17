import {Component} from '@angular/core';
import {registerForm } from "./registerForm";
import {FormGroup, ReactiveFormsModule} from "@angular/forms"
import User from '../interface/User'
import UserCredentials from '../interface/UserCredentials'
import {RegisterService} from "../register.service"
import {Router} from "@angular/router"
import requestStatus from "../interface/requestStatus"
import {LoginService} from "../login.service";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(protected registerService: RegisterService, protected router: Router, private loginService: LoginService) {}
  form = registerForm
  messageAfterRegister: string = ""

  requestStatus: requestStatus = {
    fetch: false,
    success: false,
    message: ""
  }

  register(): void {
    if (this.form.valid) {
      let user: User = {
        email: this.form.controls["email"].value,
        plainPassword: this.form.controls["password"].value
      }
      try {
        this.registerService.registerInDatabase(user).subscribe(user => {
          // this.requestStatus= {
          //   fetch: true,
          //   success: response.success,
          //   message: response.message
          // }
          let userCredentials: UserCredentials = {
            email: user.email,
            password: this.form.controls["password"].value
          }
          this.loginService.getToken(userCredentials).subscribe(response => {
            localStorage.setItem("token", response.token)
            localStorage.setItem("id", user.id)
            return this.router.navigate(['/dashboard'])
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  }




  clearErrors(): void {
    this.requestStatus.fetch = false;
    this.requestStatus.message = "";
  }


  protected readonly Object = Object;
}
