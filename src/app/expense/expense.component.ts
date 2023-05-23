import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})



export class ExpenseComponent {

    onEdit: boolean = false;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
    }

    constructor(private expenseService: ExpenseService) { }

    toogleForm() {
        this.onEdit = !this.onEdit;
    }

    ngOnInit(): void {
        console.log(this.user);
        this.expenseService.getExpenses(this.user.id!, this.user.token!).subscribe((data: any) => {
            console.log(data);
        })
    }

}
