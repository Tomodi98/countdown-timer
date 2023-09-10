import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  targetDate: Date = new Date('2023-10-22T00:00:00'); // Set your target date here
  timeRemaining: any;
  isEditDialogVisible = false;
  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.initTimer();
  }

  initTimer(): void {
    // Clear interval if found
    if (this.interval) {
      clearInterval(this.interval);
    }
    // Update the countdown every second
    this.interval = setInterval(() => {
      this.calculateTimeRemaining();
    }, 1000);
  }

  private initTargetDate(): void {
    const test = localStorage.getItem('date');
    if (test) {
      this.targetDate = new Date(JSON.parse(test));
    }
  }

  calculateTimeRemaining(): void {
    this.initTargetDate();

    const now = new Date();
    const difference = this.targetDate.getTime() - now.getTime();

    if (difference > 0) {
      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      this.timeRemaining = {
        weeks: weeks,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    } else {
      this.timeRemaining = null; // Countdown has expired
    }
  }

  showEditDialog(): void {
    this.isEditDialogVisible = true;
  }
}
