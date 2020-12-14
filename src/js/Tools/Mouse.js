import EventEmitter from './EventEmitter.js'

export default class Mouse extends EventEmitter {
  constructor() {
    // Get parent methods
    super()
    this.mouse = {x: 0, y: 0}

    // Set up
    // console.log('scroll constructor');
    document.addEventListener('mousemove', (ev) => {
        this.mouse.x = ev.clientX
        this.mouse.y = ev.clientY
        
    })
  }
  getMousePos() {
    //   console.log('getMousPos', this.mouse);
      return this.mouse
  }
  // Cancel animation frame
  stop() {
    window.cancelAnimationFrame(this.ticker)
  }
}