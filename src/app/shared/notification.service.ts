import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


  success(mensaje: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(mensaje, '',this.config);
  }

  warn(mensaje: string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(mensaje, '', this.config);
  }
}