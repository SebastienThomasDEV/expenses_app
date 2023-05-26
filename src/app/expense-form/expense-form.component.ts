import {Component, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {expenseForm} from "./expenseForm";
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import {ExpenseService} from "../services/expense.service";
import {ToastrService} from "ngx-toastr";
import {SnackbarService} from "../services/snackbar.service";
import {dateToUnix} from "../utilities/dateFormat";

@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent {

    @Output() newExpenseEvent = new EventEmitter();

    constructor(protected expenseService: ExpenseService) {
    }

    expenseForm = expenseForm;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
    }



    onSubmit() {
        const expense: Expense = this.expenseForm.value
        expense.userEntity = "/api/users/" + this.user.id
        this.newExpenseEvent.emit(expense)
        this.expenseForm.reset()
    }
}

