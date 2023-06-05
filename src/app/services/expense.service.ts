import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map} from "rxjs";
import {ExpenseRequest, ExpenseResponse} from "../interface/ExpenseResponse";

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenseUrl = "https://127.0.0.1:8000/api/expenses"
  token = localStorage.getItem("token")!
  constructor(private http: HttpClient) {

  }

  addExpense(expense: ExpenseRequest) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.post(this.expenseUrl, expense, {headers: headers}).pipe(map((data: any) => data))
  }

  getExpenses(user_id:string) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.get(`${this.expenseUrl}?userEntity=${user_id}`, {headers: headers}).pipe(map((data: any) => data))
  }

  deleteExpense(expense: ExpenseResponse) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.delete(`${this.expenseUrl}/${expense.id}`, {headers: headers}).pipe(map((data: any) => data))
  }

  updateExpense(updatedExpense: ExpenseRequest, expenseId: number ) : Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`).set("Content-Type", "application/merge-patch+json")
    return this.http.patch(`${this.expenseUrl}/${expenseId}`, updatedExpense, {headers: headers}).pipe(map((data: any) => data))
  }



}
