class Counter {
  constructor(minutes = 0, seconds = 0) {
    this.secondsEl = document.querySelector('[data-timer="seconds"]')

    this.seconds = seconds
    this.minutes = minutes
  }

  toggleFlipClass() {
    this.secondsEl.classList.toggle('flip')
  }

  changeTime() {
    this.seconds--
    this.isTimeUnitFromBegining('seconds')
    //console.log(this.seconds, this.minutes)
  }

  isTimeUnitFromBegining(timeUnit) {
    switch (timeUnit) {
      case 'seconds':
        if (this.seconds < 0) {
          this.seconds = 59
          this.minutes--
          this.isTimeUnitFromBegining('minutes')
        }
        break

      case 'minutes':
        if (this.minutes < 0) {
          this.minutes = 59
        }
        break

      default:
        break
    }
  }

  tick() {
    // setInterval(() => {
    //   this.changeTime()
    //   //this.toggleFlipClass()
    // }, 1000)
  }
}

export const counter = new Counter()
