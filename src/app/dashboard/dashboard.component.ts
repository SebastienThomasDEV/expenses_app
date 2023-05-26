import { Component } from '@angular/core';
import {Router} from "@angular/router";
import UserData from "../interface/UserData";
import Expense from "../interface/Expense";
import {ExpenseService} from "../services/expense.service";
import {SnackbarService} from "../services/snackbar.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    user: UserData = {
        token:localStorage.getItem("token"),
        id: localStorage.getItem("id"),
    }

    expenses: Expense[] = []
    constructor(private router: Router, private expenseService: ExpenseService,private snackbarService: SnackbarService) {}

    ngOnInit() {
        if (!this.user.token) {
            this.router.navigate(['/login'])
        }
    }
    logout() : Promise<Boolean>   {
        localStorage.clear()
        return this.router.navigate(['/login'])
    }

    submitExpense(expense: Expense) {
        try {
            this.expenseService.addExpense(expense, this.user.token!).subscribe((data: any) => {
                console.log(data);
            this.snackbarService.createSnackbar("success", "Dépense ajoutée", 2000)
            })

        } catch (error) {
            console.log(error);
        }
    }

}
