import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";
import UserCredentials from "../interface/UserCredentials";



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl: string = "https://127.0.0.1:8000/api/users";
  constructor(private http: HttpClient) {}

  register(user: UserCredentials) : Observable<any> {
    return this.http.post(this.registerUrl, user).pipe(map((data: any) => data))
  }
}
