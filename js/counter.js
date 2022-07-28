class Counter {
  constructor(minutes = 0, seconds = 0) {
    this.secondsEl = document.querySelector('[data-timer="seconds"]')

    this.seconds = seconds
    this.minutes = minutes
  }

  flipCard() {
    // set number in top background card
    const topFillNumberEl = document.getElementById('flip-fill-top')
    topFillNumberEl.textContent = this.seconds

    // set flip class to inner flip-card
    this.secondsEl.querySelector('.flip-card_inner').classList.toggle('flip')

    // after flip set bottom card number
    const bottomNumberEl = document.getElementById('flip-bottom')
    bottomNumberEl.textContent = this.seconds

    // reset cards get ready for next flip, set numbers
    const topFrontNumberEl = document.getElementById('flip-front')
    topFrontNumberEl.textContent = this.seconds

    setTimeout(
      () =>
        this.secondsEl
          .querySelector('.flip-card_inner')
          .classList.toggle('flip'),
      500
    )
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
    setInterval(() => {
      this.changeTime()
      this.flipCard()
    }, 1000)
  }
}

export const counter = new Counter()
