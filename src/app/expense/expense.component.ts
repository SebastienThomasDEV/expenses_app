import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import Expense from "../interface/Expense";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})



export class ExpenseComponent {

    onEdit: boolean = false;

    constructor(private expenseService: ExpenseService) { }

    toogleForm() {
        this.onEdit = !this.onEdit;
        console.log(this.onEdit);
    }

}
