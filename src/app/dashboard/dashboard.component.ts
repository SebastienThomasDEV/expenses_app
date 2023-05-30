import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import UserData from "../interface/UserData";
import Expense from "../interface/Expense";
import {ExpenseService} from "../services/expense.service";
import {SnackbarService} from "../services/snackbar.service";
import {dateToUnix} from "../utilities/dateFormat";
import {animate, style, transition, trigger} from "@angular/animations";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('showForm', [
            transition(
                ':enter',
                [
                    style({transform: 'translateX(100%)'}),
                    animate('0.3s ease-out',
                        style({transform: 'translateX(0)'}))
                ]
            ),
            transition(
                ':leave',
                [
                    animate('0.3s ease-in',
                        style({transform: 'translateX(100%)'}))
                ]
            )
        ])
    ]
})
export class DashboardComponent {
    @Input() expenseEventData?: object
    @Output() expenseEditEvent: EventEmitter<any> = new EventEmitter();
    user: UserData = {
        token: localStorage.getItem("token"),
        id: localStorage.getItem("id"),
        expenses: []
    }
    formState: boolean = false;

    toggleFormState() {
        this.formState = !this.formState
    }
    dates: number[] = []
    sortedDates: string[] = []

    constructor(private router: Router, private expenseService: ExpenseService, private snackbarService: SnackbarService) {
    }

    ngOnInit() {
        if (!this.user.token) {
            this.router.navigate(['/login'])
        }
        this.getExpenses()
    }

    logout(): Promise<Boolean> {
        localStorage.clear()
        return this.router.navigate(['/login'])
    }

    addExpense(expense: Expense) {
        try {
            this.expenseService.addExpense(expense, this.user.token!).subscribe((data: any) => {
                this.snackbarService.createSnackbar("success", "Dépense ajoutée", 2000)
            })
            this.getExpenses()
            this.formState = !this.formState
        } catch (error) {
            console.log(error);
        }
    }

    handleExpense(expenseData: any) {
        if (expenseData.action === 'delete') {
            this.deleteExpense(expenseData.expense)
        } else if (expenseData.action === 'edit') {
            this.editExpense(expenseData.expense)
        }
    }

    deleteExpense(expense: Expense) {
        try {
            this.expenseService.deleteExpense(expense, this.user.token!).subscribe((_: any) => {
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
        })
    }

    editExpense(expense: Expense) {
        this.toggleFormState()
        return this.expenseEditEvent.emit(expense)
    }

    sortExpenses(expenses: Expense[]) {
        return expenses.sort((a, b) => dateToUnix(a.date) - dateToUnix(b.date))
    }

    sortDates(dates: number[]) {
        return [...new Set(dates.map((date: number) => date.toString().split('T')[0]))].sort()
    }

    protected readonly console = console;
    protected readonly faSortDown = faSortDown;
}
