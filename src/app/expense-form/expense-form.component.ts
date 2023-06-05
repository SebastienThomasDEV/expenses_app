import {Component, EventEmitter, Input, Output} from '@angular/core';
import {expenseForm} from "./expenseForm";
import {ExpenseResponse, ExpenseRequest} from "../interface/ExpenseResponse";
import Request from "../interface/Request";
import UserData from "../interface/UserData";
import {ExpenseService} from "../services/expense.service";
import {FormMode} from "../form-mode";
import {faPenToSquare, faSortDown, faXmark} from "@fortawesome/free-solid-svg-icons";
import {CategoryService} from "../services/category.service";
import Category from "../interface/Category";


@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent {

    @Output() responseEvent: EventEmitter<any> = new EventEmitter();
    @Input() expenseUpdate?: any;
    @Output() handleForm: EventEmitter<any> = new EventEmitter();


    faXmark = faXmark;

    formMode?: FormMode;

    request: Request = {
        fulfilled: false,
        requestType: '',
        error: null
    }

    categories: Category[] = []


    constructor(protected expenseService: ExpenseService, private categoryService: CategoryService) {
    }

    expenseForm = expenseForm;
    user: UserData = {
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
    }

    getUserCategory() {
        this.categoryService.getCategories(this.user.id!).subscribe((data: any) => {
            this.categories = data
        })
    }

    ngOnInit() {
        this.getUserCategory()
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

    addExpense(expense: ExpenseRequest) {
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

    editExpense(expense: ExpenseRequest) {
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

    toggleForm() {
        const cancel = true
        this.handleForm.emit(cancel)
    }




    onSubmit() {
        switch (this.formMode) {
            case FormMode.Create:
                const expense: ExpenseRequest = this.expenseForm.value
                expense.userEntity = "/api/users/" + this.user.id
                expense.category = "/api/categories/" + expense.category
                this.addExpense(expense)
                this.expenseForm.reset()
                break
            case FormMode.Update:
                const expenseUpdate: ExpenseRequest = this.expenseForm.value
                expenseUpdate.category = "/api/categories/" + expenseUpdate.category
                expenseUpdate.userEntity = "/api/users/" + this.user.id
                this.editExpense(expenseUpdate)
                this.expenseForm.reset()
                break

        }
    }

    protected readonly faSortDown = faSortDown;
    protected readonly console = console;
}

