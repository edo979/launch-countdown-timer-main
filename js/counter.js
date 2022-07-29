class Counter {
  #seconds = 0

  secondsEl = document.querySelector('[data-timer="seconds"]')

  constructor(minutes = 0, seconds = 0) {
    this.#seconds = seconds
    this.minutes = minutes
  }

  get seconds() {
    return this.#seconds.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }

  /**
   * @param {number} value
   */
  set seconds(value) {
    this.#seconds = value
  }

  flipCard(timeUnitEl) {
    const topFillNumberEl = timeUnitEl.querySelector('#flip-fill-top'),
      topBackNumberEl = timeUnitEl.querySelector('#flip-back'),
      flipInnerEl = timeUnitEl.querySelector('#flip-card-inner'),
      topFrontNumberEl = timeUnitEl.querySelector('#flip-front'),
      bottomNumberEl = timeUnitEl.querySelector('#flip-bottom')

    // set number before flip then flip card
    topFillNumberEl.textContent = this.seconds
    topBackNumberEl.textContent = this.seconds
    flipInnerEl.style.opacity = '1'
    flipInnerEl.classList.toggle('flip')

    // after flip, make card invisible
    // reset rotation and set numbers
    setTimeout(() => {
      flipInnerEl.style.opacity = '0'
      flipInnerEl.classList.toggle('flip')
      topFrontNumberEl.textContent = this.seconds
      bottomNumberEl.textContent = this.seconds
    }, 400)
  }

  changeTime() {
    this.seconds--
    this.isTimeUnitFromBegining('seconds')
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
      this.flipCard(this.secondsEl)
    }, 1000)
  }
}

export const counter = new Counter()
