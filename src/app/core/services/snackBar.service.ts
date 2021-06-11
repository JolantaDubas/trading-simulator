import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message, title) {
    this.toastr.success(message);
  }

  showError(message, title) {
    this.toastr.error(message);
  }

  showInfo(message, title) {
    this.toastr.info(message);
  }

  showWarning(message, title) {
    this.toastr.warning(message);
  }
}
