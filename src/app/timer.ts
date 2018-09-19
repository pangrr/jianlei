export class Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(public totalInSeconds: number) {
    this.start();
  }

  private start(): void {
    const tickingInterval = setInterval(() => {
      if (this.totalInSeconds <= 0) {
        clearInterval(tickingInterval);
      }

      this.totalInSeconds--;
      this.convert();
    }, 1000);
  }

  private convert(): void {
    let _seconds = this.totalInSeconds;
    this.days = Math.floor(_seconds / (3600 * 24));

    _seconds  -= this.days * 3600 * 24;
    this.hours = Math.floor(_seconds / 3600);

    _seconds  -= this.hours * 3600;
    this.minutes = Math.floor(_seconds / 60);

    _seconds  -= this.minutes * 60;
    this.seconds = _seconds;
  }
}
