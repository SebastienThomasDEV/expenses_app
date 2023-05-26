import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import { faMagnifyingGlass, faFilter, faSortDown, faList } from '@fortawesome/free-solid-svg-icons';
import { dateToUnix, unixToDate } from '../utilities/dateFormat';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ transform: 'translateX(-100%)'}),
                        animate('0.5s ease-out',
                            style({ transform: 'translateX(0)'}))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ height: 300, opacity: 1 }),
                        animate('1s ease-in',
                            style({ height: 0, opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})



export class ExpenseComponent {
    faMagnifyingGlass = faMagnifyingGlass;
    faFilter = faFilter;
    faSortDown = faSortDown;
    faList = faList;
    openForm: boolean = false;
    openFilters: boolean = false;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
        expenses: []
    }
    dates: number[] = []
    sortedDates: string[] = []



    constructor(private expenseService: ExpenseService) { }


    ngOnInit(): void {
        this.expenseService.getExpenses(this.user.id!, this.user.token!).subscribe((expenses: Expense[]) => {
            expenses.forEach((expense: Expense) => {
                this.user.expenses?.push(expense)
                this.dates.push(expense.date)
            })
            this.sortedDates = this.sortDates(this.dates)
            this.sortExpenses(expenses)
        })
    }

    sortExpenses(expenses: Expense[]) {
        this.user.expenses?.sort((a, b) => dateToUnix(a.date) - dateToUnix(b.date))
        console.log(this.user.expenses);
    }

    sortDates(dates: number[]) {
        return [...new Set(dates.map((date: number) => date.toString().split('T')[0]))].sort()
    }


    protected readonly console = console;
}
