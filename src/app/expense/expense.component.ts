import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { expenseForm } from '../expense-form/expenseForm';
import {ExpenseResponse} from "../interface/ExpenseResponse";
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
    @Input() expenses: ExpenseResponse[] | null | undefined = []
    @Input() sortedDates : string [] | null | undefined = []
    @Output() expenseDeleteEvent: EventEmitter<any> = new EventEmitter();
    @Output() expenseUpdateEvent: EventEmitter<any> = new EventEmitter();


    constructor() { }

    ngOnInit() {
    }

    expenseUpdate(expense: ExpenseResponse) {
        this.expenseUpdateEvent.emit(expense)
    }

    expenseDelete(expense: ExpenseResponse) {
        this.expenseDeleteEvent.emit(expense)
    }








    protected readonly console = console;
}
