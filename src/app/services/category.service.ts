import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";
import Category from "../interface/Category";
import {ExpenseResponse} from "../interface/ExpenseResponse";
import {FormMode} from "../form-mode";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesUrl = "https://127.0.0.1:8000/api/categories"
  token = localStorage.getItem("token")!

  constructor(private http: HttpClient) {

  }

  getCategories(user_id:string) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.get(`${this.categoriesUrl}?user=${user_id}`, {headers: headers}).pipe(map((data: any) => data))
  }


  addCategory(category: Category) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.post(this.categoriesUrl, category, {headers: headers}).pipe(map((data: any) => data))
  }
  deleteCategory(category: Category) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.delete(this.categoriesUrl + `/${category.id}`, {headers: headers}).pipe(map((data: any) => data))
  }
  updateCategory(category: Category) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.patch(this.categoriesUrl + `/${category.id}`, category, {headers: headers}).pipe(map((data: any) => data))
  }



}
