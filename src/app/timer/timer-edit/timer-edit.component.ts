import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-edit',
  templateUrl: './timer-edit.component.html',
  styleUrls: ['./timer-edit.component.scss'],
})
export class TimerEditComponent {
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  date: Date[] | undefined;

  hideDialog(): void {
    this.isVisibleChange.emit(false);
  }

  /**
   * Saves the user defined date config
   */
  saveDateConfig(): void {
    if (this.date) {
      localStorage.setItem('date', JSON.stringify(this.date));
      this.hideDialog();
    }
  }
}
