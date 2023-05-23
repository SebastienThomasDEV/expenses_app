import {Injectable} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {ToastrIconClasses} from "ngx-toastr/toastr/toastr-config";

type SnackBarType = "error" | "info" | "success" | "warning";

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
    /**
     * The constructor function for the SnackbarService.
     *
     * @param toastr The service injected (from the library ngx-toastr)
     * @return The instance of the class
     *
     * @docauthor Sébastien Thomas
     */
    constructor(private toastr: ToastrService) {}

    /**
     * The createSnackbar function creates a toastr instance with the given message and type.
     *
     *
     * @param type: string Determine the type of snackbar to be displayed
     * @param message: string Set the message that will be displayed in the snackbar    z
     * @param timer: number | null Set the timer of the snackbar if not null default value is 3000
     *
     * @return An activetoast&lt;any&gt; object
     *
     * @docauthor Sébastien Thomas
     */
    createSnackbar(type: string, message: string, timer?: number): ActiveToast<any> {
        return this.toastr[type as SnackBarType](message, undefined, {timeOut: timer || 3000});
    }

}
