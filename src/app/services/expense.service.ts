import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";
import Expense from "../interface/Expense";

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenseUrl = "https://127.0.0.1:8000/api/expenses"
  userUrl = "https://127.0.0.1:8000/api/users"
  constructor(private http: HttpClient) {

  }

  addExpense(expense: Expense, token: string) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this.http.post(this.expenseUrl, expense, {headers: headers}).pipe(map((data: any) => data))
  }

  getExpenses(user_id:string, token: string) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`)
    return this.http.get(`${this.userUrl}/${user_id}`, {headers: headers}).pipe(map((data: any) => data.expenses))
  }


}
