import Raphael from './raphael.min.js'

var background = Raphael(10, 10, '100%', '100%')
background.rect(0, 0, '100%', '100%').attr({'fill': 'black'})
var paper = Raphael(10, 10, '100%', '100%')
var rtt = 1000
var jitter = 500
function getTime () {
  return rtt + (2 * Math.random() - 1) * jitter
}

function send (x1, y1, x2, y2, seqno, color, callback) {
  let r = paper.rect(x1, y1, 20, 20).attr({fill: color})
  let c = color === 'blue' ? 'red' : 'blue'
  let t = paper.text(x1 + 10, y1 + 10, seqno).attr({fill: c, stroke: c})
  console.log(t)
  let time = getTime()
  r.animate({
    x: x2,
    y: y2
  }, time, 'linear', () => { callback() })
  t.animate({
    x: x2 + 10,
    y: y2 + 10
  }, time, 'linear', () => { t.remove(); r.remove() })
}

class Frame {
  // members: status, x, y, elem
  // params: current seqno, coords to draw at
  constructor (seqno, x, y) {
    this.seqno = seqno
    // status can be unsent, waiting, or complete
    this.status = 'unsent'
    this.x = x
    this.y = y
    this.draw()
  }
  // perform a sliding animation
  slideLeft (shouldVanish) {
    this.elem.animate({x: this.x - 20, color: 'black'}, 300, 'easeOutQuint', function () {
      if (shouldVanish) {
        this.elem.remove()
      }
    }.bind({shouldVanish: shouldVanish, elem: this.elem}))
    this.text.animate({x: this.x - 10, color: 'black'}, 300, 'easeOutQuint', function () {
      if (shouldVanish) {
        this.text.remove()
      }
    }.bind({shouldVanish: shouldVanish, text: this.text}))
  }
  draw () {
    this.elem = paper.rect(this.x, this.y, 20, 20).attr({'fill': 'red'})
    this.text = paper.text(this.x + 10, this.y + 10, this.seqno).attr({'color': 'black'})
  }
  remove () {
    this.elem.remove()
    this.text.remove()
  }
  setStatus (status) {
    this.status = status
    switch (status) {
      case 'complete':
        this.elem.attr({'fill': 'lightblue'})
        break
      case 'waiting':
        this.elem.attr({'fill': 'orange'})
        break
      case 'unsent':
        this.elem.attr({'fill': 'red'})
        break
    }
  }
}

class Sender {
  // offsets are coords of the center of the circle
  constructor (windowSize, maxSeqNo, timeout, x, y, packetDistance) {
    // this.windowSize = windowSize
    this.windowSize = 5 // we'll add variable window sizes later, maybe. DOM manipulation like that is too complex right now
    this.maxSeqNo = maxSeqNo
    this.timeout = timeout
    // stores seqno
    this.window = []
    this.status = []
    // stores frame objects
    this.frames = []
    this.packetDistance = packetDistance
    this.x = x
    this.y = y

    for (let i = 0; i < windowSize; i++) {
      this.window.push(i)
      this.status.push('unsent')
    }
    console.log(this.window)
    this.draw()
    this.drawFrames()
    window.setInterval(this.sendUnsent.bind(this), 2000)
  }
  // this method is called every time an ACK is received
  handleACK (seqno) {
    console.log('receive ACK ' + seqno)
    this.window.forEach((e, i) => {
      if (e === seqno) {
        this.status[i] = 'complete'
      }
    })
    while (this.status[0] === 'complete') {
      this.status.shift()
      this.window.shift()
      this.status.push('unsent')
      this.window.push((this.window[this.window.length - 1] + 1) % this.maxSeqNo)
    }
    this.drawFrames()
  }
  drawFrames () {
    this.frames.forEach((e) => e.remove())
    this.frames = []
    for (let i = 0; i < this.windowSize; i++) {
      this.frames.push(new Frame(this.window[i], this.x + 20 * (i - this.windowSize / 2), this.y - 10))
      this.frames[this.frames.length - 1].setStatus(this.status[i])
    }
  }
  // this function runs every 1000 ms, sends the first previously unsent packet
  sendUnsent () {
    for (let i = 0; i < this.window.length; i++) {
      if (this.status[i] === 'unsent') {
        this.sendPacket(this.window[i])
        this.status[i] = 'waiting'
        return
      }
    }
    this.drawFrames()
  }
  // slide the window to the right
  slideWindow () {
    this.window.push((this.window[this.window.length - 1].seqno + 1) % this.maxSeqNo)
    this.window.shift()
    this.status.push('unsent')
    this.status.shift()
  }
  draw () {
    background.circle(this.x, this.y, 70).attr({
      fill: 'green'
    })
    for (let i = 0; i < this.windowSize; i++) {
      background.rect(this.x + 20 * (i - this.windowSize / 2), this.y - 10, 20, 20)
    }
  }
  sendPacket (seqno) {
    console.log('send packet ' + seqno)
    send(this.x + 50, this.y - 50, this.x + this.packetDistance, this.y - 50, seqno, 'red', () => receiver.handlePacket(seqno))
    for (let i = 0; i < this.windowSize; i++) {
      if (this.window[i] === seqno) {
        this.status[i] = 'waiting'
        break
      }
    }
    this.drawFrames()
  }
};

class Receiver {
  constructor (maxSeqNo, x, y, packetDistance) {
    this.seqno = 0
    this.maxSeqNo = maxSeqNo
    this.x = x
    this.y = y
    this.packetDistance = packetDistance
    this.draw()
  }
  handlePacket (seqno) {
    console.log('receive ACK ' + seqno)
    if (seqno <= this.seqno) {
      this.sendACK(seqno)
    }
    if (seqno === this.seqno) {
      this.seqno = (this.seqno + 1) % this.maxSeqNo
      this.frame.slideLeft(true)
      this.frame = new Frame(this.seqno, this.x - 10, this.y - 10)
      this.frame.setStatus('waiting')
    }
  }
  sendACK (seqno) {
    console.log('send ACK ' + seqno)
    send(this.x - 60, this.y + 50, this.x - this.packetDistance + 60, this.y + 50, seqno, 'blue', () => sender.handleACK(seqno))
  }
  draw () {
    background.circle(this.x, this.y, 70).attr({
      fill: 'yellow'
    })
    background.rect(this.x - 10, this.y - 10, 20, 20)
    this.frame = new Frame(0, this.x - 10, this.y - 10)
    this.frame.setStatus('waiting')
  }
}
var packetDistance = 500
var sender = new Sender(5, 10, 1, 100, 300, packetDistance)
var receiver = new Receiver(10, 100 + packetDistance + 50, 300, packetDistance)
console.log(sender.window)
