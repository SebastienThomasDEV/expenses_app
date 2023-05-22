import { Component } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import UserData from "./interface/UserData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private router : Router) {}
  protected readonly Component = Component;
  protected readonly LoginComponent = LoginComponent;
  user: UserData = {
    email: localStorage?.getItem("email"),
    token: localStorage?.getItem("token"),
    id: localStorage?.getItem("id"),
  }

  autoConnect() {
    return this.user.token != null;
  }

  ngOnInit() {
    if (this.autoConnect()) this.router.navigate(['/dashboard'])
  }
}
