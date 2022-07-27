export default () => {
  const secondsEl = document.querySelector('[data-timer="seconds"]'),
    tick = () => {
      setInterval(() => toggleFlipClass(), 1000)
    },
    toggleFlipClass = () => secondsEl.classList.toggle('flip')

  return {
    init: function () {
      tick()
    },
  }
}
