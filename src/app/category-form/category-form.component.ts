import {Component, EventEmitter, Output} from '@angular/core';
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
    @Output() responseEvent: EventEmitter<any> = new EventEmitter();

    constructor(private categoryService: CategoryService) {
    }
    onSubmit() {
        console.log(this.categoryForm.value);
            this.categoryService.addCategory(this.categoryForm.value).subscribe((data: any) => {
                this.responseEvent.emit(data)
                this.toggleForm()
        })
    }

    toggleForm() {
        const cancel = true
        this.handleForm.emit(cancel)
    }



}
