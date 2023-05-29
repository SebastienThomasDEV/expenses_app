import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import UserData from "../interface/UserData";
import Expense from "../interface/Expense";
import {ExpenseService} from "../services/expense.service";
import {SnackbarService} from "../services/snackbar.service";
import {dateToUnix} from "../utilities/dateFormat";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    @Input() expense: Expense | null | undefined
    user: UserData = {
        token:localStorage.getItem("token"),
        id: localStorage.getItem("id"),
        expenses: []
    }

    dates: number[] = []
    sortedDates: string[] = []

    constructor(private router: Router, private expenseService: ExpenseService,private snackbarService: SnackbarService) {}

    async ngOnInit() {
        if (!this.user.token) {
            this.router.navigate(['/login'])
        }
        await this.getExpenses()
    }
    logout() : Promise<Boolean>   {
        localStorage.clear()
        return this.router.navigate(['/login'])
    }

    addExpense(expense: Expense) {
        try {
            this.expenseService.addExpense(expense, this.user.token!).subscribe((data: any) => {
                this.snackbarService.createSnackbar("success", "Dépense ajoutée", 2000)
            })
            this.getExpenses()
        } catch (error) {
            console.log(error);
        }
    }

    deleteExpense(expense: Expense) {
        try {
            this.expenseService.deleteExpense(expense, this.user.token!).subscribe((data: any) => {
                this.snackbarService.createSnackbar("success", "Dépense supprimée", 2000)
                this.getExpenses()
            })
        } catch (error) {
            console.log(error);
        }
    }

    getExpenses() {
        this.expenseService.getExpenses(this.user.id!, this.user.token!).subscribe((expenses: Expense[]) => {
            this.user.expenses = []
            this.dates = []
            this.user.expenses = expenses
            expenses.forEach((expense: Expense) => {
                this.dates.push(expense.date)
            })
            this.sortedDates = this.sortDates(this.dates)
            this.user.expenses = this.sortExpenses(this.user.expenses)
            console.log('expense is called');
        })
    }

    sortExpenses(expenses: Expense[]) {
        return expenses.sort((a, b) => dateToUnix(a.date) - dateToUnix(b.date))
    }

    sortDates(dates: number[]) {
        return [...new Set(dates.map((date: number) => date.toString().split('T')[0]))].sort()
    }

    protected readonly console = console;
}
