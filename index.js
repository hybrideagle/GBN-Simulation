import Raphael from './raphael.min.js'
import dat from './dat.gui.min.js'

var background = Raphael('0', '0', '100%', '100%')
background.rect(0, 0, '100%', '100%').attr({'fill': 'black'})
var paper = Raphael('0', '0', '100%', '100%')

var conf = {
  rtt: 1000,
  jitter: 500,
  sendWait: 500,
  timeout: 1000
}

function log (s) {
  // console.log(s)
}

function getTime () {
  return conf.rtt + (2 * Math.random() - 1) * conf.jitter
}

function send (x1, y1, x2, y2, seqno, color, callback) {
  let r = paper.rect(x1, y1, 40, 40).attr({fill: color})
  let c = color === 'blue' ? 'red' : 'blue'
  c = 'white'
  let t = paper.text(x1 + 20, y1 + 20, seqno).attr({fill: c, stroke: c})
  log(t)
  let time = getTime()
  r.animate({
    x: x2,
    y: y2
  }, time, 'linear', () => { callback() })
  t.animate({
    x: x2 + 20,
    y: y2 + 20
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
    this.elem.animate({x: this.x - 40, color: 'black'}, 300, 'easeOutQuint', function () {
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
    this.elem = paper.rect(this.x, this.y, 40, 40).attr({'fill': 'red'})
    this.text = paper.text(this.x + 20, this.y + 20, this.seqno).attr({'color': 'black'})
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
  constructor (windowSize, maxSeqNo, x, y, packetDistance) {
    // this.windowSize = windowSize
    this.windowSize = 5 // we'll add variable window sizes later, maybe. DOM manipulation like that is too complex right now
    this.maxSeqNo = maxSeqNo
    // stores seqno
    this.window = []
    // stores status of each packet
    this.status = []
    // stores frame objects
    this.frames = []
    this.packetDistance = packetDistance
    this.x = x
    this.y = y
    // initialize the window and status array
    for (let i = 0; i < windowSize; i++) {
      this.window.push(i)
      this.status.push('unsent')
    }
    this.draw()
    this.drawFrames()
    window.setInterval(this.sendUnsent.bind(this), conf.sendWait)
  }
  // this method is called every time an ACK is received
  handleACK (seqno) {
    log('receive ACK ' + seqno)
    let pos = 0
    // check the position of the ack'd packet
    for (let i = 0; i < this.windowSize; i++) {
      if (this.window[i] === seqno) {
        pos = i
        break
      }
    }
    // set everything before that to complete
    for (let i = 0; i < pos; i++) {
      this.status[i] = 'complete'
    }

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
      this.frames.push(new Frame(this.window[i], this.x + 40 * (i - this.windowSize / 2), this.y - 10))
      this.frames[this.frames.length - 1].setStatus(this.status[i])
    }
  }
  // this function runs every 1000 ms, sends the first previously unsent packet
  sendUnsent () {
    for (let i = 0; i < this.window.length; i++) {
      if (this.status[i] === 'unsent') {
        this.sendPacket(this.window[i])
        this.status[i] = 'waiting'
        window.setTimeout(() => this.timeout(this.window[i]), conf.timeout)
        break
      }
    }
    this.drawFrames()
  }
  timeout (seqno) {
    for (let i = 0; i < this.windowSize; i++) {
      if (this.window[i] === seqno && this.status[i] === 'waiting') {
        this.status[i] = 'unsent'
        window.setTimeout(() => this.timeout(seqno), conf.timeout)
        return
      }
    }
  }
  // slide the window to the right
  slideWindow () {
    this.window.push((this.window[this.window.length - 1].seqno + 1) % this.maxSeqNo)
    this.window.shift()
    this.status.push('unsent')
    this.status.shift()
  }
  draw () {
    background.circle(this.x, this.y, 140).attr({
      fill: 'green'
    })
    for (let i = 0; i < this.windowSize; i++) {
      background.rect(this.x + 40 * (i - this.windowSize / 2), this.y - 10, 40, 40)
    }
  }
  sendPacket (seqno) {
    log('send packet ' + seqno)
    send(this.x + 50, this.y - 100, this.x + this.packetDistance - 150, this.y - 100, seqno, 'red', () => receiver.handlePacket(seqno))
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
    log('receive ACK ' + seqno)
    if (seqno <= this.seqno) {
      this.sendACK(seqno)
    }
    if (seqno === this.seqno) {
      this.seqno = (this.seqno + 1) % this.maxSeqNo
      this.frame.slideLeft(true)
      this.frame = new Frame(this.seqno, this.x - 20, this.y - 20)
      this.frame.setStatus('waiting')
    }
  }
  sendACK (seqno) {
    log('send ACK ' + seqno)
    send(this.x - 120, this.y + 50, this.x - this.packetDistance + 120, this.y + 50, seqno, 'blue', () => sender.handleACK(seqno))
  }
  draw () {
    background.circle(this.x, this.y, 140).attr({
      fill: 'yellow'
    })
    background.rect(this.x - 20, this.y - 20, 40, 40)
    this.frame = new Frame(0, this.x - 20, this.y - 20)
    this.frame.setStatus('waiting')
  }
}
var packetDistance = 1000
var sender = new Sender(5, 10, 150, 400, packetDistance)
var receiver = new Receiver(10, 150 + packetDistance, 400, packetDistance)

window.onload = function () {
  var gui = new dat.GUI()
  gui.add(conf, 'rtt', 10, 1000).step(50)
  gui.add(conf, 'jitter', 10, 1000).step(50)
  gui.add(conf, 'sendWait', 10, 2000).step(50)
  gui.add(conf, 'timeout', 10, 10000).step(50)
}
