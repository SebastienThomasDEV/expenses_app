import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import { faMagnifyingGlass, faFilter, faSortDown, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
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
    dateInterval: {start: Date, end: Date} = {
        start: new Date(),
        end: new Date()
    }
    dates: Date[] = []


    constructor(private expenseService: ExpenseService) { }

    toogleForm() {
        this.openForm = !this.openForm;
    }

    toogleFilter() {
        this.openFilters = !this.openFilters;
    }

    ngOnInit(): void {
        this.expenseService.getExpenses(this.user.id!, this.user.token!).subscribe((data: any) => {
            data.forEach((expense: Expense) => {
                this.user.expenses?.push(expense)
                this.dates.push(new Date(expense.date))
                this.dates.sort((a, b) => a.getTime() - b.getTime())
                this.dateInterval.start = this.dates[0]
                this.dateInterval.end = this.dates[this.dates.length - 1]
            })
            this.sortExpenses()
        })
    }

    sortExpenses() {
        // TODO: sort expenses by date transform date into unix timestamp
        this.user.expenses?.sort((a, b) => a.date - b.date)
    }


}
