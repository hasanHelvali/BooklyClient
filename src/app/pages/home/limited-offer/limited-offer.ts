import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-limited-offer',
  imports: [],
  templateUrl: './limited-offer.html',
  styleUrl: './limited-offer.css',
})
export class LimitedOffer implements OnInit, OnDestroy {
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  private interval: any;
  private targetDate = new Date('2026-05-01T00:00:00');

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tick();
    this.interval = setInterval(() => {
      this.tick();
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private tick(): void {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      clearInterval(this.interval);
      return;
    }

    this.days = this.pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
    this.hours = this.pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutes = this.pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    this.seconds = this.pad(Math.floor((diff % (1000 * 60)) / 1000));
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
