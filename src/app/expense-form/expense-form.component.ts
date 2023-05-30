import {Component, EventEmitter, Input, Output} from '@angular/core';
import {expenseForm} from "./expenseForm";
import Expense from "../interface/Expense";
import Request from "../interface/Request";
import UserData from "../interface/UserData";
import {ExpenseService} from "../services/expense.service";
import {FormMode} from "../form-mode";


@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent {

    @Output() responseEvent: EventEmitter<any> = new EventEmitter();

    @Input() expenseUpdate?: any;

    formMode?: FormMode;

    request: Request = {
        fulfilled: false,
        requestType: '',
        error: null
    }


    constructor(protected expenseService: ExpenseService) {
    }

    expenseForm = expenseForm;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
    }

    ngOnInit() {
        if (this.expenseUpdate) {
            this.formMode = FormMode.Update
            this.expenseForm.reset()
            this.expenseForm.patchValue(this.expenseUpdate)
            this.expenseForm.controls['date'].setValue(
                new Date(this.expenseUpdate.date).toISOString().split('.')[0]
            )
        } else {
            this.formMode = FormMode.Create
            this.expenseForm.reset()
        }
    }

    addExpense(expense: Expense) {
        try {
            this.expenseService.addExpense(expense).subscribe((data: any) => {
                this.responseEvent.emit(
                    this.request = {
                        fulfilled: true,
                        requestType: 'POST',
                        error: null
                    }
                )
                this.expenseForm.reset()
            })
        } catch (error) {
            this.responseEvent.emit(
                this.request = {
                fulfilled: false,
                requestType: 'POST',
                error: error
            })
        }
    }

    editExpense(expense: Expense) {
        try {
            this.expenseService.updateExpense(expense, this.expenseUpdate.id).subscribe((data: any) => {
                this.responseEvent.emit(
                    this.request = {
                        fulfilled: true,
                        requestType: 'PATCH',
                        error: null
                    }
                )
                this.expenseForm.reset()
            })
        } catch (error) {
            this.responseEvent.emit(
                this.request = {
                fulfilled: false,
                requestType: 'PATCH',
                error: error
            })
        }
    }


    onSubmit() {
        switch (this.formMode) {
            case FormMode.Create:
                const expense: Expense = this.expenseForm.value
                expense.userEntity = "/api/users/" + this.user.id
                this.addExpense(expense)
                this.expenseForm.reset()
                break
            case FormMode.Update:
                const expenseUpdate: Expense = this.expenseForm.value
                expenseUpdate.userEntity = "/api/users/" + this.user.id
                this.editExpense(expenseUpdate)
                this.expenseForm.reset()
                break

        }
    }
}

