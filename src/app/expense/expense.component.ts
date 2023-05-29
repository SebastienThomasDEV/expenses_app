import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import Expense from "../interface/Expense";
import UserData from "../interface/UserData";
import { faPenToSquare, faSortDown, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { dateToUnix, unixToDate } from '../utilities/dateFormat';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})



export class ExpenseComponent {
    faSortDown = faSortDown;
    faPenToSquare = faPenToSquare;
    faTrashCan = faTrashCan
    @Input() expenses: Expense[] | null | undefined = []
    @Input() sortedDates : string [] | null | undefined = []
    @Output() deleteExpenseEvent = new EventEmitter();


    constructor() { }

    ngOnInit() {
        console.log(this.expenses);
    }

    deleteExpense(expense: Expense) {
        this.deleteExpenseEvent.emit(expense)
    }


    protected readonly console = console;
}
