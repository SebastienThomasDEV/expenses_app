import { Component } from '@angular/core';
import { LoginService } from "../login.service";
import UserCredentials from "../interface/UserCredentials";
import {FormGroup, ReactiveFormsModule} from "@angular/forms"
import {Router} from "@angular/router";
import {loginForm} from "./loginForm";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    form = loginForm
    constructor(protected loginService: LoginService, protected router: Router) {

    }

    loginProcess(): void {
        let user: UserCredentials = {
            email: this.form.controls["email"].value,
            password: this.form.controls["password"].value
        }
        this.loginService.getToken(user).subscribe(response => {
            localStorage.setItem("token", response.token)
            localStorage.setItem("email", response.email)
            localStorage.setItem("id", response.id)
            return this.router.navigate(['/dashboard'])
        })
    }

    protected readonly loginForm = loginForm;
}
