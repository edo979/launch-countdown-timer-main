class Counter {
  #seconds = 0
  #minutes = 0
  #hours = 0
  #days = 14
  tickIntervalID = undefined

  secondsEl = document.querySelector('[data-timer="seconds"]')
  minutesEl = document.querySelector('[data-timer="minutes"]')
  hoursEl = document.querySelector('[data-timer="hours"]')
  daysEl = document.querySelector('[data-timer="days"]')

  constructor(days = 1, hours = 0, minutes = 0, seconds = 0) {
    this.#seconds = seconds
    this.#minutes = minutes
    this.#hours = hours
    this.#days = days
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

  /**
   * @param {number} value
   */
  set minutes(value) {
    this.#minutes = value
  }

  get hours() {
    return this.numberToFormatedString(this.#hours)
  }

  /**
   * @param {number} value
   */
  set hours(value) {
    this.#hours = value
  }

  get days() {
    return this.numberToFormatedString(this.#days)
  }

  /**
   * @param {number} value
   */
  set days(value) {
    this.#days = value
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
    if (
      this.days == 0 &&
      this.hours == 0 &&
      this.minutes == 0 &&
      this.seconds == 0
    ) {
      clearInterval(this.tickIntervalID)
    } else {
      this.seconds--
      this.isTimeUnitFromBegining('seconds')
      this.flipCard(this.secondsEl, this.seconds)
    }
  }

  isTimeUnitFromBegining(timeUnit) {
    switch (timeUnit) {
      case 'seconds':
        if (this.seconds < 0) {
          this.seconds = 1
          this.minutes--
          this.isTimeUnitFromBegining('minutes')
          this.flipCard(this.minutesEl, this.minutes)
        }
        break

      case 'minutes':
        if (this.minutes < 0) {
          this.minutes = 1
          this.hours--
          this.isTimeUnitFromBegining('hours')
          this.flipCard(this.hoursEl, this.hours)
        }
        break

      case 'hours':
        if (this.hours < 0) {
          this.hours = 1
          this.days--
          this.isTimeUnitFromBegining('days')
          this.flipCard(this.daysEl, this.days)
        }
        break

      case 'days':
        if (this.days < 0) {
          this.days = 0
        }
        break

      default:
        break
    }
  }

  tick() {
    this.tickIntervalID = setInterval(() => this.changeTime(), 1000)
  }
}

export const counter = new Counter()
