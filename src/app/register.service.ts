import {Injectable} from '@angular/core';
import User from "./interface/User";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl: string = "https://127.0.0.1:8000/api/users";
  constructor(private http: HttpClient) {}

  registerInDatabase(user: User) : Observable<any> {
    return this.http.post(this.registerUrl, user).pipe(map((data: any) => data))
  }
}
