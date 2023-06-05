import {Component, EventEmitter, Input, Output} from '@angular/core';
import {categoryForm} from "./categoryForm";
import {FormGroup} from "@angular/forms";
import {CategoryService} from "../services/category.service";
import Request from "../interface/Request";
import Category from "../interface/Category";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
    categoryForm: FormGroup<any> = categoryForm;
    @Output() handleForm: EventEmitter<any> = new EventEmitter();
    @Input() categoryUpdate?: any;
    @Output() responseEvent: EventEmitter<any> = new EventEmitter();

    request: Request = {
        fulfilled: false,
        requestType: '',
        error: null
    }

    category: Category = {
        title: "",
        color: "",
        user: ""
    }

    constructor(private categoryService: CategoryService) {
    }

    onSubmit() {
        this.category = this.categoryForm.value
        this.category.user = "api/users/" + localStorage.getItem("id")
        this.categoryService.addCategory(this.categoryForm.value).subscribe((data: any) => {
            this.responseEvent.emit(
                this.request = {
                    fulfilled: true,
                    requestType: 'POST',
                    error: null
                }
            )
            this.categoryForm.reset()
            this.toggleForm()
        })
    }

    test() {
        this.categoryService.getCategories(localStorage.getItem("id")!).subscribe((data: any) => {
            console.log(data)
        })
    }

    toggleForm() {
        const cancel = true
        this.handleForm.emit(cancel)
    }


}
