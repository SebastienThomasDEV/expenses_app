import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";
import Category from "../interface/Category";
import Expense from "../interface/Expense";
import {FormMode} from "../form-mode";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesUrl = "https://127.0.0.1:8000/api/categories"
  token = localStorage.getItem("token")!

  constructor(private http: HttpClient) {

  }

  addCategory(expense: Expense) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.post(this.categoriesUrl, expense, {headers: headers}).pipe(map((data: any) => data))
  }


}
