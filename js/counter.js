class Counter {
  #seconds = 0
  #minutes = 0

  secondsEl = document.querySelector('[data-timer="seconds"]')
  minutesEl = document.querySelector('[data-timer="minutes"]')

  constructor(minutes = 0, seconds = 0) {
    this.#seconds = seconds
    this.#minutes = minutes
  }

  get seconds() {
    return this.numberToFormatedString(this.#seconds)
  }

  /**
   * @param {number} value
   */
  set seconds(value) {
    this.#seconds = value
  }

  get minutes() {
    return this.numberToFormatedString(this.#minutes)
  }

  set minutes(value) {
    this.#minutes = value
  }

  numberToFormatedString(num) {
    return num.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }

  flipCard(timeUnitEl, timeUnit) {
    const topFillNumberEl = timeUnitEl.querySelector('#flip-fill-top'),
      topBackNumberEl = timeUnitEl.querySelector('#flip-back'),
      flipInnerEl = timeUnitEl.querySelector('#flip-card-inner'),
      topFrontNumberEl = timeUnitEl.querySelector('#flip-front'),
      bottomNumberEl = timeUnitEl.querySelector('#flip-bottom')

    // set number before flip then flip card
    topFillNumberEl.textContent = timeUnit
    topBackNumberEl.textContent = timeUnit
    flipInnerEl.style.opacity = '1'
    flipInnerEl.classList.toggle('flip')

    // after flip, make card invisible
    // reset rotation and set numbers
    setTimeout(() => {
      flipInnerEl.style.opacity = '0'
      flipInnerEl.classList.toggle('flip')
      topFrontNumberEl.textContent = timeUnit
      bottomNumberEl.textContent = timeUnit
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
          this.seconds = 2
          this.minutes--
          this.isTimeUnitFromBegining('minutes')
          this.flipCard(this.minutesEl, this.minutes)
        }
        break

      case 'minutes':
        if (this.minutes < 0) {
          this.minutes = 2
        }
        break

      default:
        break
    }
  }

  tick() {
    setInterval(() => {
      this.changeTime()
      this.flipCard(this.secondsEl, this.seconds)
    }, 1000)
  }
}

export const counter = new Counter()
