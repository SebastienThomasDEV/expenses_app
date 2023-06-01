import {Component, EventEmitter, Input, Output} from '@angular/core';
import {categoryForm} from "./categoryForm";
import {FormGroup} from "@angular/forms";
import {CategoryService} from "../services/category.service";
import Request from "../interface/Request";

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

    constructor(private categoryService: CategoryService) {
    }
    onSubmit() {
        console.log(this.categoryForm.value);
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

    toggleForm() {
        const cancel = true
        this.handleForm.emit(cancel)
    }



}
