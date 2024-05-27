import { Injectable, inject } from '@angular/core';

import type { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { IndicatorComponent } from '../layout/indicator/indicator.component';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  readonly #dialog = inject(MatDialog);

  show(): MatDialogRef<IndicatorComponent> {
    return this.#dialog.open(IndicatorComponent, { panelClass: 'indicator-dialog' });
  }

  hide(dialogRef: MatDialogRef<IndicatorComponent>): void {
    dialogRef.close();
  }
}
