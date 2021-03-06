import Raphael from './raphael.min.js'
import dat from './dat.gui.min.js'
import loadObj from './loadObj.js'
var background = Raphael('0', '0', '100%', '100%')
background.rect(0, 0, '100%', '100%').attr({'fill': 'black'})
var paper = Raphael('0', '0', '100%', '100%')

var conf = {
  rtt: 1500,
  jitter: 0,
  sendWait: 850,
  timeout: 1850,
  dropRate: 0
}

var stats = {
  sent: 0,
  received: 0,
  dropped: 0
}

var rates = {
  dropRate: 0.0,
  transmitRate: 0.0
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

  if (Math.random() > conf.dropRate) {
    let t = paper.text(x1 + 20, y1 + 20, seqno).attr({fill: c, stroke: c, 'font-size': '100%'})
    log(t)
    let time = getTime()
    r.animate({
      x: x2,
      y: y2
    }, time, 'easeInQuad', () => { callback() })
    t.animate({
      x: x2 + 20,
      y: y2 + 20
    }, time, 'easeInQuad ', () => { t.remove(); r.remove() })
  } else { // dropped packet
    let x2n = Math.abs(x1 - x2) / 2 + (x1 < x2 ? x1 : x2)
    let time = getTime() / 2
    let t = paper.text(x1 + 20, y1 + 20, seqno).attr({fill: c, stroke: c, 'font-size': '100%'})
    log(t)
    r.animate({
      x: x2n,
      y: y2,
      fill: 'black',
      stroke: 'black'
    }, time, 'easeInQuad')
    t.animate({
      x: x2n + 20,
      y: y2 + 20,
      fill: 'red',
      stroke: 'red'
    }, time, 'easeInQuad ', () => { t.remove(); r.remove() })
  }
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
    let f = () => {
      this.sendUnsent()
      window.setTimeout(f, conf.sendWait)
    }
    window.setTimeout(f, conf.sendWait)
  }
  // this method is called every time an ACK is received
  handleACK (seqno) {
    log('receive ACK ' + seqno)
    let pos = -1
    // check the position of the ack'd packet
    for (let i = 0; i < this.windowSize; i++) {
      if (this.window[i] === (seqno - 1)) {
        pos = i
        break
      }
    }
    // set everything before that to complete
    for (let i = 0; i <= pos; i++) {
      this.status[i] = 'complete'
    }
    window.setTimeout(() => {
      while (this.status[0] === 'complete') {
        this.status.shift()
        this.window.shift()
        this.status.push('unsent')
        this.window.push((this.window[this.window.length - 1] + 1) % this.maxSeqNo)
        this.drawFrames()
      }
    }, 500)
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
      if (this.window[i] !== seqno) {
        continue
      }
      if (this.status[i] === 'waiting') {
        this.status[i] = 'unsent'
        this.drawFrames()
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
    this.drawFrames()
  }
  draw () {
    background.circle(this.x, this.y, 140).attr({
      fill: 'green'
    })
    for (let i = 0; i < this.windowSize; i++) {
      background.rect(this.x + 40 * (i - this.windowSize / 2), this.y - 10, 40, 40)
    }
    this.drawFrames()
    let d = `M ${this.x - 40} ${this.y - 50}
    l 10 20 l `
    this.slideArrow = paper.path(d)
  }
  sendPacket (seqno) {
    log('send packet ' + seqno)
    stats.sent++
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
    this.sendACK(this.seqno)
    if (seqno === this.seqno) {
      this.seqno = (this.seqno + 1) % this.maxSeqNo
      this.frame.slideLeft(true)
      this.frame = new Frame(this.seqno, this.x - 20, this.y - 20)
      this.frame.setStatus('waiting')
      stats.received++
    } else {
      stats.dropped++
    }
  }
  sendACK (seqno) {
    log('send ACK ' + seqno)
    send(this.x - 120, this.y + 50, this.x - this.packetDistance + 120, this.y + 50, seqno, 'blue', () => sender.handleACK(seqno))
  }
  draw () {
    background.circle(this.x, this.y, 140).attr({
      fill: 'yellow',
      stroke: 'green'
    })
    background.rect(this.x - 20, this.y - 20, 40, 40)
    this.frame = new Frame(0, this.x - 20, this.y - 20)
    this.frame.setStatus('waiting')
  }
}
var packetDistance = 1000
var sender = new Sender(5, 12, 150, 400, packetDistance)
var receiver = new Receiver(12, 150 + packetDistance, 400, packetDistance)
conf = loadObj['remembered']['stresstest']['0']
window.onload = function () {
  var gui = new dat.GUI(loadObj)
  gui.add(conf, 'rtt', 10, 10000).step(50)
  gui.add(conf, 'jitter', 10, 10000).step(50)
  gui.add(conf, 'sendWait', 10, 10000).step(50)
  gui.add(conf, 'timeout', 10, 10000).step(50)
  gui.add(conf, 'dropRate', 0, 1).step(0.01)
  gui.remember(conf)
  var statsPane = new dat.GUI()
  window.setInterval(() => {
    rates.dropRate = stats.dropped / stats.sent
    rates.transmitRate = stats.received / stats.sent
  }, 500)
  statsPane.add(stats, 'sent').listen()
  statsPane.add(stats, 'received').listen()
  statsPane.add(stats, 'dropped').listen()
  // statsPane.remember(stats)
  var ratesPane = new dat.GUI()
  ratesPane.add(rates, 'transmitRate').step(0.01).listen()
  ratesPane.add(rates, 'dropRate').step(0.01).listen()
}
