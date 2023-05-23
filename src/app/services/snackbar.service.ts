import {Injectable} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {ToastrIconClasses} from "ngx-toastr/toastr/toastr-config";
type SnackBarType = "error" | "info" | "success" | "warning";

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
    constructor(private toastrService: ToastrService) {}

    createSnackbar(message: string, type: string): ActiveToast<any> {
        return this.toastrService[type as SnackBarType](message);
    }


}
