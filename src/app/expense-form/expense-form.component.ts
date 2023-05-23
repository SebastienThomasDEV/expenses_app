import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {expenseForm} from "./expenseForm";
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import {ExpenseService} from "../services/expense.service";
import {ToastrService} from "ngx-toastr";
import {SnackbarService} from "../services/snackbar.service";

@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent {

    constructor(protected expenseService: ExpenseService, private snackbarService: SnackbarService) {
    }

    expenseForm = expenseForm;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
    }


    onSubmit() {
        const expense: Expense = {
            date: new Date(this.expenseForm.value.date),
            category: this.expenseForm.value.category,
            description: this.expenseForm.value.description,
            amount: this.expenseForm.value.amount,
            userEntity: "api/users/" + this.user.id,
        }
        try {
            this.expenseService.addExpense(expense, this.user.token!).subscribe((data: any) => {
                this.snackbarService.createSnackbar("success", "Dépense ajoutée", 2000)
                this.expenseForm.reset()
            })
        } catch (error) {
            console.log(error);
        }
    }
}

