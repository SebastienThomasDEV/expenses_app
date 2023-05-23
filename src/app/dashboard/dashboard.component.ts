import { Component } from '@angular/core';
import {Router} from "@angular/router";
import UserData from "../interface/UserData";
import Expense from "../interface/Expense";
import {ExpenseService} from "../services/expense.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    user: UserData = {
        token:history.state.data?.token || localStorage.getItem("token"),
        id: history.state.data?.id || localStorage.getItem("id"),
    }

    expenses: Expense[] = []
    constructor(private router: Router, private expenseService: ExpenseService) {}

    ngOnInit() {
        if (!this.user.token) {
            this.router.navigate(['/login'])
        }
    }
    logout() : Promise<Boolean>   {
        localStorage.clear()
        return this.router.navigate(['/login'])
    }

    getExpenses() {

    }

}
