import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import UserData from "../interface/UserData";
import {ExpenseResponse} from "../interface/ExpenseResponse";
import {ExpenseService} from "../services/expense.service";
import {SnackbarService} from "../services/snackbar.service";
import {dateToUnix} from "../utilities/dateFormat";
import {animate, style, transition, trigger} from "@angular/animations";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";
import Request from "../interface/Request";
import Category from "../interface/Category";
import {CategoryService} from "../services/category.service";

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
    protected readonly console = console;
    protected readonly faSortDown = faSortDown;

    protected user: UserData = {
        token: localStorage.getItem("token"),
        id: localStorage.getItem("id"),
        expenses: []
    }
    protected formStateExpense: boolean = false;
    protected formStateCategory: boolean = false;
    protected category?: Category;
    protected categories: Category[] = []
    protected expense?: ExpenseResponse;
    private dates: number[] = []
    protected sortedDates: string[] = []

    constructor(private router: Router, private expenseService: ExpenseService, private snackbarService: SnackbarService, private categoryService: CategoryService) {

    }
    logout(): Promise<Boolean> {
        localStorage.clear()
        return this.router.navigate(['/login'])
    }
    toggleFormCategory(cancel?: any) {
        if (cancel) {
            this.category = undefined
        }
        this.formStateCategory = !this.formStateCategory
    }
    toggleFormExpense(cancel?: any) {
        if (cancel) {
            this.expense = undefined
        }
        this.formStateExpense = !this.formStateExpense
    }


    ngOnInit(): Promise<Boolean> {
        if (!this.user.token) {
            this.logout()
        }
        this.getExpenses()
        this.getCategories(this.user.id!)
        return Promise.resolve(true)
    }

    getCategories(id: string): void {
        this.categoryService.getCategories(id).subscribe
        ((categories: Category[]) => {
            this.categories = categories
        })
    }

    handleExpenseRequest(request: Request) {
        if (request.fulfilled) {
            switch (request.requestType) {
                case "POST":
                    this.snackbarService.createSnackbar("success", "Dépense ajoutée", 2000)
                    this.toggleFormExpense()
                    this.refreshExpenses()
                    this.expense = undefined
                    break;
                case "PATCH":
                    this.snackbarService.createSnackbar("success", "Dépense modifiée", 2000)
                    this.toggleFormExpense()
                    this.refreshExpenses()
                    this.expense = undefined
                    break;
            }
        } else {
            this.snackbarService.createSnackbar("error", "Une erreur est survenue", 2000)
            // console.log(request.error);
        }

    }
    handleCategoryRequest(request: Request) {
        if (request.fulfilled) {
            switch (request.requestType) {
                case "POST":
                    this.snackbarService.createSnackbar("success", "Categorie ajoutée", 2000)
                    this.toggleFormCategory()
                    this.refreshExpenses()
                    this.category = undefined
                    this.getCategories(this.user.id!)
                    break;
                case "PATCH":
                    this.snackbarService.createSnackbar("success", "Categorie modifiée", 2000)
                    this.toggleFormCategory()
                    this.refreshExpenses()
                    this.category = undefined
                    break;
            }
        } else {
            this.snackbarService.createSnackbar("error", "Une erreur est survenue", 2000)
            // console.log(request.error);
        }

    }



    refreshExpenses() {
        this.getExpenses()
    }
    deleteExpense(expense: ExpenseResponse) {
        try {
            this.expenseService.deleteExpense(expense).subscribe((_: any) => {
                this.snackbarService.createSnackbar("success", "Dépense supprimée", 2000)
                this.refreshExpenses()
            })
        } catch (error) {
            console.log(error);
        }
    }

    editExpense(expense: ExpenseResponse) {
        this.expense = expense
        this.toggleFormExpense()
    }

    getExpenses() {
        // TODO: Faire une requeste dans le backend (et pas dans le front) pour récupérer les dépenses de l'utilisateur par rapport à la date
        this.expenseService.getExpenses(this.user.id!).subscribe((expenses: ExpenseResponse[]) => {
            this.user.expenses = []
            this.dates = []
            this.user.expenses = expenses
            expenses.forEach((expense: ExpenseResponse) => {
                this.dates.push(expense.date)
            })
            this.sortedDates = this.sortDates(this.dates)
            this.user.expenses = this.sortExpenses(this.user.expenses)
        })
    }


    sortExpenses(expenses: ExpenseResponse[]) {
        return expenses.sort((a, b) => dateToUnix(a.date) - dateToUnix(b.date))
    }

    sortDates(dates: number[]) {
        return [...new Set(dates.map((date: number) => date.toString().split('T')[0]))].sort()
    }

}
