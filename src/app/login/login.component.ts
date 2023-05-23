import { Component } from '@angular/core';
import { LoginService } from "../services/login.service";
import UserCredentials from "../interface/UserCredentials";
import {FormGroup, ReactiveFormsModule} from "@angular/forms"
import {Router} from "@angular/router";
import {loginForm} from "./loginForm";
import {SnackbarService} from "../services/snackbar.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    form = loginForm
    constructor(protected loginService: LoginService, protected router: Router, private snackbarService: SnackbarService) {

    }

    loginProcess(): void {
        let user: UserCredentials = {
            email: this.form.controls["email"].value,
            password: this.form.controls["password"].value,
            plainPassword: ""
        }
        this.loginService.getToken(user).subscribe(response => {
            this.snackbarService.createSnackbar("You are now logged in !", "success")
            localStorage.setItem("token", response.token)
            localStorage.setItem("user", response.user)
            return this.router.navigate(['/dashboard'])
        })
    }

    protected readonly loginForm = loginForm;
}
