import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showError(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showInfo(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showWarning(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
