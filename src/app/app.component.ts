import {Component} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import UserData from "./interface/UserData";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginService} from "./services/login.service";




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(private router: Router, private jwtHelper: JwtHelperService, private loginService: LoginService) {

    }

    protected readonly Component = Component;
    protected readonly LoginComponent = LoginComponent;

    // TODO: redifine the user interface to match each component that uses it
    user: UserData = {
        email: localStorage.getItem("email") ?? null,
        token: localStorage.getItem("token") ?? null,
        id: localStorage.getItem("id") ?? null,
    }

    autoConnect(token: string | null) {
        return token != null;
    }

    private checkTokenExpired(token: string) {
        return this.jwtHelper.isTokenExpired(this.user.token);
    }

    ngOnInit() {
        if (this.autoConnect(this.user.token)) {
            if (this.checkTokenExpired(this.user.token!)) {
                // TODO : refresh the token
                localStorage.clear()
                this.router.navigate(['/login'])
            } else {
                this.router.navigate(['/dashboard'])
            }
        }
    }
}
