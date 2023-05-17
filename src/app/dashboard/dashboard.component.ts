import { Component } from '@angular/core';
import {Router} from "@angular/router";
import UserData from "../interface/UserData";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    user: UserData = {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        id: localStorage.getItem("id"),
    }
    constructor(private router: Router) {
    }

    logout() : Promise<Boolean>   {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("email")
        return this.router.navigate(['/login'])
    }

}
