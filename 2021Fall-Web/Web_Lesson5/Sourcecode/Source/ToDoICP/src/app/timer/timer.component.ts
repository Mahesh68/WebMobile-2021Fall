import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  // initialised values
  public dateNow = new Date();
  public dDay = new Date("Jan 01 2022 00:00:00");
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  // Get time difference between user entered date event and current event

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  // Calculating number of hours, minutes and seconds left from the current date to target date
  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );

    // calculating hours, Math.floor gives me in hours rounded off to 2 decimals
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  /* One of the life cycle method where Subscription to the interval is getting triggered.
  Observables gets hot only after they are subscribed. */

  ngOnInit() {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  // To avoid memory leaks unsubscribe from the subscribed event
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
