import anime from './anime.min.js'

class Frame {
  constructor (id, frameGroupSelector) {
    this.id = id
    this.status = 'unsent'
    // create the frame in the svg
  }
  setStatus (s) {
    this.status = s
  }
  // perform a sliding animation
  slideLeft (shouldVanish) {

  }
}

class Sender {
  constructor (windowSize, timeout) {
    // this.windowSize = windowSize
    this.windowSize = 5 // we'll add variable window sizes later, maybe. DOM manipulation like that is too complex right now
    this.timeout = timeout
    this.window = []
    for (let i = 0; i < windowSize; i++) {
      window.push(new Frame(i))
    }
    window.setInterval(this.sendUnsent, 10)
  }
  // this method is called every time an ACK is sent
  handleAck (packet) {

  }
  // this function runs every millisecond
  sendUnsent () {/*
    this.window.forEach((frame) => {
      if (frame.status === 'unsent') {
        frame.packet = new Packet(frame.id, 'receiver', true)
      }
    })*/
  }
  // slide the window to the right n positions
  slideWindow (n) {

  }
};

class Receiver {
  constructor () {
    this.recvno = 0
  }
  handlePacket (packet) {
    if (packet.id < this.recvno) {
      this.sendACK(packet.id)
    }
    if (packet.id === this.recvno) {
      this.sendACK(packet.id)
      this.recvno++
    }
  }
}

class Packet {
  constructor (id, destination, willSucceed) {
    this.id = id
    this.destination = destination
    if (typeof willSucceed === 'undefined') {
      this.willSucceed = true
    } else {
      this.willSucceed = false
    }
  }
}

var sender = new Sender()
var receiver = new Receiver()
console.log(sender.window)
