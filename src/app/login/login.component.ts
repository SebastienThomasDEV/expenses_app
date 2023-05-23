import { Component } from '@angular/core';
import { LoginService } from "../services/login.service";
import UserCredentials from "../interface/UserCredentials";
import {FormGroup, ReactiveFormsModule} from "@angular/forms"
import {Router} from "@angular/router";
import {loginForm} from "./loginForm";
import {SnackbarService} from "../services/snackbar.service";
import UserData from "../interface/UserData";
import Expense from "../interface/Expense";


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
        const user: UserCredentials = {
            email: this.form.controls["email"].value,
            password: this.form.controls["password"].value,
            plainPassword: ""
        }
        this.loginService.getToken(user).subscribe(response => {
            const userData: UserData = {
                token: response.token,
                id: response.user.id,
            }
            localStorage.setItem("token", response.token)
            localStorage.setItem("id", response.user.id)
            this.snackbarService.createSnackbar("success", "Connexion réussie", 2000)
            return this.router.navigate(['/dashboard'], {state: {data: userData}})
        })
    }

    protected readonly loginForm = loginForm;
}
