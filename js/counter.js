class Counter {
  #seconds = 0
  #minutes = 0
  #hours = 0
  #days = 0
  tickIntervalID = undefined

  secondsEl = document.querySelector('[data-timer="seconds"]')
  minutesEl = document.querySelector('[data-timer="minutes"]')
  hoursEl = document.querySelector('[data-timer="hours"]')
  daysEl = document.querySelector('[data-timer="days"]')
  countdownTimeEl = document.querySelector('[data-timer="countdown-time"]')

  constructor(days = 14, hours = 0, minutes = 0, seconds = 0) {
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

  tick() {
    if (
      this.days == 0 &&
      this.hours == 0 &&
      this.minutes == 0 &&
      this.seconds == 0
    ) {
      this.stop()
    } else {
      this.seconds--
      this.updateTime('seconds')
      this.showCurrentTime()
    }
  }

  updateTime(timeUnit) {
    switch (timeUnit) {
      case 'seconds':
        if (this.seconds < 0) {
          this.seconds = 59
          this.minutes--
          this.updateTime('minutes')
        }

        this.flipCard(this.secondsEl, this.seconds)
        break

      case 'minutes':
        if (this.minutes < 0) {
          this.minutes = 59
          this.hours--
          this.updateTime('hours')
        }

        this.flipCard(this.minutesEl, this.minutes)
        break

      case 'hours':
        if (this.hours < 0) {
          this.hours = 59
          this.days--
          this.updateTime('days')
        }

        this.flipCard(this.hoursEl, this.hours)
        break

      case 'days':
        // func tick() don't allow this value
        // be below 0
        if (this.days >= 0) {
          this.flipCard(this.daysEl, this.days)
        }
        break

      default:
        break
    }
  }

  start() {
    this.tickIntervalID = setInterval(() => this.tick(), 1000)
  }

  stop() {
    clearInterval(this.tickIntervalID)
  }

  showCurrentTime() {
    this.countdownTimeEl.querySelector('#days').textContent =
      'days ' + this.days
    this.countdownTimeEl.querySelector('#hours').textContent =
      'hours ' + this.hours
    this.countdownTimeEl.querySelector('#minutes').textContent =
      'minutes ' + this.minutes
    this.countdownTimeEl.querySelector('#seconds').textContent =
      'seconds ' + this.seconds
  }
}

export const counter = new Counter()
