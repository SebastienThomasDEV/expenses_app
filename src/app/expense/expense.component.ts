import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})



export class ExpenseComponent {
    faMagnifyingGlass = faMagnifyingGlass;
    openForm: boolean = false;
    openFilters: boolean = false;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
        expenses: []
    }

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
            })
        })
    }


}
