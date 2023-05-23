import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";
import Expense from "../interface/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  token = localStorage.getItem("token")
  id = localStorage.getItem("id")
  expenseUrl = "https://127.0.0.1:8000/api/expenses"
  headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
  constructor(private http: HttpClient) {

  }

  addExpense(expense: Expense) : Observable<any> {
    return this.http.post(this.expenseUrl, expense, {headers: this.headers}).pipe(map((data: any) => data))
  }


}
