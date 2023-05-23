import {Component} from '@angular/core';
import {registerForm } from "./registerForm";
import {FormGroup, ReactiveFormsModule} from "@angular/forms"
import UserCredentials from '../interface/UserCredentials'
import {RegisterService} from "../services/register.service"
import {Router} from "@angular/router"
import {LoginService} from "../services/login.service";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(protected registerService: RegisterService, protected router: Router, private loginService: LoginService) {}
  form = registerForm
  messageAfterRegister: string = ""



  register(): void {
    if (this.form.valid) {
      let user: UserCredentials = {
        email: this.form.controls["email"].value,
        plainPassword: this.form.controls["password"].value,
      }
      try {
        this.registerService.registerInDatabase(user).subscribe(response => {
          user.password = response.password
          this.loginService.getToken(user).subscribe(response => {
            localStorage.setItem("token", response.token)
            localStorage.setItem("id", response.id)
            localStorage.setItem("email", response.email)
            return this.router.navigate(['/dashboard'])
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  }




  protected readonly Object = Object;
    protected readonly registerForm = registerForm;
}
