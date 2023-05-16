import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    userData = {
        email: '',
        password: ''
    }
    login() : void {
        console.log(`email: ${this.userData.email} password: ${this.userData.password}`);
    }
}
