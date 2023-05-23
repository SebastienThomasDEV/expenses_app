import { Injectable } from '@angular/core';
import UserCredentials from "../interface/UserCredentials";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  tokenUrl: string = "https://127.0.0.1:8000/auth";

  constructor(private http: HttpClient) { }

  getToken(user: UserCredentials) : Observable<any> {
    return this.http.post(this.tokenUrl, user).pipe(map((data: any) => data))
  }


  getUser() : Observable<any> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this.http.get("https://127.0.0.1:8000/api/users", {headers: headers}).pipe(map((data: any) => data))
  }
}
