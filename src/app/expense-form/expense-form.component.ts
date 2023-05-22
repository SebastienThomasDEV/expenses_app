import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {expenseForm} from "./expenseForm";
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import {ExpenseService} from "../services/expense.service";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent {

    constructor(protected expenseService: ExpenseService) {
    }
  expenseForm = expenseForm;
  user: UserData = {
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
  }


  onSubmit() {

    const expense: Expense = {
        date: new Date(this.expenseForm.value.date),
        category: this.expenseForm.value.category,
        description: this.expenseForm.value.description,
        amount: this.expenseForm.value.amount,
        userEntity: this.user.id,
    }
    try {
        this.expenseService.addExpense(expense).subscribe((data: any) => {
            console.log(data);
            // TODO: fix it throws an error when the expense is added "Invalid IRI (values: 1) for parameter id.)"
        })
    } catch (error) {
        console.log(error);
    }
  }
}
