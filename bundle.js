/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _raphaelMin = _interopRequireDefault(__webpack_require__(2));

var _datGuiMin = _interopRequireDefault(__webpack_require__(3));

var _loadObj = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var background = (0, _raphaelMin.default)('0', '0', '100%', '100%');
background.rect(0, 0, '100%', '100%').attr({
  'fill': 'black'
});
var paper = (0, _raphaelMin.default)('0', '0', '100%', '100%');
var conf = {
  rtt: 1500,
  jitter: 0,
  sendWait: 850,
  timeout: 1850,
  dropRate: 0
};
var stats = {
  sent: 0,
  received: 0,
  dropped: 0
};
var rates = {
  dropRate: 0.0,
  transmitRate: 0.0
};

function log(s) {// console.log(s)
}

function getTime() {
  return conf.rtt + (2 * Math.random() - 1) * conf.jitter;
}

function send(x1, y1, x2, y2, seqno, color, callback) {
  var r = paper.rect(x1, y1, 40, 40).attr({
    fill: color
  });
  var c = color === 'blue' ? 'red' : 'blue';
  c = 'white';

  if (Math.random() > conf.dropRate) {
    var t = paper.text(x1 + 20, y1 + 20, seqno).attr({
      fill: c,
      stroke: c,
      'font-size': '100%'
    });
    log(t);
    var time = getTime();
    r.animate({
      x: x2,
      y: y2
    }, time, 'easeInQuad', function () {
      callback();
    });
    t.animate({
      x: x2 + 20,
      y: y2 + 20
    }, time, 'easeInQuad ', function () {
      t.remove();
      r.remove();
    });
  } else {
    // dropped packet
    var x2n = Math.abs(x1 - x2) / 2 + (x1 < x2 ? x1 : x2);

    var _time = getTime() / 2;

    var _t = paper.text(x1 + 20, y1 + 20, seqno).attr({
      fill: c,
      stroke: c,
      'font-size': '100%'
    });

    log(_t);
    r.animate({
      x: x2n,
      y: y2,
      fill: 'black',
      stroke: 'black'
    }, _time, 'easeInQuad');

    _t.animate({
      x: x2n + 20,
      y: y2 + 20,
      fill: 'red',
      stroke: 'red'
    }, _time, 'easeInQuad ', function () {
      _t.remove();

      r.remove();
    });
  }
}

var Frame =
/*#__PURE__*/
function () {
  // members: status, x, y, elem
  // params: current seqno, coords to draw at
  function Frame(seqno, x, y) {
    _classCallCheck(this, Frame);

    this.seqno = seqno; // status can be unsent, waiting, or complete

    this.status = 'unsent';
    this.x = x;
    this.y = y;
    this.draw();
  } // perform a sliding animation


  _createClass(Frame, [{
    key: "slideLeft",
    value: function slideLeft(shouldVanish) {
      this.elem.animate({
        x: this.x - 40,
        color: 'black'
      }, 300, 'easeOutQuint', function () {
        if (shouldVanish) {
          this.elem.remove();
        }
      }.bind({
        shouldVanish: shouldVanish,
        elem: this.elem
      }));
      this.text.animate({
        x: this.x - 10,
        color: 'black'
      }, 300, 'easeOutQuint', function () {
        if (shouldVanish) {
          this.text.remove();
        }
      }.bind({
        shouldVanish: shouldVanish,
        text: this.text
      }));
    }
  }, {
    key: "draw",
    value: function draw() {
      this.elem = paper.rect(this.x, this.y, 40, 40).attr({
        'fill': 'red'
      });
      this.text = paper.text(this.x + 20, this.y + 20, this.seqno).attr({
        'color': 'black'
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      this.elem.remove();
      this.text.remove();
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;

      switch (status) {
        case 'complete':
          this.elem.attr({
            'fill': 'lightblue'
          });
          break;

        case 'waiting':
          this.elem.attr({
            'fill': 'orange'
          });
          break;

        case 'unsent':
          this.elem.attr({
            'fill': 'red'
          });
          break;
      }
    }
  }]);

  return Frame;
}();

var Sender =
/*#__PURE__*/
function () {
  // offsets are coords of the center of the circle
  function Sender(windowSize, maxSeqNo, x, y, packetDistance) {
    var _this = this;

    _classCallCheck(this, Sender);

    // this.windowSize = windowSize
    this.windowSize = 5; // we'll add variable window sizes later, maybe. DOM manipulation like that is too complex right now

    this.maxSeqNo = maxSeqNo; // stores seqno

    this.window = []; // stores status of each packet

    this.status = []; // stores frame objects

    this.frames = [];
    this.packetDistance = packetDistance;
    this.x = x;
    this.y = y; // initialize the window and status array

    for (var i = 0; i < windowSize; i++) {
      this.window.push(i);
      this.status.push('unsent');
    }

    this.draw();
    this.drawFrames();

    var f = function f() {
      _this.sendUnsent();

      window.setTimeout(f, conf.sendWait);
    };

    window.setTimeout(f, conf.sendWait);
  } // this method is called every time an ACK is received


  _createClass(Sender, [{
    key: "handleACK",
    value: function handleACK(seqno) {
      var _this2 = this;

      log('receive ACK ' + seqno);
      var pos = -1; // check the position of the ack'd packet

      for (var i = 0; i < this.windowSize; i++) {
        if (this.window[i] === seqno - 1) {
          pos = i;
          break;
        }
      } // set everything before that to complete


      for (var _i = 0; _i <= pos; _i++) {
        this.status[_i] = 'complete';
      }

      window.setTimeout(function () {
        while (_this2.status[0] === 'complete') {
          _this2.status.shift();

          _this2.window.shift();

          _this2.status.push('unsent');

          _this2.window.push((_this2.window[_this2.window.length - 1] + 1) % _this2.maxSeqNo);

          _this2.drawFrames();
        }
      }, 500);
      this.drawFrames();
    }
  }, {
    key: "drawFrames",
    value: function drawFrames() {
      this.frames.forEach(function (e) {
        return e.remove();
      });
      this.frames = [];

      for (var i = 0; i < this.windowSize; i++) {
        this.frames.push(new Frame(this.window[i], this.x + 40 * (i - this.windowSize / 2), this.y - 10));
        this.frames[this.frames.length - 1].setStatus(this.status[i]);
      }
    } // this function runs every 1000 ms, sends the first previously unsent packet

  }, {
    key: "sendUnsent",
    value: function sendUnsent() {
      var _this3 = this;

      var _loop = function _loop(i) {
        if (_this3.status[i] === 'unsent') {
          _this3.sendPacket(_this3.window[i]);

          _this3.status[i] = 'waiting';
          window.setTimeout(function () {
            return _this3.timeout(_this3.window[i]);
          }, conf.timeout);
          return "break";
        }
      };

      for (var i = 0; i < this.window.length; i++) {
        var _ret = _loop(i);

        if (_ret === "break") break;
      }

      this.drawFrames();
    }
  }, {
    key: "timeout",
    value: function timeout(seqno) {
      for (var i = 0; i < this.windowSize; i++) {
        if (this.window[i] !== seqno) {
          continue;
        }

        if (this.status[i] === 'waiting') {
          this.status[i] = 'unsent';
          this.drawFrames();
          return;
        }
      }

      this.drawFrames();
    } // slide the window to the right

  }, {
    key: "slideWindow",
    value: function slideWindow() {
      this.window.push((this.window[this.window.length - 1].seqno + 1) % this.maxSeqNo);
      this.window.shift();
      this.status.push('unsent');
      this.status.shift();
      this.drawFrames();
    }
  }, {
    key: "draw",
    value: function draw() {
      background.circle(this.x, this.y, 140).attr({
        fill: 'green'
      });

      for (var i = 0; i < this.windowSize; i++) {
        background.rect(this.x + 40 * (i - this.windowSize / 2), this.y - 10, 40, 40);
      }

      this.drawFrames();
      var d = "M ".concat(this.x - 40, " ").concat(this.y - 50, "\n    l 10 20 l ");
      this.slideArrow = paper.path(d);
    }
  }, {
    key: "sendPacket",
    value: function sendPacket(seqno) {
      log('send packet ' + seqno);
      stats.sent++;
      send(this.x + 50, this.y - 100, this.x + this.packetDistance - 150, this.y - 100, seqno, 'red', function () {
        return receiver.handlePacket(seqno);
      });

      for (var i = 0; i < this.windowSize; i++) {
        if (this.window[i] === seqno) {
          this.status[i] = 'waiting';
          break;
        }
      }

      this.drawFrames();
    }
  }]);

  return Sender;
}();

;

var Receiver =
/*#__PURE__*/
function () {
  function Receiver(maxSeqNo, x, y, packetDistance) {
    _classCallCheck(this, Receiver);

    this.seqno = 0;
    this.maxSeqNo = maxSeqNo;
    this.x = x;
    this.y = y;
    this.packetDistance = packetDistance;
    this.draw();
  }

  _createClass(Receiver, [{
    key: "handlePacket",
    value: function handlePacket(seqno) {
      log('receive ACK ' + seqno);
      this.sendACK(this.seqno);

      if (seqno === this.seqno) {
        this.seqno = (this.seqno + 1) % this.maxSeqNo;
        this.frame.slideLeft(true);
        this.frame = new Frame(this.seqno, this.x - 20, this.y - 20);
        this.frame.setStatus('waiting');
        stats.received++;
      } else {
        stats.dropped++;
      }
    }
  }, {
    key: "sendACK",
    value: function sendACK(seqno) {
      log('send ACK ' + seqno);
      send(this.x - 120, this.y + 50, this.x - this.packetDistance + 120, this.y + 50, seqno, 'blue', function () {
        return sender.handleACK(seqno);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      background.circle(this.x, this.y, 140).attr({
        fill: 'yellow',
        stroke: 'green'
      });
      background.rect(this.x - 20, this.y - 20, 40, 40);
      this.frame = new Frame(0, this.x - 20, this.y - 20);
      this.frame.setStatus('waiting');
    }
  }]);

  return Receiver;
}();

var packetDistance = 1000;
var sender = new Sender(5, 12, 150, 400, packetDistance);
var receiver = new Receiver(12, 150 + packetDistance, 400, packetDistance);
conf = _loadObj.default['remembered']['stresstest']['0'];

window.onload = function () {
  var gui = new _datGuiMin.default.GUI(_loadObj.default);
  gui.add(conf, 'rtt', 10, 10000).step(50);
  gui.add(conf, 'jitter', 10, 10000).step(50);
  gui.add(conf, 'sendWait', 10, 10000).step(50);
  gui.add(conf, 'timeout', 10, 10000).step(50);
  gui.add(conf, 'dropRate', 0, 1).step(0.01);
  gui.remember(conf);
  var statsPane = new _datGuiMin.default.GUI();
  window.setInterval(function () {
    rates.dropRate = stats.dropped / stats.sent;
    rates.transmitRate = stats.received / stats.sent;
  }, 500);
  statsPane.add(stats, 'sent').listen();
  statsPane.add(stats, 'received').listen();
  statsPane.add(stats, 'dropped').listen(); // statsPane.remember(stats)

  var ratesPane = new _datGuiMin.default.GUI();
  ratesPane.add(rates, 'transmitRate').step(0.01).listen();
  ratesPane.add(rates, 'dropRate').step(0.01).listen();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function t(e, r) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = r() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Raphael = r() : e.Raphael = r();
}(this, function () {
  return function (t) {
    function e(i) {
      if (r[i]) return r[i].exports;
      var n = r[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return t[i].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports;
    }

    var r = {};
    return e.m = t, e.c = r, e.p = "", e(0);
  }([function (t, e, r) {
    var i, n;
    i = [r(1), r(3), r(4)], n = function (t) {
      return t;
    }.apply(e, i), !(void 0 !== n && (t.exports = n));
  }, function (t, e, r) {
    var i, n;
    i = [r(2)], n = function (t) {
      function e(r) {
        if (e.is(r, "function")) return w ? r() : t.on("raphael.DOMload", r);
        if (e.is(r, Q)) return e._engine.create[z](e, r.splice(0, 3 + e.is(r[0], $))).add(r);
        var i = Array.prototype.slice.call(arguments, 0);

        if (e.is(i[i.length - 1], "function")) {
          var n = i.pop();
          return w ? n.call(e._engine.create[z](e, i)) : t.on("raphael.DOMload", function () {
            n.call(e._engine.create[z](e, i));
          });
        }

        return e._engine.create[z](e, arguments);
      }

      function r(t) {
        if ("function" == typeof t || Object(t) !== t) return t;
        var e = new t.constructor();

        for (var i in t) {
          t[A](i) && (e[i] = r(t[i]));
        }

        return e;
      }

      function i(t, e) {
        for (var r = 0, i = t.length; r < i; r++) {
          if (t[r] === e) return t.push(t.splice(r, 1)[0]);
        }
      }

      function n(t, e, r) {
        function n() {
          var a = Array.prototype.slice.call(arguments, 0),
              s = a.join("␀"),
              o = n.cache = n.cache || {},
              l = n.count = n.count || [];
          return o[A](s) ? (i(l, s), r ? r(o[s]) : o[s]) : (l.length >= 1e3 && delete o[l.shift()], l.push(s), o[s] = t[z](e, a), r ? r(o[s]) : o[s]);
        }

        return n;
      }

      function a() {
        return this.hex;
      }

      function s(t, e) {
        for (var r = [], i = 0, n = t.length; n - 2 * !e > i; i += 2) {
          var a = [{
            x: +t[i - 2],
            y: +t[i - 1]
          }, {
            x: +t[i],
            y: +t[i + 1]
          }, {
            x: +t[i + 2],
            y: +t[i + 3]
          }, {
            x: +t[i + 4],
            y: +t[i + 5]
          }];
          e ? i ? n - 4 == i ? a[3] = {
            x: +t[0],
            y: +t[1]
          } : n - 2 == i && (a[2] = {
            x: +t[0],
            y: +t[1]
          }, a[3] = {
            x: +t[2],
            y: +t[3]
          }) : a[0] = {
            x: +t[n - 2],
            y: +t[n - 1]
          } : n - 4 == i ? a[3] = a[2] : i || (a[0] = {
            x: +t[i],
            y: +t[i + 1]
          }), r.push(["C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y]);
        }

        return r;
      }

      function o(t, e, r, i, n) {
        var a = -3 * e + 9 * r - 9 * i + 3 * n,
            s = t * a + 6 * e - 12 * r + 6 * i;
        return t * s - 3 * e + 3 * r;
      }

      function l(t, e, r, i, n, a, s, l, h) {
        null == h && (h = 1), h = h > 1 ? 1 : h < 0 ? 0 : h;

        for (var u = h / 2, c = 12, f = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], d = 0, g = 0; g < c; g++) {
          var v = u * f[g] + u,
              x = o(v, t, r, n, s),
              y = o(v, e, i, a, l),
              m = x * x + y * y;
          d += p[g] * Y.sqrt(m);
        }

        return u * d;
      }

      function h(t, e, r, i, n, a, s, o, h) {
        if (!(h < 0 || l(t, e, r, i, n, a, s, o) < h)) {
          var u = 1,
              c = u / 2,
              f = u - c,
              p,
              d = .01;

          for (p = l(t, e, r, i, n, a, s, o, f); H(p - h) > d;) {
            c /= 2, f += (p < h ? 1 : -1) * c, p = l(t, e, r, i, n, a, s, o, f);
          }

          return f;
        }
      }

      function u(t, e, r, i, n, a, s, o) {
        if (!(W(t, r) < G(n, s) || G(t, r) > W(n, s) || W(e, i) < G(a, o) || G(e, i) > W(a, o))) {
          var l = (t * i - e * r) * (n - s) - (t - r) * (n * o - a * s),
              h = (t * i - e * r) * (a - o) - (e - i) * (n * o - a * s),
              u = (t - r) * (a - o) - (e - i) * (n - s);

          if (u) {
            var c = l / u,
                f = h / u,
                p = +c.toFixed(2),
                d = +f.toFixed(2);
            if (!(p < +G(t, r).toFixed(2) || p > +W(t, r).toFixed(2) || p < +G(n, s).toFixed(2) || p > +W(n, s).toFixed(2) || d < +G(e, i).toFixed(2) || d > +W(e, i).toFixed(2) || d < +G(a, o).toFixed(2) || d > +W(a, o).toFixed(2))) return {
              x: c,
              y: f
            };
          }
        }
      }

      function c(t, e) {
        return p(t, e);
      }

      function f(t, e) {
        return p(t, e, 1);
      }

      function p(t, r, i) {
        var n = e.bezierBBox(t),
            a = e.bezierBBox(r);
        if (!e.isBBoxIntersect(n, a)) return i ? 0 : [];

        for (var s = l.apply(0, t), o = l.apply(0, r), h = W(~~(s / 5), 1), c = W(~~(o / 5), 1), f = [], p = [], d = {}, g = i ? 0 : [], v = 0; v < h + 1; v++) {
          var x = e.findDotsAtSegment.apply(e, t.concat(v / h));
          f.push({
            x: x.x,
            y: x.y,
            t: v / h
          });
        }

        for (v = 0; v < c + 1; v++) {
          x = e.findDotsAtSegment.apply(e, r.concat(v / c)), p.push({
            x: x.x,
            y: x.y,
            t: v / c
          });
        }

        for (v = 0; v < h; v++) {
          for (var y = 0; y < c; y++) {
            var m = f[v],
                b = f[v + 1],
                _ = p[y],
                w = p[y + 1],
                k = H(b.x - m.x) < .001 ? "y" : "x",
                B = H(w.x - _.x) < .001 ? "y" : "x",
                C = u(m.x, m.y, b.x, b.y, _.x, _.y, w.x, w.y);

            if (C) {
              if (d[C.x.toFixed(4)] == C.y.toFixed(4)) continue;
              d[C.x.toFixed(4)] = C.y.toFixed(4);

              var S = m.t + H((C[k] - m[k]) / (b[k] - m[k])) * (b.t - m.t),
                  A = _.t + H((C[B] - _[B]) / (w[B] - _[B])) * (w.t - _.t);

              S >= 0 && S <= 1.001 && A >= 0 && A <= 1.001 && (i ? g++ : g.push({
                x: C.x,
                y: C.y,
                t1: G(S, 1),
                t2: G(A, 1)
              }));
            }
          }
        }

        return g;
      }

      function d(t, r, i) {
        t = e._path2curve(t), r = e._path2curve(r);

        for (var n, a, s, o, l, h, u, c, f, d, g = i ? 0 : [], v = 0, x = t.length; v < x; v++) {
          var y = t[v];
          if ("M" == y[0]) n = l = y[1], a = h = y[2];else {
            "C" == y[0] ? (f = [n, a].concat(y.slice(1)), n = f[6], a = f[7]) : (f = [n, a, n, a, l, h, l, h], n = l, a = h);

            for (var m = 0, b = r.length; m < b; m++) {
              var _ = r[m];
              if ("M" == _[0]) s = u = _[1], o = c = _[2];else {
                "C" == _[0] ? (d = [s, o].concat(_.slice(1)), s = d[6], o = d[7]) : (d = [s, o, s, o, u, c, u, c], s = u, o = c);
                var w = p(f, d, i);
                if (i) g += w;else {
                  for (var k = 0, B = w.length; k < B; k++) {
                    w[k].segment1 = v, w[k].segment2 = m, w[k].bez1 = f, w[k].bez2 = d;
                  }

                  g = g.concat(w);
                }
              }
            }
          }
        }

        return g;
      }

      function g(t, e, r, i, n, a) {
        null != t ? (this.a = +t, this.b = +e, this.c = +r, this.d = +i, this.e = +n, this.f = +a) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0);
      }

      function v() {
        return this.x + j + this.y;
      }

      function x() {
        return this.x + j + this.y + j + this.width + " × " + this.height;
      }

      function y(t, e, r, i, n, a) {
        function s(t) {
          return ((c * t + u) * t + h) * t;
        }

        function o(t, e) {
          var r = l(t, e);
          return ((d * r + p) * r + f) * r;
        }

        function l(t, e) {
          var r, i, n, a, o, l;

          for (n = t, l = 0; l < 8; l++) {
            if (a = s(n) - t, H(a) < e) return n;
            if (o = (3 * c * n + 2 * u) * n + h, H(o) < 1e-6) break;
            n -= a / o;
          }

          if (r = 0, i = 1, n = t, n < r) return r;
          if (n > i) return i;

          for (; r < i;) {
            if (a = s(n), H(a - t) < e) return n;
            t > a ? r = n : i = n, n = (i - r) / 2 + r;
          }

          return n;
        }

        var h = 3 * e,
            u = 3 * (i - e) - h,
            c = 1 - h - u,
            f = 3 * r,
            p = 3 * (n - r) - f,
            d = 1 - f - p;
        return o(t, 1 / (200 * a));
      }

      function m(t, e) {
        var r = [],
            i = {};

        if (this.ms = e, this.times = 1, t) {
          for (var n in t) {
            t[A](n) && (i[ht(n)] = t[n], r.push(ht(n)));
          }

          r.sort(Bt);
        }

        this.anim = i, this.top = r[r.length - 1], this.percents = r;
      }

      function b(r, i, n, a, s, o) {
        n = ht(n);
        var l,
            h,
            u,
            c = [],
            f,
            p,
            d,
            v = r.ms,
            x = {},
            m = {},
            b = {};
        if (a) for (w = 0, B = Ee.length; w < B; w++) {
          var _ = Ee[w];

          if (_.el.id == i.id && _.anim == r) {
            _.percent != n ? (Ee.splice(w, 1), u = 1) : h = _, i.attr(_.totalOrigin);
            break;
          }
        } else a = +m;

        for (var w = 0, B = r.percents.length; w < B; w++) {
          if (r.percents[w] == n || r.percents[w] > a * r.top) {
            n = r.percents[w], p = r.percents[w - 1] || 0, v = v / r.top * (n - p), f = r.percents[w + 1], l = r.anim[n];
            break;
          }

          a && i.attr(r.anim[r.percents[w]]);
        }

        if (l) {
          if (h) h.initstatus = a, h.start = new Date() - h.ms * a;else {
            for (var C in l) {
              if (l[A](C) && (pt[A](C) || i.paper.customAttributes[A](C))) switch (x[C] = i.attr(C), null == x[C] && (x[C] = ft[C]), m[C] = l[C], pt[C]) {
                case $:
                  b[C] = (m[C] - x[C]) / v;
                  break;

                case "colour":
                  x[C] = e.getRGB(x[C]);
                  var S = e.getRGB(m[C]);
                  b[C] = {
                    r: (S.r - x[C].r) / v,
                    g: (S.g - x[C].g) / v,
                    b: (S.b - x[C].b) / v
                  };
                  break;

                case "path":
                  var T = Qt(x[C], m[C]),
                      E = T[1];

                  for (x[C] = T[0], b[C] = [], w = 0, B = x[C].length; w < B; w++) {
                    b[C][w] = [0];

                    for (var M = 1, N = x[C][w].length; M < N; M++) {
                      b[C][w][M] = (E[w][M] - x[C][w][M]) / v;
                    }
                  }

                  break;

                case "transform":
                  var L = i._,
                      z = le(L[C], m[C]);
                  if (z) for (x[C] = z.from, m[C] = z.to, b[C] = [], b[C].real = !0, w = 0, B = x[C].length; w < B; w++) {
                    for (b[C][w] = [x[C][w][0]], M = 1, N = x[C][w].length; M < N; M++) {
                      b[C][w][M] = (m[C][w][M] - x[C][w][M]) / v;
                    }
                  } else {
                    var F = i.matrix || new g(),
                        R = {
                      _: {
                        transform: L.transform
                      },
                      getBBox: function getBBox() {
                        return i.getBBox(1);
                      }
                    };
                    x[C] = [F.a, F.b, F.c, F.d, F.e, F.f], se(R, m[C]), m[C] = R._.transform, b[C] = [(R.matrix.a - F.a) / v, (R.matrix.b - F.b) / v, (R.matrix.c - F.c) / v, (R.matrix.d - F.d) / v, (R.matrix.e - F.e) / v, (R.matrix.f - F.f) / v];
                  }
                  break;

                case "csv":
                  var j = I(l[C])[q](k),
                      D = I(x[C])[q](k);
                  if ("clip-rect" == C) for (x[C] = D, b[C] = [], w = D.length; w--;) {
                    b[C][w] = (j[w] - x[C][w]) / v;
                  }
                  m[C] = j;
                  break;

                default:
                  for (j = [][P](l[C]), D = [][P](x[C]), b[C] = [], w = i.paper.customAttributes[C].length; w--;) {
                    b[C][w] = ((j[w] || 0) - (D[w] || 0)) / v;
                  }

              }
            }

            var V = l.easing,
                O = e.easing_formulas[V];
            if (!O) if (O = I(V).match(st), O && 5 == O.length) {
              var Y = O;

              O = function O(t) {
                return y(t, +Y[1], +Y[2], +Y[3], +Y[4], v);
              };
            } else O = St;
            if (d = l.start || r.start || +new Date(), _ = {
              anim: r,
              percent: n,
              timestamp: d,
              start: d + (r.del || 0),
              status: 0,
              initstatus: a || 0,
              stop: !1,
              ms: v,
              easing: O,
              from: x,
              diff: b,
              to: m,
              el: i,
              callback: l.callback,
              prev: p,
              next: f,
              repeat: o || r.times,
              origin: i.attr(),
              totalOrigin: s
            }, Ee.push(_), a && !h && !u && (_.stop = !0, _.start = new Date() - v * a, 1 == Ee.length)) return Ne();
            u && (_.start = new Date() - _.ms * a), 1 == Ee.length && Me(Ne);
          }
          t("raphael.anim.start." + i.id, i, r);
        }
      }

      function _(t) {
        for (var e = 0; e < Ee.length; e++) {
          Ee[e].el.paper == t && Ee.splice(e--, 1);
        }
      }

      e.version = "2.2.0", e.eve = t;

      var w,
          k = /[, ]+/,
          B = {
        circle: 1,
        rect: 1,
        path: 1,
        ellipse: 1,
        text: 1,
        image: 1
      },
          C = /\{(\d+)\}/g,
          S = "prototype",
          A = "hasOwnProperty",
          T = {
        doc: document,
        win: window
      },
          E = {
        was: Object.prototype[A].call(T.win, "Raphael"),
        is: T.win.Raphael
      },
          M = function M() {
        this.ca = this.customAttributes = {};
      },
          N,
          L = "appendChild",
          z = "apply",
          P = "concat",
          F = "ontouchstart" in T.win || T.win.DocumentTouch && T.doc instanceof DocumentTouch,
          R = "",
          j = " ",
          I = String,
          q = "split",
          D = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](j),
          V = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      },
          O = I.prototype.toLowerCase,
          Y = Math,
          W = Y.max,
          G = Y.min,
          H = Y.abs,
          X = Y.pow,
          U = Y.PI,
          $ = "number",
          Z = "string",
          Q = "array",
          J = "toString",
          K = "fill",
          tt = Object.prototype.toString,
          et = {},
          rt = "push",
          it = e._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
          nt = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
          at = {
        NaN: 1,
        Infinity: 1,
        "-Infinity": 1
      },
          st = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
          ot = Y.round,
          lt = "setAttribute",
          ht = parseFloat,
          ut = parseInt,
          ct = I.prototype.toUpperCase,
          ft = e._availableAttrs = {
        "arrow-end": "none",
        "arrow-start": "none",
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        fill: "#fff",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: 0,
        height: 0,
        href: "http://raphaeljs.com/",
        "letter-spacing": 0,
        opacity: 1,
        path: "M0,0",
        r: 0,
        rx: 0,
        ry: 0,
        src: "",
        stroke: "#000",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        "text-anchor": "middle",
        title: "Raphael",
        transform: "",
        width: 0,
        x: 0,
        y: 0,
        "class": ""
      },
          pt = e._availableAnimAttrs = {
        blur: $,
        "clip-rect": "csv",
        cx: $,
        cy: $,
        fill: "colour",
        "fill-opacity": $,
        "font-size": $,
        height: $,
        opacity: $,
        path: "path",
        r: $,
        rx: $,
        ry: $,
        stroke: "colour",
        "stroke-opacity": $,
        "stroke-width": $,
        transform: "transform",
        width: $,
        x: $,
        y: $
      },
          dt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
          gt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
          vt = {
        hs: 1,
        rg: 1
      },
          xt = /,?([achlmqrstvxz]),?/gi,
          yt = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
          mt = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
          bt = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
          _t = e._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
          wt = {},
          kt = function kt(t, e) {
        return t.key - e.key;
      },
          Bt = function Bt(t, e) {
        return ht(t) - ht(e);
      },
          Ct = function Ct() {},
          St = function St(t) {
        return t;
      },
          At = e._rectPath = function (t, e, r, i, n) {
        return n ? [["M", t + n, e], ["l", r - 2 * n, 0], ["a", n, n, 0, 0, 1, n, n], ["l", 0, i - 2 * n], ["a", n, n, 0, 0, 1, -n, n], ["l", 2 * n - r, 0], ["a", n, n, 0, 0, 1, -n, -n], ["l", 0, 2 * n - i], ["a", n, n, 0, 0, 1, n, -n], ["z"]] : [["M", t, e], ["l", r, 0], ["l", 0, i], ["l", -r, 0], ["z"]];
      },
          Tt = function Tt(t, e, r, i) {
        return null == i && (i = r), [["M", t, e], ["m", 0, -i], ["a", r, i, 0, 1, 1, 0, 2 * i], ["a", r, i, 0, 1, 1, 0, -2 * i], ["z"]];
      },
          Et = e._getPath = {
        path: function path(t) {
          return t.attr("path");
        },
        circle: function circle(t) {
          var e = t.attrs;
          return Tt(e.cx, e.cy, e.r);
        },
        ellipse: function ellipse(t) {
          var e = t.attrs;
          return Tt(e.cx, e.cy, e.rx, e.ry);
        },
        rect: function rect(t) {
          var e = t.attrs;
          return At(e.x, e.y, e.width, e.height, e.r);
        },
        image: function image(t) {
          var e = t.attrs;
          return At(e.x, e.y, e.width, e.height);
        },
        text: function text(t) {
          var e = t._getBBox();

          return At(e.x, e.y, e.width, e.height);
        },
        set: function set(t) {
          var e = t._getBBox();

          return At(e.x, e.y, e.width, e.height);
        }
      },
          Mt = e.mapPath = function (t, e) {
        if (!e) return t;
        var r, i, n, a, s, o, l;

        for (t = Qt(t), n = 0, s = t.length; n < s; n++) {
          for (l = t[n], a = 1, o = l.length; a < o; a += 2) {
            r = e.x(l[a], l[a + 1]), i = e.y(l[a], l[a + 1]), l[a] = r, l[a + 1] = i;
          }
        }

        return t;
      };

      if (e._g = T, e.type = T.win.SVGAngle || T.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == e.type) {
        var Nt = T.doc.createElement("div"),
            Lt;
        if (Nt.innerHTML = '<v:shape adj="1"/>', Lt = Nt.firstChild, Lt.style.behavior = "url(#default#VML)", !Lt || "object" != _typeof(Lt.adj)) return e.type = R;
        Nt = null;
      }

      e.svg = !(e.vml = "VML" == e.type), e._Paper = M, e.fn = N = M.prototype = e.prototype, e._id = 0, e.is = function (t, e) {
        return e = O.call(e), "finite" == e ? !at[A](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == _typeof(t) && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || tt.call(t).slice(8, -1).toLowerCase() == e;
      }, e.angle = function (t, r, i, n, a, s) {
        if (null == a) {
          var o = t - i,
              l = r - n;
          return o || l ? (180 + 180 * Y.atan2(-l, -o) / U + 360) % 360 : 0;
        }

        return e.angle(t, r, a, s) - e.angle(i, n, a, s);
      }, e.rad = function (t) {
        return t % 360 * U / 180;
      }, e.deg = function (t) {
        return Math.round(180 * t / U % 360 * 1e3) / 1e3;
      }, e.snapTo = function (t, r, i) {
        if (i = e.is(i, "finite") ? i : 10, e.is(t, Q)) {
          for (var n = t.length; n--;) {
            if (H(t[n] - r) <= i) return t[n];
          }
        } else {
          t = +t;
          var a = r % t;
          if (a < i) return r - a;
          if (a > t - i) return r - a + t;
        }

        return r;
      };

      var zt = e.createUUID = function (t, e) {
        return function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase();
        };
      }(/[xy]/g, function (t) {
        var e = 16 * Y.random() | 0,
            r = "x" == t ? e : 3 & e | 8;
        return r.toString(16);
      });

      e.setWindow = function (r) {
        t("raphael.setWindow", e, T.win, r), T.win = r, T.doc = T.win.document, e._engine.initWin && e._engine.initWin(T.win);
      };

      var _Pt = function Pt(t) {
        if (e.vml) {
          var r = /^\s+|\s+$/g,
              i;

          try {
            var a = new ActiveXObject("htmlfile");
            a.write("<body>"), a.close(), i = a.body;
          } catch (s) {
            i = createPopup().document.body;
          }

          var o = i.createTextRange();
          _Pt = n(function (t) {
            try {
              i.style.color = I(t).replace(r, R);
              var e = o.queryCommandValue("ForeColor");
              return e = (255 & e) << 16 | 65280 & e | (16711680 & e) >>> 16, "#" + ("000000" + e.toString(16)).slice(-6);
            } catch (n) {
              return "none";
            }
          });
        } else {
          var l = T.doc.createElement("i");
          l.title = "Raphaël Colour Picker", l.style.display = "none", T.doc.body.appendChild(l), _Pt = n(function (t) {
            return l.style.color = t, T.doc.defaultView.getComputedStyle(l, R).getPropertyValue("color");
          });
        }

        return _Pt(t);
      },
          Ft = function Ft() {
        return "hsb(" + [this.h, this.s, this.b] + ")";
      },
          Rt = function Rt() {
        return "hsl(" + [this.h, this.s, this.l] + ")";
      },
          jt = function jt() {
        return this.hex;
      },
          It = function It(t, r, i) {
        if (null == r && e.is(t, "object") && "r" in t && "g" in t && "b" in t && (i = t.b, r = t.g, t = t.r), null == r && e.is(t, Z)) {
          var n = e.getRGB(t);
          t = n.r, r = n.g, i = n.b;
        }

        return (t > 1 || r > 1 || i > 1) && (t /= 255, r /= 255, i /= 255), [t, r, i];
      },
          qt = function qt(t, r, i, n) {
        t *= 255, r *= 255, i *= 255;
        var a = {
          r: t,
          g: r,
          b: i,
          hex: e.rgb(t, r, i),
          toString: jt
        };
        return e.is(n, "finite") && (a.opacity = n), a;
      };

      e.color = function (t) {
        var r;
        return e.is(t, "object") && "h" in t && "s" in t && "b" in t ? (r = e.hsb2rgb(t), t.r = r.r, t.g = r.g, t.b = r.b, t.hex = r.hex) : e.is(t, "object") && "h" in t && "s" in t && "l" in t ? (r = e.hsl2rgb(t), t.r = r.r, t.g = r.g, t.b = r.b, t.hex = r.hex) : (e.is(t, "string") && (t = e.getRGB(t)), e.is(t, "object") && "r" in t && "g" in t && "b" in t ? (r = e.rgb2hsl(t), t.h = r.h, t.s = r.s, t.l = r.l, r = e.rgb2hsb(t), t.v = r.b) : (t = {
          hex: "none"
        }, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = jt, t;
      }, e.hsb2rgb = function (t, e, r, i) {
        this.is(t, "object") && "h" in t && "s" in t && "b" in t && (r = t.b, e = t.s, i = t.o, t = t.h), t *= 360;
        var n, a, s, o, l;
        return t = t % 360 / 60, l = r * e, o = l * (1 - H(t % 2 - 1)), n = a = s = r - l, t = ~~t, n += [l, o, 0, 0, o, l][t], a += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], qt(n, a, s, i);
      }, e.hsl2rgb = function (t, e, r, i) {
        this.is(t, "object") && "h" in t && "s" in t && "l" in t && (r = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || r > 1) && (t /= 360, e /= 100, r /= 100), t *= 360;
        var n, a, s, o, l;
        return t = t % 360 / 60, l = 2 * e * (r < .5 ? r : 1 - r), o = l * (1 - H(t % 2 - 1)), n = a = s = r - l / 2, t = ~~t, n += [l, o, 0, 0, o, l][t], a += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], qt(n, a, s, i);
      }, e.rgb2hsb = function (t, e, r) {
        r = It(t, e, r), t = r[0], e = r[1], r = r[2];
        var i, n, a, s;
        return a = W(t, e, r), s = a - G(t, e, r), i = 0 == s ? null : a == t ? (e - r) / s : a == e ? (r - t) / s + 2 : (t - e) / s + 4, i = (i + 360) % 6 * 60 / 360, n = 0 == s ? 0 : s / a, {
          h: i,
          s: n,
          b: a,
          toString: Ft
        };
      }, e.rgb2hsl = function (t, e, r) {
        r = It(t, e, r), t = r[0], e = r[1], r = r[2];
        var i, n, a, s, o, l;
        return s = W(t, e, r), o = G(t, e, r), l = s - o, i = 0 == l ? null : s == t ? (e - r) / l : s == e ? (r - t) / l + 2 : (t - e) / l + 4, i = (i + 360) % 6 * 60 / 360, a = (s + o) / 2, n = 0 == l ? 0 : a < .5 ? l / (2 * a) : l / (2 - 2 * a), {
          h: i,
          s: n,
          l: a,
          toString: Rt
        };
      }, e._path2string = function () {
        return this.join(",").replace(xt, "$1");
      };

      var Dt = e._preload = function (t, e) {
        var r = T.doc.createElement("img");
        r.style.cssText = "position:absolute;left:-9999em;top:-9999em", r.onload = function () {
          e.call(this), this.onload = null, T.doc.body.removeChild(this);
        }, r.onerror = function () {
          T.doc.body.removeChild(this);
        }, T.doc.body.appendChild(r), r.src = t;
      };

      e.getRGB = n(function (t) {
        if (!t || (t = I(t)).indexOf("-") + 1) return {
          r: -1,
          g: -1,
          b: -1,
          hex: "none",
          error: 1,
          toString: a
        };
        if ("none" == t) return {
          r: -1,
          g: -1,
          b: -1,
          hex: "none",
          toString: a
        };
        !(vt[A](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = _Pt(t));
        var r,
            i,
            n,
            s,
            o,
            l,
            h,
            u = t.match(nt);
        return u ? (u[2] && (s = ut(u[2].substring(5), 16), n = ut(u[2].substring(3, 5), 16), i = ut(u[2].substring(1, 3), 16)), u[3] && (s = ut((l = u[3].charAt(3)) + l, 16), n = ut((l = u[3].charAt(2)) + l, 16), i = ut((l = u[3].charAt(1)) + l, 16)), u[4] && (h = u[4][q](gt), i = ht(h[0]), "%" == h[0].slice(-1) && (i *= 2.55), n = ht(h[1]), "%" == h[1].slice(-1) && (n *= 2.55), s = ht(h[2]), "%" == h[2].slice(-1) && (s *= 2.55), "rgba" == u[1].toLowerCase().slice(0, 4) && (o = ht(h[3])), h[3] && "%" == h[3].slice(-1) && (o /= 100)), u[5] ? (h = u[5][q](gt), i = ht(h[0]), "%" == h[0].slice(-1) && (i *= 2.55), n = ht(h[1]), "%" == h[1].slice(-1) && (n *= 2.55), s = ht(h[2]), "%" == h[2].slice(-1) && (s *= 2.55), ("deg" == h[0].slice(-3) || "°" == h[0].slice(-1)) && (i /= 360), "hsba" == u[1].toLowerCase().slice(0, 4) && (o = ht(h[3])), h[3] && "%" == h[3].slice(-1) && (o /= 100), e.hsb2rgb(i, n, s, o)) : u[6] ? (h = u[6][q](gt), i = ht(h[0]), "%" == h[0].slice(-1) && (i *= 2.55), n = ht(h[1]), "%" == h[1].slice(-1) && (n *= 2.55), s = ht(h[2]), "%" == h[2].slice(-1) && (s *= 2.55), ("deg" == h[0].slice(-3) || "°" == h[0].slice(-1)) && (i /= 360), "hsla" == u[1].toLowerCase().slice(0, 4) && (o = ht(h[3])), h[3] && "%" == h[3].slice(-1) && (o /= 100), e.hsl2rgb(i, n, s, o)) : (u = {
          r: i,
          g: n,
          b: s,
          toString: a
        }, u.hex = "#" + (16777216 | s | n << 8 | i << 16).toString(16).slice(1), e.is(o, "finite") && (u.opacity = o), u)) : {
          r: -1,
          g: -1,
          b: -1,
          hex: "none",
          error: 1,
          toString: a
        };
      }, e), e.hsb = n(function (t, r, i) {
        return e.hsb2rgb(t, r, i).hex;
      }), e.hsl = n(function (t, r, i) {
        return e.hsl2rgb(t, r, i).hex;
      }), e.rgb = n(function (t, e, r) {
        function i(t) {
          return t + .5 | 0;
        }

        return "#" + (16777216 | i(r) | i(e) << 8 | i(t) << 16).toString(16).slice(1);
      }), e.getColor = function (t) {
        var e = this.getColor.start = this.getColor.start || {
          h: 0,
          s: 1,
          b: t || .75
        },
            r = this.hsb2rgb(e.h, e.s, e.b);
        return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, e.s <= 0 && (this.getColor.start = {
          h: 0,
          s: 1,
          b: e.b
        })), r.hex;
      }, e.getColor.reset = function () {
        delete this.start;
      }, e.parsePathString = function (t) {
        if (!t) return null;
        var r = Vt(t);
        if (r.arr) return Yt(r.arr);
        var i = {
          a: 7,
          c: 6,
          h: 1,
          l: 2,
          m: 2,
          r: 4,
          q: 4,
          s: 4,
          t: 2,
          v: 1,
          z: 0
        },
            n = [];
        return e.is(t, Q) && e.is(t[0], Q) && (n = Yt(t)), n.length || I(t).replace(yt, function (t, e, r) {
          var a = [],
              s = e.toLowerCase();
          if (r.replace(bt, function (t, e) {
            e && a.push(+e);
          }), "m" == s && a.length > 2 && (n.push([e][P](a.splice(0, 2))), s = "l", e = "m" == e ? "l" : "L"), "r" == s) n.push([e][P](a));else for (; a.length >= i[s] && (n.push([e][P](a.splice(0, i[s]))), i[s]);) {
            ;
          }
        }), n.toString = e._path2string, r.arr = Yt(n), n;
      }, e.parseTransformString = n(function (t) {
        if (!t) return null;
        var r = {
          r: 3,
          s: 4,
          t: 2,
          m: 6
        },
            i = [];
        return e.is(t, Q) && e.is(t[0], Q) && (i = Yt(t)), i.length || I(t).replace(mt, function (t, e, r) {
          var n = [],
              a = O.call(e);
          r.replace(bt, function (t, e) {
            e && n.push(+e);
          }), i.push([e][P](n));
        }), i.toString = e._path2string, i;
      });

      var Vt = function Vt(t) {
        var e = Vt.ps = Vt.ps || {};
        return e[t] ? e[t].sleep = 100 : e[t] = {
          sleep: 100
        }, setTimeout(function () {
          for (var r in e) {
            e[A](r) && r != t && (e[r].sleep--, !e[r].sleep && delete e[r]);
          }
        }), e[t];
      };

      e.findDotsAtSegment = function (t, e, r, i, n, a, s, o, l) {
        var h = 1 - l,
            u = X(h, 3),
            c = X(h, 2),
            f = l * l,
            p = f * l,
            d = u * t + 3 * c * l * r + 3 * h * l * l * n + p * s,
            g = u * e + 3 * c * l * i + 3 * h * l * l * a + p * o,
            v = t + 2 * l * (r - t) + f * (n - 2 * r + t),
            x = e + 2 * l * (i - e) + f * (a - 2 * i + e),
            y = r + 2 * l * (n - r) + f * (s - 2 * n + r),
            m = i + 2 * l * (a - i) + f * (o - 2 * a + i),
            b = h * t + l * r,
            _ = h * e + l * i,
            w = h * n + l * s,
            k = h * a + l * o,
            B = 90 - 180 * Y.atan2(v - y, x - m) / U;

        return (v > y || x < m) && (B += 180), {
          x: d,
          y: g,
          m: {
            x: v,
            y: x
          },
          n: {
            x: y,
            y: m
          },
          start: {
            x: b,
            y: _
          },
          end: {
            x: w,
            y: k
          },
          alpha: B
        };
      }, e.bezierBBox = function (t, r, i, n, a, s, o, l) {
        e.is(t, "array") || (t = [t, r, i, n, a, s, o, l]);
        var h = Zt.apply(null, t);
        return {
          x: h.min.x,
          y: h.min.y,
          x2: h.max.x,
          y2: h.max.y,
          width: h.max.x - h.min.x,
          height: h.max.y - h.min.y
        };
      }, e.isPointInsideBBox = function (t, e, r) {
        return e >= t.x && e <= t.x2 && r >= t.y && r <= t.y2;
      }, e.isBBoxIntersect = function (t, r) {
        var i = e.isPointInsideBBox;
        return i(r, t.x, t.y) || i(r, t.x2, t.y) || i(r, t.x, t.y2) || i(r, t.x2, t.y2) || i(t, r.x, r.y) || i(t, r.x2, r.y) || i(t, r.x, r.y2) || i(t, r.x2, r.y2) || (t.x < r.x2 && t.x > r.x || r.x < t.x2 && r.x > t.x) && (t.y < r.y2 && t.y > r.y || r.y < t.y2 && r.y > t.y);
      }, e.pathIntersection = function (t, e) {
        return d(t, e);
      }, e.pathIntersectionNumber = function (t, e) {
        return d(t, e, 1);
      }, e.isPointInsidePath = function (t, r, i) {
        var n = e.pathBBox(t);
        return e.isPointInsideBBox(n, r, i) && d(t, [["M", r, i], ["H", n.x2 + 10]], 1) % 2 == 1;
      }, e._removedFactory = function (e) {
        return function () {
          t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e);
        };
      };

      var Ot = e.pathBBox = function (t) {
        var e = Vt(t);
        if (e.bbox) return r(e.bbox);
        if (!t) return {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          x2: 0,
          y2: 0
        };
        t = Qt(t);

        for (var i = 0, n = 0, a = [], s = [], o, l = 0, h = t.length; l < h; l++) {
          if (o = t[l], "M" == o[0]) i = o[1], n = o[2], a.push(i), s.push(n);else {
            var u = Zt(i, n, o[1], o[2], o[3], o[4], o[5], o[6]);
            a = a[P](u.min.x, u.max.x), s = s[P](u.min.y, u.max.y), i = o[5], n = o[6];
          }
        }

        var c = G[z](0, a),
            f = G[z](0, s),
            p = W[z](0, a),
            d = W[z](0, s),
            g = p - c,
            v = d - f,
            x = {
          x: c,
          y: f,
          x2: p,
          y2: d,
          width: g,
          height: v,
          cx: c + g / 2,
          cy: f + v / 2
        };
        return e.bbox = r(x), x;
      },
          Yt = function Yt(t) {
        var i = r(t);
        return i.toString = e._path2string, i;
      },
          Wt = e._pathToRelative = function (t) {
        var r = Vt(t);
        if (r.rel) return Yt(r.rel);
        e.is(t, Q) && e.is(t && t[0], Q) || (t = e.parsePathString(t));
        var i = [],
            n = 0,
            a = 0,
            s = 0,
            o = 0,
            l = 0;
        "M" == t[0][0] && (n = t[0][1], a = t[0][2], s = n, o = a, l++, i.push(["M", n, a]));

        for (var h = l, u = t.length; h < u; h++) {
          var c = i[h] = [],
              f = t[h];
          if (f[0] != O.call(f[0])) switch (c[0] = O.call(f[0]), c[0]) {
            case "a":
              c[1] = f[1], c[2] = f[2], c[3] = f[3], c[4] = f[4], c[5] = f[5], c[6] = +(f[6] - n).toFixed(3), c[7] = +(f[7] - a).toFixed(3);
              break;

            case "v":
              c[1] = +(f[1] - a).toFixed(3);
              break;

            case "m":
              s = f[1], o = f[2];

            default:
              for (var p = 1, d = f.length; p < d; p++) {
                c[p] = +(f[p] - (p % 2 ? n : a)).toFixed(3);
              }

          } else {
            c = i[h] = [], "m" == f[0] && (s = f[1] + n, o = f[2] + a);

            for (var g = 0, v = f.length; g < v; g++) {
              i[h][g] = f[g];
            }
          }
          var x = i[h].length;

          switch (i[h][0]) {
            case "z":
              n = s, a = o;
              break;

            case "h":
              n += +i[h][x - 1];
              break;

            case "v":
              a += +i[h][x - 1];
              break;

            default:
              n += +i[h][x - 2], a += +i[h][x - 1];
          }
        }

        return i.toString = e._path2string, r.rel = Yt(i), i;
      },
          Gt = e._pathToAbsolute = function (t) {
        var r = Vt(t);
        if (r.abs) return Yt(r.abs);
        if (e.is(t, Q) && e.is(t && t[0], Q) || (t = e.parsePathString(t)), !t || !t.length) return [["M", 0, 0]];
        var i = [],
            n = 0,
            a = 0,
            o = 0,
            l = 0,
            h = 0;
        "M" == t[0][0] && (n = +t[0][1], a = +t[0][2], o = n, l = a, h++, i[0] = ["M", n, a]);

        for (var u = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), c, f, p = h, d = t.length; p < d; p++) {
          if (i.push(c = []), f = t[p], f[0] != ct.call(f[0])) switch (c[0] = ct.call(f[0]), c[0]) {
            case "A":
              c[1] = f[1], c[2] = f[2], c[3] = f[3], c[4] = f[4], c[5] = f[5], c[6] = +(f[6] + n), c[7] = +(f[7] + a);
              break;

            case "V":
              c[1] = +f[1] + a;
              break;

            case "H":
              c[1] = +f[1] + n;
              break;

            case "R":
              for (var g = [n, a][P](f.slice(1)), v = 2, x = g.length; v < x; v++) {
                g[v] = +g[v] + n, g[++v] = +g[v] + a;
              }

              i.pop(), i = i[P](s(g, u));
              break;

            case "M":
              o = +f[1] + n, l = +f[2] + a;

            default:
              for (v = 1, x = f.length; v < x; v++) {
                c[v] = +f[v] + (v % 2 ? n : a);
              }

          } else if ("R" == f[0]) g = [n, a][P](f.slice(1)), i.pop(), i = i[P](s(g, u)), c = ["R"][P](f.slice(-2));else for (var y = 0, m = f.length; y < m; y++) {
            c[y] = f[y];
          }

          switch (c[0]) {
            case "Z":
              n = o, a = l;
              break;

            case "H":
              n = c[1];
              break;

            case "V":
              a = c[1];
              break;

            case "M":
              o = c[c.length - 2], l = c[c.length - 1];

            default:
              n = c[c.length - 2], a = c[c.length - 1];
          }
        }

        return i.toString = e._path2string, r.abs = Yt(i), i;
      },
          Ht = function Ht(t, e, r, i) {
        return [t, e, r, i, r, i];
      },
          Xt = function Xt(t, e, r, i, n, a) {
        var s = 1 / 3,
            o = 2 / 3;
        return [s * t + o * r, s * e + o * i, s * n + o * r, s * a + o * i, n, a];
      },
          Ut = function Ut(t, e, r, i, a, s, o, l, h, u) {
        var c = 120 * U / 180,
            f = U / 180 * (+a || 0),
            p = [],
            d,
            g = n(function (t, e, r) {
          var i = t * Y.cos(r) - e * Y.sin(r),
              n = t * Y.sin(r) + e * Y.cos(r);
          return {
            x: i,
            y: n
          };
        });
        if (u) S = u[0], A = u[1], B = u[2], C = u[3];else {
          d = g(t, e, -f), t = d.x, e = d.y, d = g(l, h, -f), l = d.x, h = d.y;
          var v = Y.cos(U / 180 * a),
              x = Y.sin(U / 180 * a),
              y = (t - l) / 2,
              m = (e - h) / 2,
              b = y * y / (r * r) + m * m / (i * i);
          b > 1 && (b = Y.sqrt(b), r = b * r, i = b * i);

          var _ = r * r,
              w = i * i,
              k = (s == o ? -1 : 1) * Y.sqrt(H((_ * w - _ * m * m - w * y * y) / (_ * m * m + w * y * y))),
              B = k * r * m / i + (t + l) / 2,
              C = k * -i * y / r + (e + h) / 2,
              S = Y.asin(((e - C) / i).toFixed(9)),
              A = Y.asin(((h - C) / i).toFixed(9));

          S = t < B ? U - S : S, A = l < B ? U - A : A, S < 0 && (S = 2 * U + S), A < 0 && (A = 2 * U + A), o && S > A && (S -= 2 * U), !o && A > S && (A -= 2 * U);
        }
        var T = A - S;

        if (H(T) > c) {
          var E = A,
              M = l,
              N = h;
          A = S + c * (o && A > S ? 1 : -1), l = B + r * Y.cos(A), h = C + i * Y.sin(A), p = Ut(l, h, r, i, a, 0, o, M, N, [A, E, B, C]);
        }

        T = A - S;
        var L = Y.cos(S),
            z = Y.sin(S),
            F = Y.cos(A),
            R = Y.sin(A),
            j = Y.tan(T / 4),
            I = 4 / 3 * r * j,
            D = 4 / 3 * i * j,
            V = [t, e],
            O = [t + I * z, e - D * L],
            W = [l + I * R, h - D * F],
            G = [l, h];
        if (O[0] = 2 * V[0] - O[0], O[1] = 2 * V[1] - O[1], u) return [O, W, G][P](p);
        p = [O, W, G][P](p).join()[q](",");

        for (var X = [], $ = 0, Z = p.length; $ < Z; $++) {
          X[$] = $ % 2 ? g(p[$ - 1], p[$], f).y : g(p[$], p[$ + 1], f).x;
        }

        return X;
      },
          $t = function $t(t, e, r, i, n, a, s, o, l) {
        var h = 1 - l;
        return {
          x: X(h, 3) * t + 3 * X(h, 2) * l * r + 3 * h * l * l * n + X(l, 3) * s,
          y: X(h, 3) * e + 3 * X(h, 2) * l * i + 3 * h * l * l * a + X(l, 3) * o
        };
      },
          Zt = n(function (t, e, r, i, n, a, s, o) {
        var l = n - 2 * r + t - (s - 2 * n + r),
            h = 2 * (r - t) - 2 * (n - r),
            u = t - r,
            c = (-h + Y.sqrt(h * h - 4 * l * u)) / 2 / l,
            f = (-h - Y.sqrt(h * h - 4 * l * u)) / 2 / l,
            p = [e, o],
            d = [t, s],
            g;
        return H(c) > "1e12" && (c = .5), H(f) > "1e12" && (f = .5), c > 0 && c < 1 && (g = $t(t, e, r, i, n, a, s, o, c), d.push(g.x), p.push(g.y)), f > 0 && f < 1 && (g = $t(t, e, r, i, n, a, s, o, f), d.push(g.x), p.push(g.y)), l = a - 2 * i + e - (o - 2 * a + i), h = 2 * (i - e) - 2 * (a - i), u = e - i, c = (-h + Y.sqrt(h * h - 4 * l * u)) / 2 / l, f = (-h - Y.sqrt(h * h - 4 * l * u)) / 2 / l, H(c) > "1e12" && (c = .5), H(f) > "1e12" && (f = .5), c > 0 && c < 1 && (g = $t(t, e, r, i, n, a, s, o, c), d.push(g.x), p.push(g.y)), f > 0 && f < 1 && (g = $t(t, e, r, i, n, a, s, o, f), d.push(g.x), p.push(g.y)), {
          min: {
            x: G[z](0, d),
            y: G[z](0, p)
          },
          max: {
            x: W[z](0, d),
            y: W[z](0, p)
          }
        };
      }),
          Qt = e._path2curve = n(function (t, e) {
        var r = !e && Vt(t);
        if (!e && r.curve) return Yt(r.curve);

        for (var i = Gt(t), n = e && Gt(e), a = {
          x: 0,
          y: 0,
          bx: 0,
          by: 0,
          X: 0,
          Y: 0,
          qx: null,
          qy: null
        }, s = {
          x: 0,
          y: 0,
          bx: 0,
          by: 0,
          X: 0,
          Y: 0,
          qx: null,
          qy: null
        }, o = function o(t, e, r) {
          var i,
              n,
              a = {
            T: 1,
            Q: 1
          };
          if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];

          switch (!(t[0] in a) && (e.qx = e.qy = null), t[0]) {
            case "M":
              e.X = t[1], e.Y = t[2];
              break;

            case "A":
              t = ["C"][P](Ut[z](0, [e.x, e.y][P](t.slice(1))));
              break;

            case "S":
              "C" == r || "S" == r ? (i = 2 * e.x - e.bx, n = 2 * e.y - e.by) : (i = e.x, n = e.y), t = ["C", i, n][P](t.slice(1));
              break;

            case "T":
              "Q" == r || "T" == r ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"][P](Xt(e.x, e.y, e.qx, e.qy, t[1], t[2]));
              break;

            case "Q":
              e.qx = t[1], e.qy = t[2], t = ["C"][P](Xt(e.x, e.y, t[1], t[2], t[3], t[4]));
              break;

            case "L":
              t = ["C"][P](Ht(e.x, e.y, t[1], t[2]));
              break;

            case "H":
              t = ["C"][P](Ht(e.x, e.y, t[1], e.y));
              break;

            case "V":
              t = ["C"][P](Ht(e.x, e.y, e.x, t[1]));
              break;

            case "Z":
              t = ["C"][P](Ht(e.x, e.y, e.X, e.Y));
          }

          return t;
        }, l = function l(t, e) {
          if (t[e].length > 7) {
            t[e].shift();

            for (var r = t[e]; r.length;) {
              u[e] = "A", n && (c[e] = "A"), t.splice(e++, 0, ["C"][P](r.splice(0, 6)));
            }

            t.splice(e, 1), g = W(i.length, n && n.length || 0);
          }
        }, h = function h(t, e, r, a, s) {
          t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", a.x, a.y]), r.bx = 0, r.by = 0, r.x = t[s][1], r.y = t[s][2], g = W(i.length, n && n.length || 0));
        }, u = [], c = [], f = "", p = "", d = 0, g = W(i.length, n && n.length || 0); d < g; d++) {
          i[d] && (f = i[d][0]), "C" != f && (u[d] = f, d && (p = u[d - 1])), i[d] = o(i[d], a, p), "A" != u[d] && "C" == f && (u[d] = "C"), l(i, d), n && (n[d] && (f = n[d][0]), "C" != f && (c[d] = f, d && (p = c[d - 1])), n[d] = o(n[d], s, p), "A" != c[d] && "C" == f && (c[d] = "C"), l(n, d)), h(i, n, a, s, d), h(n, i, s, a, d);
          var v = i[d],
              x = n && n[d],
              y = v.length,
              m = n && x.length;
          a.x = v[y - 2], a.y = v[y - 1], a.bx = ht(v[y - 4]) || a.x, a.by = ht(v[y - 3]) || a.y, s.bx = n && (ht(x[m - 4]) || s.x), s.by = n && (ht(x[m - 3]) || s.y), s.x = n && x[m - 2], s.y = n && x[m - 1];
        }

        return n || (r.curve = Yt(i)), n ? [i, n] : i;
      }, null, Yt),
          Jt = e._parseDots = n(function (t) {
        for (var r = [], i = 0, n = t.length; i < n; i++) {
          var a = {},
              s = t[i].match(/^([^:]*):?([\d\.]*)/);
          if (a.color = e.getRGB(s[1]), a.color.error) return null;
          a.opacity = a.color.opacity, a.color = a.color.hex, s[2] && (a.offset = s[2] + "%"), r.push(a);
        }

        for (i = 1, n = r.length - 1; i < n; i++) {
          if (!r[i].offset) {
            for (var o = ht(r[i - 1].offset || 0), l = 0, h = i + 1; h < n; h++) {
              if (r[h].offset) {
                l = r[h].offset;
                break;
              }
            }

            l || (l = 100, h = n), l = ht(l);

            for (var u = (l - o) / (h - i + 1); i < h; i++) {
              o += u, r[i].offset = o + "%";
            }
          }
        }

        return r;
      }),
          Kt = e._tear = function (t, e) {
        t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next);
      },
          te = e._tofront = function (t, e) {
        e.top !== t && (Kt(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t);
      },
          ee = e._toback = function (t, e) {
        e.bottom !== t && (Kt(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t);
      },
          re = e._insertafter = function (t, e, r) {
        Kt(t, r), e == r.top && (r.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t;
      },
          ie = e._insertbefore = function (t, e, r) {
        Kt(t, r), e == r.bottom && (r.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e;
      },
          ne = e.toMatrix = function (t, e) {
        var r = Ot(t),
            i = {
          _: {
            transform: R
          },
          getBBox: function getBBox() {
            return r;
          }
        };
        return se(i, e), i.matrix;
      },
          ae = e.transformPath = function (t, e) {
        return Mt(t, ne(t, e));
      },
          se = e._extractTransform = function (t, r) {
        if (null == r) return t._.transform;
        r = I(r).replace(/\.{3}|\u2026/g, t._.transform || R);
        var i = e.parseTransformString(r),
            n = 0,
            a = 0,
            s = 0,
            o = 1,
            l = 1,
            h = t._,
            u = new g();
        if (h.transform = i || [], i) for (var c = 0, f = i.length; c < f; c++) {
          var p = i[c],
              d = p.length,
              v = I(p[0]).toLowerCase(),
              x = p[0] != v,
              y = x ? u.invert() : 0,
              m,
              b,
              _,
              w,
              k;

          "t" == v && 3 == d ? x ? (m = y.x(0, 0), b = y.y(0, 0), _ = y.x(p[1], p[2]), w = y.y(p[1], p[2]), u.translate(_ - m, w - b)) : u.translate(p[1], p[2]) : "r" == v ? 2 == d ? (k = k || t.getBBox(1), u.rotate(p[1], k.x + k.width / 2, k.y + k.height / 2), n += p[1]) : 4 == d && (x ? (_ = y.x(p[2], p[3]), w = y.y(p[2], p[3]), u.rotate(p[1], _, w)) : u.rotate(p[1], p[2], p[3]), n += p[1]) : "s" == v ? 2 == d || 3 == d ? (k = k || t.getBBox(1), u.scale(p[1], p[d - 1], k.x + k.width / 2, k.y + k.height / 2), o *= p[1], l *= p[d - 1]) : 5 == d && (x ? (_ = y.x(p[3], p[4]), w = y.y(p[3], p[4]), u.scale(p[1], p[2], _, w)) : u.scale(p[1], p[2], p[3], p[4]), o *= p[1], l *= p[2]) : "m" == v && 7 == d && u.add(p[1], p[2], p[3], p[4], p[5], p[6]), h.dirtyT = 1, t.matrix = u;
        }
        t.matrix = u, h.sx = o, h.sy = l, h.deg = n, h.dx = a = u.e, h.dy = s = u.f, 1 == o && 1 == l && !n && h.bbox ? (h.bbox.x += +a, h.bbox.y += +s) : h.dirtyT = 1;
      },
          oe = function oe(t) {
        var e = t[0];

        switch (e.toLowerCase()) {
          case "t":
            return [e, 0, 0];

          case "m":
            return [e, 1, 0, 0, 1, 0, 0];

          case "r":
            return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];

          case "s":
            return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1];
        }
      },
          le = e._equaliseTransform = function (t, r) {
        r = I(r).replace(/\.{3}|\u2026/g, t), t = e.parseTransformString(t) || [], r = e.parseTransformString(r) || [];

        for (var i = W(t.length, r.length), n = [], a = [], s = 0, o, l, h, u; s < i; s++) {
          if (h = t[s] || oe(r[s]), u = r[s] || oe(h), h[0] != u[0] || "r" == h[0].toLowerCase() && (h[2] != u[2] || h[3] != u[3]) || "s" == h[0].toLowerCase() && (h[3] != u[3] || h[4] != u[4])) return;

          for (n[s] = [], a[s] = [], o = 0, l = W(h.length, u.length); o < l; o++) {
            o in h && (n[s][o] = h[o]), o in u && (a[s][o] = u[o]);
          }
        }

        return {
          from: n,
          to: a
        };
      };

      e._getContainer = function (t, r, i, n) {
        var a;
        if (a = null != n || e.is(t, "object") ? t : T.doc.getElementById(t), null != a) return a.tagName ? null == r ? {
          container: a,
          width: a.style.pixelWidth || a.offsetWidth,
          height: a.style.pixelHeight || a.offsetHeight
        } : {
          container: a,
          width: r,
          height: i
        } : {
          container: 1,
          x: t,
          y: r,
          width: i,
          height: n
        };
      }, e.pathToRelative = Wt, e._engine = {}, e.path2curve = Qt, e.matrix = function (t, e, r, i, n, a) {
        return new g(t, e, r, i, n, a);
      }, function (t) {
        function r(t) {
          return t[0] * t[0] + t[1] * t[1];
        }

        function i(t) {
          var e = Y.sqrt(r(t));
          t[0] && (t[0] /= e), t[1] && (t[1] /= e);
        }

        t.add = function (t, e, r, i, n, a) {
          var s = [[], [], []],
              o = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
              l = [[t, r, n], [e, i, a], [0, 0, 1]],
              h,
              u,
              c,
              f;

          for (t && t instanceof g && (l = [[t.a, t.c, t.e], [t.b, t.d, t.f], [0, 0, 1]]), h = 0; h < 3; h++) {
            for (u = 0; u < 3; u++) {
              for (f = 0, c = 0; c < 3; c++) {
                f += o[h][c] * l[c][u];
              }

              s[h][u] = f;
            }
          }

          this.a = s[0][0], this.b = s[1][0], this.c = s[0][1], this.d = s[1][1], this.e = s[0][2], this.f = s[1][2];
        }, t.invert = function () {
          var t = this,
              e = t.a * t.d - t.b * t.c;
          return new g(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e);
        }, t.clone = function () {
          return new g(this.a, this.b, this.c, this.d, this.e, this.f);
        }, t.translate = function (t, e) {
          this.add(1, 0, 0, 1, t, e);
        }, t.scale = function (t, e, r, i) {
          null == e && (e = t), (r || i) && this.add(1, 0, 0, 1, r, i), this.add(t, 0, 0, e, 0, 0), (r || i) && this.add(1, 0, 0, 1, -r, -i);
        }, t.rotate = function (t, r, i) {
          t = e.rad(t), r = r || 0, i = i || 0;
          var n = +Y.cos(t).toFixed(9),
              a = +Y.sin(t).toFixed(9);
          this.add(n, a, -a, n, r, i), this.add(1, 0, 0, 1, -r, -i);
        }, t.x = function (t, e) {
          return t * this.a + e * this.c + this.e;
        }, t.y = function (t, e) {
          return t * this.b + e * this.d + this.f;
        }, t.get = function (t) {
          return +this[I.fromCharCode(97 + t)].toFixed(4);
        }, t.toString = function () {
          return e.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        }, t.toFilter = function () {
          return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        }, t.offset = function () {
          return [this.e.toFixed(4), this.f.toFixed(4)];
        }, t.split = function () {
          var t = {};
          t.dx = this.e, t.dy = this.f;
          var n = [[this.a, this.c], [this.b, this.d]];
          t.scalex = Y.sqrt(r(n[0])), i(n[0]), t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1], n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear], t.scaley = Y.sqrt(r(n[1])), i(n[1]), t.shear /= t.scaley;
          var a = -n[0][1],
              s = n[1][1];
          return s < 0 ? (t.rotate = e.deg(Y.acos(s)), a < 0 && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(Y.asin(a)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t;
        }, t.toTransformString = function (t) {
          var e = t || this[q]();
          return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : R) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : R) + (e.rotate ? "r" + [e.rotate, 0, 0] : R)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        };
      }(g.prototype);

      for (var he = function he() {
        this.returnValue = !1;
      }, ue = function ue() {
        return this.originalEvent.preventDefault();
      }, ce = function ce() {
        this.cancelBubble = !0;
      }, fe = function fe() {
        return this.originalEvent.stopPropagation();
      }, pe = function pe(t) {
        var e = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
            r = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft;
        return {
          x: t.clientX + r,
          y: t.clientY + e
        };
      }, de = function () {
        return T.doc.addEventListener ? function (t, e, r, i) {
          var n = function n(t) {
            var e = pe(t);
            return r.call(i, t, e.x, e.y);
          };

          if (t.addEventListener(e, n, !1), F && V[e]) {
            var a = function a(e) {
              for (var n = pe(e), a = e, s = 0, o = e.targetTouches && e.targetTouches.length; s < o; s++) {
                if (e.targetTouches[s].target == t) {
                  e = e.targetTouches[s], e.originalEvent = a, e.preventDefault = ue, e.stopPropagation = fe;
                  break;
                }
              }

              return r.call(i, e, n.x, n.y);
            };

            t.addEventListener(V[e], a, !1);
          }

          return function () {
            return t.removeEventListener(e, n, !1), F && V[e] && t.removeEventListener(V[e], a, !1), !0;
          };
        } : T.doc.attachEvent ? function (t, e, r, i) {
          var n = function n(t) {
            t = t || T.win.event;
            var e = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
                n = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft,
                a = t.clientX + n,
                s = t.clientY + e;
            return t.preventDefault = t.preventDefault || he, t.stopPropagation = t.stopPropagation || ce, r.call(i, t, a, s);
          };

          t.attachEvent("on" + e, n);

          var a = function a() {
            return t.detachEvent("on" + e, n), !0;
          };

          return a;
        } : void 0;
      }(), ge = [], ve = function ve(e) {
        for (var r = e.clientX, i = e.clientY, n = T.doc.documentElement.scrollTop || T.doc.body.scrollTop, a = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft, s, o = ge.length; o--;) {
          if (s = ge[o], F && e.touches) {
            for (var l = e.touches.length, h; l--;) {
              if (h = e.touches[l], h.identifier == s.el._drag.id) {
                r = h.clientX, i = h.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                break;
              }
            }
          } else e.preventDefault();

          var u = s.el.node,
              c,
              f = u.nextSibling,
              p = u.parentNode,
              d = u.style.display;
          T.win.opera && p.removeChild(u), u.style.display = "none", c = s.el.paper.getElementByPoint(r, i), u.style.display = d, T.win.opera && (f ? p.insertBefore(u, f) : p.appendChild(u)), c && t("raphael.drag.over." + s.el.id, s.el, c), r += a, i += n, t("raphael.drag.move." + s.el.id, s.move_scope || s.el, r - s.el._drag.x, i - s.el._drag.y, r, i, e);
        }
      }, xe = function xe(r) {
        e.unmousemove(ve).unmouseup(xe);

        for (var i = ge.length, n; i--;) {
          n = ge[i], n.el._drag = {}, t("raphael.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, r);
        }

        ge = [];
      }, ye = e.el = {}, me = D.length; me--;) {
        !function (t) {
          e[t] = ye[t] = function (r, i) {
            return e.is(r, "function") && (this.events = this.events || [], this.events.push({
              name: t,
              f: r,
              unbind: de(this.shape || this.node || T.doc, t, r, i || this)
            })), this;
          }, e["un" + t] = ye["un" + t] = function (r) {
            for (var i = this.events || [], n = i.length; n--;) {
              i[n].name != t || !e.is(r, "undefined") && i[n].f != r || (i[n].unbind(), i.splice(n, 1), !i.length && delete this.events);
            }

            return this;
          };
        }(D[me]);
      }

      ye.data = function (r, i) {
        var n = wt[this.id] = wt[this.id] || {};
        if (0 == arguments.length) return n;

        if (1 == arguments.length) {
          if (e.is(r, "object")) {
            for (var a in r) {
              r[A](a) && this.data(a, r[a]);
            }

            return this;
          }

          return t("raphael.data.get." + this.id, this, n[r], r), n[r];
        }

        return n[r] = i, t("raphael.data.set." + this.id, this, i, r), this;
      }, ye.removeData = function (t) {
        return null == t ? wt[this.id] = {} : wt[this.id] && delete wt[this.id][t], this;
      }, ye.getData = function () {
        return r(wt[this.id] || {});
      }, ye.hover = function (t, e, r, i) {
        return this.mouseover(t, r).mouseout(e, i || r);
      }, ye.unhover = function (t, e) {
        return this.unmouseover(t).unmouseout(e);
      };
      var be = [];
      ye.drag = function (r, i, n, a, s, o) {
        function l(l) {
          (l.originalEvent || l).preventDefault();
          var h = l.clientX,
              u = l.clientY,
              c = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
              f = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft;
          if (this._drag.id = l.identifier, F && l.touches) for (var p = l.touches.length, d; p--;) {
            if (d = l.touches[p], this._drag.id = d.identifier, d.identifier == this._drag.id) {
              h = d.clientX, u = d.clientY;
              break;
            }
          }
          this._drag.x = h + f, this._drag.y = u + c, !ge.length && e.mousemove(ve).mouseup(xe), ge.push({
            el: this,
            move_scope: a,
            start_scope: s,
            end_scope: o
          }), i && t.on("raphael.drag.start." + this.id, i), r && t.on("raphael.drag.move." + this.id, r), n && t.on("raphael.drag.end." + this.id, n), t("raphael.drag.start." + this.id, s || a || this, l.clientX + f, l.clientY + c, l);
        }

        return this._drag = {}, be.push({
          el: this,
          start: l
        }), this.mousedown(l), this;
      }, ye.onDragOver = function (e) {
        e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id);
      }, ye.undrag = function () {
        for (var r = be.length; r--;) {
          be[r].el == this && (this.unmousedown(be[r].start), be.splice(r, 1), t.unbind("raphael.drag.*." + this.id));
        }

        !be.length && e.unmousemove(ve).unmouseup(xe), ge = [];
      }, N.circle = function (t, r, i) {
        var n = e._engine.circle(this, t || 0, r || 0, i || 0);

        return this.__set__ && this.__set__.push(n), n;
      }, N.rect = function (t, r, i, n, a) {
        var s = e._engine.rect(this, t || 0, r || 0, i || 0, n || 0, a || 0);

        return this.__set__ && this.__set__.push(s), s;
      }, N.ellipse = function (t, r, i, n) {
        var a = e._engine.ellipse(this, t || 0, r || 0, i || 0, n || 0);

        return this.__set__ && this.__set__.push(a), a;
      }, N.path = function (t) {
        t && !e.is(t, Z) && !e.is(t[0], Q) && (t += R);

        var r = e._engine.path(e.format[z](e, arguments), this);

        return this.__set__ && this.__set__.push(r), r;
      }, N.image = function (t, r, i, n, a) {
        var s = e._engine.image(this, t || "about:blank", r || 0, i || 0, n || 0, a || 0);

        return this.__set__ && this.__set__.push(s), s;
      }, N.text = function (t, r, i) {
        var n = e._engine.text(this, t || 0, r || 0, I(i));

        return this.__set__ && this.__set__.push(n), n;
      }, N.set = function (t) {
        !e.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
        var r = new ze(t);
        return this.__set__ && this.__set__.push(r), r.paper = this, r.type = "set", r;
      }, N.setStart = function (t) {
        this.__set__ = t || this.set();
      }, N.setFinish = function (t) {
        var e = this.__set__;
        return delete this.__set__, e;
      }, N.getSize = function () {
        var t = this.canvas.parentNode;
        return {
          width: t.offsetWidth,
          height: t.offsetHeight
        };
      }, N.setSize = function (t, r) {
        return e._engine.setSize.call(this, t, r);
      }, N.setViewBox = function (t, r, i, n, a) {
        return e._engine.setViewBox.call(this, t, r, i, n, a);
      }, N.top = N.bottom = null, N.raphael = e;

      var _e = function _e(t) {
        var e = t.getBoundingClientRect(),
            r = t.ownerDocument,
            i = r.body,
            n = r.documentElement,
            a = n.clientTop || i.clientTop || 0,
            s = n.clientLeft || i.clientLeft || 0,
            o = e.top + (T.win.pageYOffset || n.scrollTop || i.scrollTop) - a,
            l = e.left + (T.win.pageXOffset || n.scrollLeft || i.scrollLeft) - s;
        return {
          y: o,
          x: l
        };
      };

      N.getElementByPoint = function (t, e) {
        var r = this,
            i = r.canvas,
            n = T.doc.elementFromPoint(t, e);

        if (T.win.opera && "svg" == n.tagName) {
          var a = _e(i),
              s = i.createSVGRect();

          s.x = t - a.x, s.y = e - a.y, s.width = s.height = 1;
          var o = i.getIntersectionList(s, null);
          o.length && (n = o[o.length - 1]);
        }

        if (!n) return null;

        for (; n.parentNode && n != i.parentNode && !n.raphael;) {
          n = n.parentNode;
        }

        return n == r.canvas.parentNode && (n = i), n = n && n.raphael ? r.getById(n.raphaelid) : null;
      }, N.getElementsByBBox = function (t) {
        var r = this.set();
        return this.forEach(function (i) {
          e.isBBoxIntersect(i.getBBox(), t) && r.push(i);
        }), r;
      }, N.getById = function (t) {
        for (var e = this.bottom; e;) {
          if (e.id == t) return e;
          e = e.next;
        }

        return null;
      }, N.forEach = function (t, e) {
        for (var r = this.bottom; r;) {
          if (t.call(e, r) === !1) return this;
          r = r.next;
        }

        return this;
      }, N.getElementsByPoint = function (t, e) {
        var r = this.set();
        return this.forEach(function (i) {
          i.isPointInside(t, e) && r.push(i);
        }), r;
      }, ye.isPointInside = function (t, r) {
        var i = this.realPath = Et[this.type](this);
        return this.attr("transform") && this.attr("transform").length && (i = e.transformPath(i, this.attr("transform"))), e.isPointInsidePath(i, t, r);
      }, ye.getBBox = function (t) {
        if (this.removed) return {};
        var e = this._;
        return t ? (!e.dirty && e.bboxwt || (this.realPath = Et[this.type](this), e.bboxwt = Ot(this.realPath), e.bboxwt.toString = x, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && (!e.dirty && this.realPath || (e.bboxwt = 0, this.realPath = Et[this.type](this)), e.bbox = Ot(Mt(this.realPath, this.matrix)), e.bbox.toString = x, e.dirty = e.dirtyT = 0), e.bbox);
      }, ye.clone = function () {
        if (this.removed) return null;
        var t = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(t), t;
      }, ye.glow = function (t) {
        if ("text" == this.type) return null;
        t = t || {};
        var e = {
          width: (t.width || 10) + (+this.attr("stroke-width") || 1),
          fill: t.fill || !1,
          opacity: null == t.opacity ? .5 : t.opacity,
          offsetx: t.offsetx || 0,
          offsety: t.offsety || 0,
          color: t.color || "#000"
        },
            r = e.width / 2,
            i = this.paper,
            n = i.set(),
            a = this.realPath || Et[this.type](this);
        a = this.matrix ? Mt(a, this.matrix) : a;

        for (var s = 1; s < r + 1; s++) {
          n.push(i.path(a).attr({
            stroke: e.color,
            fill: e.fill ? e.color : "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
            "stroke-width": +(e.width / r * s).toFixed(3),
            opacity: +(e.opacity / r).toFixed(3)
          }));
        }

        return n.insertBefore(this).translate(e.offsetx, e.offsety);
      };

      var we = {},
          ke = function ke(t, r, i, n, a, s, o, u, c) {
        return null == c ? l(t, r, i, n, a, s, o, u) : e.findDotsAtSegment(t, r, i, n, a, s, o, u, h(t, r, i, n, a, s, o, u, c));
      },
          Be = function Be(t, r) {
        return function (i, n, a) {
          i = Qt(i);

          for (var s, o, l, h, u = "", c = {}, f, p = 0, d = 0, g = i.length; d < g; d++) {
            if (l = i[d], "M" == l[0]) s = +l[1], o = +l[2];else {
              if (h = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6]), p + h > n) {
                if (r && !c.start) {
                  if (f = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6], n - p), u += ["C" + f.start.x, f.start.y, f.m.x, f.m.y, f.x, f.y], a) return u;
                  c.start = u, u = ["M" + f.x, f.y + "C" + f.n.x, f.n.y, f.end.x, f.end.y, l[5], l[6]].join(), p += h, s = +l[5], o = +l[6];
                  continue;
                }

                if (!t && !r) return f = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6], n - p), {
                  x: f.x,
                  y: f.y,
                  alpha: f.alpha
                };
              }

              p += h, s = +l[5], o = +l[6];
            }
            u += l.shift() + l;
          }

          return c.end = u, f = t ? p : r ? c : e.findDotsAtSegment(s, o, l[0], l[1], l[2], l[3], l[4], l[5], 1), f.alpha && (f = {
            x: f.x,
            y: f.y,
            alpha: f.alpha
          }), f;
        };
      },
          Ce = Be(1),
          Se = Be(),
          Ae = Be(0, 1);

      e.getTotalLength = Ce, e.getPointAtLength = Se, e.getSubpath = function (t, e, r) {
        if (this.getTotalLength(t) - r < 1e-6) return Ae(t, e).end;
        var i = Ae(t, r, 1);
        return e ? Ae(i, e).end : i;
      }, ye.getTotalLength = function () {
        var t = this.getPath();
        if (t) return this.node.getTotalLength ? this.node.getTotalLength() : Ce(t);
      }, ye.getPointAtLength = function (t) {
        var e = this.getPath();
        if (e) return Se(e, t);
      }, ye.getPath = function () {
        var t,
            r = e._getPath[this.type];
        if ("text" != this.type && "set" != this.type) return r && (t = r(this)), t;
      }, ye.getSubpath = function (t, r) {
        var i = this.getPath();
        if (i) return e.getSubpath(i, t, r);
      };
      var Te = e.easing_formulas = {
        linear: function linear(t) {
          return t;
        },
        "<": function _(t) {
          return X(t, 1.7);
        },
        ">": function _(t) {
          return X(t, .48);
        },
        "<>": function _(t) {
          var e = .48 - t / 1.04,
              r = Y.sqrt(.1734 + e * e),
              i = r - e,
              n = X(H(i), 1 / 3) * (i < 0 ? -1 : 1),
              a = -r - e,
              s = X(H(a), 1 / 3) * (a < 0 ? -1 : 1),
              o = n + s + .5;
          return 3 * (1 - o) * o * o + o * o * o;
        },
        backIn: function backIn(t) {
          var e = 1.70158;
          return t * t * ((e + 1) * t - e);
        },
        backOut: function backOut(t) {
          t -= 1;
          var e = 1.70158;
          return t * t * ((e + 1) * t + e) + 1;
        },
        elastic: function elastic(t) {
          return t == !!t ? t : X(2, -10 * t) * Y.sin((t - .075) * (2 * U) / .3) + 1;
        },
        bounce: function bounce(t) {
          var e = 7.5625,
              r = 2.75,
              i;
          return t < 1 / r ? i = e * t * t : t < 2 / r ? (t -= 1.5 / r, i = e * t * t + .75) : t < 2.5 / r ? (t -= 2.25 / r, i = e * t * t + .9375) : (t -= 2.625 / r, i = e * t * t + .984375), i;
        }
      };
      Te.easeIn = Te["ease-in"] = Te["<"], Te.easeOut = Te["ease-out"] = Te[">"], Te.easeInOut = Te["ease-in-out"] = Te["<>"], Te["back-in"] = Te.backIn, Te["back-out"] = Te.backOut;

      var Ee = [],
          Me = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
        setTimeout(t, 16);
      },
          Ne = function Ne() {
        for (var r = +new Date(), i = 0; i < Ee.length; i++) {
          var n = Ee[i];

          if (!n.el.removed && !n.paused) {
            var a = r - n.start,
                s = n.ms,
                o = n.easing,
                l = n.from,
                h = n.diff,
                u = n.to,
                c = n.t,
                f = n.el,
                p = {},
                d,
                g = {},
                v;
            if (n.initstatus ? (a = (n.initstatus * n.anim.top - n.prev) / (n.percent - n.prev) * s, n.status = n.initstatus, delete n.initstatus, n.stop && Ee.splice(i--, 1)) : n.status = (n.prev + (n.percent - n.prev) * (a / s)) / n.anim.top, !(a < 0)) if (a < s) {
              var x = o(a / s);

              for (var y in l) {
                if (l[A](y)) {
                  switch (pt[y]) {
                    case $:
                      d = +l[y] + x * s * h[y];
                      break;

                    case "colour":
                      d = "rgb(" + [Le(ot(l[y].r + x * s * h[y].r)), Le(ot(l[y].g + x * s * h[y].g)), Le(ot(l[y].b + x * s * h[y].b))].join(",") + ")";
                      break;

                    case "path":
                      d = [];

                      for (var m = 0, _ = l[y].length; m < _; m++) {
                        d[m] = [l[y][m][0]];

                        for (var w = 1, k = l[y][m].length; w < k; w++) {
                          d[m][w] = +l[y][m][w] + x * s * h[y][m][w];
                        }

                        d[m] = d[m].join(j);
                      }

                      d = d.join(j);
                      break;

                    case "transform":
                      if (h[y].real) for (d = [], m = 0, _ = l[y].length; m < _; m++) {
                        for (d[m] = [l[y][m][0]], w = 1, k = l[y][m].length; w < k; w++) {
                          d[m][w] = l[y][m][w] + x * s * h[y][m][w];
                        }
                      } else {
                        var B = function B(t) {
                          return +l[y][t] + x * s * h[y][t];
                        };

                        d = [["m", B(0), B(1), B(2), B(3), B(4), B(5)]];
                      }
                      break;

                    case "csv":
                      if ("clip-rect" == y) for (d = [], m = 4; m--;) {
                        d[m] = +l[y][m] + x * s * h[y][m];
                      }
                      break;

                    default:
                      var C = [][P](l[y]);

                      for (d = [], m = f.paper.customAttributes[y].length; m--;) {
                        d[m] = +C[m] + x * s * h[y][m];
                      }

                  }

                  p[y] = d;
                }
              }

              f.attr(p), function (e, r, i) {
                setTimeout(function () {
                  t("raphael.anim.frame." + e, r, i);
                });
              }(f.id, f, n.anim);
            } else {
              if (function (r, i, n) {
                setTimeout(function () {
                  t("raphael.anim.frame." + i.id, i, n), t("raphael.anim.finish." + i.id, i, n), e.is(r, "function") && r.call(i);
                });
              }(n.callback, f, n.anim), f.attr(u), Ee.splice(i--, 1), n.repeat > 1 && !n.next) {
                for (v in u) {
                  u[A](v) && (g[v] = n.totalOrigin[v]);
                }

                n.el.attr(g), b(n.anim, n.el, n.anim.percents[0], null, n.totalOrigin, n.repeat - 1);
              }

              n.next && !n.stop && b(n.anim, n.el, n.next, null, n.totalOrigin, n.repeat);
            }
          }
        }

        Ee.length && Me(Ne);
      },
          Le = function Le(t) {
        return t > 255 ? 255 : t < 0 ? 0 : t;
      };

      ye.animateWith = function (t, r, i, n, a, s) {
        var o = this;
        if (o.removed) return s && s.call(o), o;
        var l = i instanceof m ? i : e.animation(i, n, a, s),
            h,
            u;
        b(l, o, l.percents[0], null, o.attr());

        for (var c = 0, f = Ee.length; c < f; c++) {
          if (Ee[c].anim == r && Ee[c].el == t) {
            Ee[f - 1].start = Ee[c].start;
            break;
          }
        }

        return o;
      }, ye.onAnimation = function (e) {
        return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this;
      }, m.prototype.delay = function (t) {
        var e = new m(this.anim, this.ms);
        return e.times = this.times, e.del = +t || 0, e;
      }, m.prototype.repeat = function (t) {
        var e = new m(this.anim, this.ms);
        return e.del = this.del, e.times = Y.floor(W(t, 0)) || 1, e;
      }, e.animation = function (t, r, i, n) {
        if (t instanceof m) return t;
        !e.is(i, "function") && i || (n = n || i || null, i = null), t = Object(t), r = +r || 0;
        var a = {},
            s,
            o;

        for (o in t) {
          t[A](o) && ht(o) != o && ht(o) + "%" != o && (s = !0, a[o] = t[o]);
        }

        if (s) return i && (a.easing = i), n && (a.callback = n), new m({
          100: a
        }, r);

        if (n) {
          var l = 0;

          for (var h in t) {
            var u = ut(h);
            t[A](h) && u > l && (l = u);
          }

          l += "%", !t[l].callback && (t[l].callback = n);
        }

        return new m(t, r);
      }, ye.animate = function (t, r, i, n) {
        var a = this;
        if (a.removed) return n && n.call(a), a;
        var s = t instanceof m ? t : e.animation(t, r, i, n);
        return b(s, a, s.percents[0], null, a.attr()), a;
      }, ye.setTime = function (t, e) {
        return t && null != e && this.status(t, G(e, t.ms) / t.ms), this;
      }, ye.status = function (t, e) {
        var r = [],
            i = 0,
            n,
            a;
        if (null != e) return b(t, this, -1, G(e, 1)), this;

        for (n = Ee.length; i < n; i++) {
          if (a = Ee[i], a.el.id == this.id && (!t || a.anim == t)) {
            if (t) return a.status;
            r.push({
              anim: a.anim,
              status: a.status
            });
          }
        }

        return t ? 0 : r;
      }, ye.pause = function (e) {
        for (var r = 0; r < Ee.length; r++) {
          Ee[r].el.id != this.id || e && Ee[r].anim != e || t("raphael.anim.pause." + this.id, this, Ee[r].anim) !== !1 && (Ee[r].paused = !0);
        }

        return this;
      }, ye.resume = function (e) {
        for (var r = 0; r < Ee.length; r++) {
          if (Ee[r].el.id == this.id && (!e || Ee[r].anim == e)) {
            var i = Ee[r];
            t("raphael.anim.resume." + this.id, this, i.anim) !== !1 && (delete i.paused, this.status(i.anim, i.status));
          }
        }

        return this;
      }, ye.stop = function (e) {
        for (var r = 0; r < Ee.length; r++) {
          Ee[r].el.id != this.id || e && Ee[r].anim != e || t("raphael.anim.stop." + this.id, this, Ee[r].anim) !== !1 && Ee.splice(r--, 1);
        }

        return this;
      }, t.on("raphael.remove", _), t.on("raphael.clear", _), ye.toString = function () {
        return "Raphaël’s object";
      };

      var ze = function ze(t) {
        if (this.items = [], this.length = 0, this.type = "set", t) for (var e = 0, r = t.length; e < r; e++) {
          !t[e] || t[e].constructor != ye.constructor && t[e].constructor != ze || (this[this.items.length] = this.items[this.items.length] = t[e], this.length++);
        }
      },
          Pe = ze.prototype;

      Pe.push = function () {
        for (var t, e, r = 0, i = arguments.length; r < i; r++) {
          t = arguments[r], !t || t.constructor != ye.constructor && t.constructor != ze || (e = this.items.length, this[e] = this.items[e] = t, this.length++);
        }

        return this;
      }, Pe.pop = function () {
        return this.length && delete this[this.length--], this.items.pop();
      }, Pe.forEach = function (t, e) {
        for (var r = 0, i = this.items.length; r < i; r++) {
          if (t.call(e, this.items[r], r) === !1) return this;
        }

        return this;
      };

      for (var Fe in ye) {
        ye[A](Fe) && (Pe[Fe] = function (t) {
          return function () {
            var e = arguments;
            return this.forEach(function (r) {
              r[t][z](r, e);
            });
          };
        }(Fe));
      }

      return Pe.attr = function (t, r) {
        if (t && e.is(t, Q) && e.is(t[0], "object")) for (var i = 0, n = t.length; i < n; i++) {
          this.items[i].attr(t[i]);
        } else for (var a = 0, s = this.items.length; a < s; a++) {
          this.items[a].attr(t, r);
        }
        return this;
      }, Pe.clear = function () {
        for (; this.length;) {
          this.pop();
        }
      }, Pe.splice = function (t, e, r) {
        t = t < 0 ? W(this.length + t, 0) : t, e = W(0, G(this.length - t, e));
        var i = [],
            n = [],
            a = [],
            s;

        for (s = 2; s < arguments.length; s++) {
          a.push(arguments[s]);
        }

        for (s = 0; s < e; s++) {
          n.push(this[t + s]);
        }

        for (; s < this.length - t; s++) {
          i.push(this[t + s]);
        }

        var o = a.length;

        for (s = 0; s < o + i.length; s++) {
          this.items[t + s] = this[t + s] = s < o ? a[s] : i[s - o];
        }

        for (s = this.items.length = this.length -= e - o; this[s];) {
          delete this[s++];
        }

        return new ze(n);
      }, Pe.exclude = function (t) {
        for (var e = 0, r = this.length; e < r; e++) {
          if (this[e] == t) return this.splice(e, 1), !0;
        }
      }, Pe.animate = function (t, r, i, n) {
        (e.is(i, "function") || !i) && (n = i || null);
        var a = this.items.length,
            s = a,
            o,
            l = this,
            h;
        if (!a) return this;
        n && (h = function h() {
          ! --a && n.call(l);
        }), i = e.is(i, Z) ? i : h;
        var u = e.animation(t, r, i, h);

        for (o = this.items[--s].animate(u); s--;) {
          this.items[s] && !this.items[s].removed && this.items[s].animateWith(o, u, u), this.items[s] && !this.items[s].removed || a--;
        }

        return this;
      }, Pe.insertAfter = function (t) {
        for (var e = this.items.length; e--;) {
          this.items[e].insertAfter(t);
        }

        return this;
      }, Pe.getBBox = function () {
        for (var t = [], e = [], r = [], i = [], n = this.items.length; n--;) {
          if (!this.items[n].removed) {
            var a = this.items[n].getBBox();
            t.push(a.x), e.push(a.y), r.push(a.x + a.width), i.push(a.y + a.height);
          }
        }

        return t = G[z](0, t), e = G[z](0, e), r = W[z](0, r), i = W[z](0, i), {
          x: t,
          y: e,
          x2: r,
          y2: i,
          width: r - t,
          height: i - e
        };
      }, Pe.clone = function (t) {
        t = this.paper.set();

        for (var e = 0, r = this.items.length; e < r; e++) {
          t.push(this.items[e].clone());
        }

        return t;
      }, Pe.toString = function () {
        return "Raphaël‘s set";
      }, Pe.glow = function (t) {
        var e = this.paper.set();
        return this.forEach(function (r, i) {
          var n = r.glow(t);
          null != n && n.forEach(function (t, r) {
            e.push(t);
          });
        }), e;
      }, Pe.isPointInside = function (t, e) {
        var r = !1;
        return this.forEach(function (i) {
          if (i.isPointInside(t, e)) return r = !0, !1;
        }), r;
      }, e.registerFont = function (t) {
        if (!t.face) return t;
        this.fonts = this.fonts || {};
        var e = {
          w: t.w,
          face: {},
          glyphs: {}
        },
            r = t.face["font-family"];

        for (var i in t.face) {
          t.face[A](i) && (e.face[i] = t.face[i]);
        }

        if (this.fonts[r] ? this.fonts[r].push(e) : this.fonts[r] = [e], !t.svg) {
          e.face["units-per-em"] = ut(t.face["units-per-em"], 10);

          for (var n in t.glyphs) {
            if (t.glyphs[A](n)) {
              var a = t.glyphs[n];
              if (e.glyphs[n] = {
                w: a.w,
                k: {},
                d: a.d && "M" + a.d.replace(/[mlcxtrv]/g, function (t) {
                  return {
                    l: "L",
                    c: "C",
                    x: "z",
                    t: "m",
                    r: "l",
                    v: "c"
                  }[t] || "M";
                }) + "z"
              }, a.k) for (var s in a.k) {
                a[A](s) && (e.glyphs[n].k[s] = a.k[s]);
              }
            }
          }
        }

        return t;
      }, N.getFont = function (t, r, i, n) {
        if (n = n || "normal", i = i || "normal", r = +r || {
          normal: 400,
          bold: 700,
          lighter: 300,
          bolder: 800
        }[r] || 400, e.fonts) {
          var a = e.fonts[t];

          if (!a) {
            var s = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, R) + "(\\s|$)", "i");

            for (var o in e.fonts) {
              if (e.fonts[A](o) && s.test(o)) {
                a = e.fonts[o];
                break;
              }
            }
          }

          var l;
          if (a) for (var h = 0, u = a.length; h < u && (l = a[h], l.face["font-weight"] != r || l.face["font-style"] != i && l.face["font-style"] || l.face["font-stretch"] != n); h++) {
            ;
          }
          return l;
        }
      }, N.print = function (t, r, i, n, a, s, o, l) {
        s = s || "middle", o = W(G(o || 0, 1), -1), l = W(G(l || 1, 3), 1);
        var h = I(i)[q](R),
            u = 0,
            c = 0,
            f = R,
            p;

        if (e.is(n, "string") && (n = this.getFont(n)), n) {
          p = (a || 16) / n.face["units-per-em"];

          for (var d = n.face.bbox[q](k), g = +d[0], v = d[3] - d[1], x = 0, y = +d[1] + ("baseline" == s ? v + +n.face.descent : v / 2), m = 0, b = h.length; m < b; m++) {
            if ("\n" == h[m]) u = 0, w = 0, c = 0, x += v * l;else {
              var _ = c && n.glyphs[h[m - 1]] || {},
                  w = n.glyphs[h[m]];

              u += c ? (_.w || n.w) + (_.k && _.k[h[m]] || 0) + n.w * o : 0, c = 1;
            }
            w && w.d && (f += e.transformPath(w.d, ["t", u * p, x * p, "s", p, p, g, y, "t", (t - g) / p, (r - y) / p]));
          }
        }

        return this.path(f).attr({
          fill: "#000",
          stroke: "none"
        });
      }, N.add = function (t) {
        if (e.is(t, "array")) for (var r = this.set(), i = 0, n = t.length, a; i < n; i++) {
          a = t[i] || {}, B[A](a.type) && r.push(this[a.type]().attr(a));
        }
        return r;
      }, e.format = function (t, r) {
        var i = e.is(r, Q) ? [0][P](r) : arguments;
        return t && e.is(t, Z) && i.length - 1 && (t = t.replace(C, function (t, e) {
          return null == i[++e] ? R : i[e];
        })), t || R;
      }, e.fullfill = function () {
        var t = /\{([^\}]+)\}/g,
            e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            r = function r(t, _r, i) {
          var n = i;
          return _r.replace(e, function (t, e, r, i, a) {
            e = e || i, n && (e in n && (n = n[e]), "function" == typeof n && a && (n = n()));
          }), n = (null == n || n == i ? t : n) + "";
        };

        return function (e, i) {
          return String(e).replace(t, function (t, e) {
            return r(t, e, i);
          });
        };
      }(), e.ninja = function () {
        if (E.was) T.win.Raphael = E.is;else {
          window.Raphael = void 0;

          try {
            delete window.Raphael;
          } catch (t) {}
        }
        return e;
      }, e.st = Pe, t.on("raphael.DOMload", function () {
        w = !0;
      }), function (t, r, _i) {
        function n() {
          /in/.test(t.readyState) ? setTimeout(n, 9) : e.eve("raphael.DOMload");
        }

        null == t.readyState && t.addEventListener && (t.addEventListener(r, _i = function i() {
          t.removeEventListener(r, _i, !1), t.readyState = "complete";
        }, !1), t.readyState = "loading"), n();
      }(document, "DOMContentLoaded"), e;
    }.apply(e, i), !(void 0 !== n && (t.exports = n));
  }, function (t, e, r) {
    var i, n;
    !function (r) {
      var a = "0.5.0",
          s = "hasOwnProperty",
          o = /[\.\/]/,
          l = /\s*,\s*/,
          h = "*",
          u = function u() {},
          c = function c(t, e) {
        return t - e;
      },
          f,
          p,
          d = {
        n: {}
      },
          g = function g() {
        for (var t = 0, e = this.length; t < e; t++) {
          if ("undefined" != typeof this[t]) return this[t];
        }
      },
          v = function v() {
        for (var t = this.length; --t;) {
          if ("undefined" != typeof this[t]) return this[t];
        }
      },
          x = Object.prototype.toString,
          y = String,
          m = Array.isArray || function (t) {
        return t instanceof Array || "[object Array]" == x.call(t);
      };

      eve = function (_eve) {
        function eve(_x, _x2) {
          return _eve.apply(this, arguments);
        }

        eve.toString = function () {
          return _eve.toString();
        };

        return eve;
      }(function (t, e) {
        var r = d,
            i = p,
            n = Array.prototype.slice.call(arguments, 2),
            a = eve.listeners(t),
            s = 0,
            o = !1,
            l,
            h = [],
            u = {},
            x = [],
            y = f,
            m = [];
        x.firstDefined = g, x.lastDefined = v, f = t, p = 0;

        for (var b = 0, _ = a.length; b < _; b++) {
          "zIndex" in a[b] && (h.push(a[b].zIndex), a[b].zIndex < 0 && (u[a[b].zIndex] = a[b]));
        }

        for (h.sort(c); h[s] < 0;) {
          if (l = u[h[s++]], x.push(l.apply(e, n)), p) return p = i, x;
        }

        for (b = 0; b < _; b++) {
          if (l = a[b], "zIndex" in l) {
            if (l.zIndex == h[s]) {
              if (x.push(l.apply(e, n)), p) break;

              do {
                if (s++, l = u[h[s]], l && x.push(l.apply(e, n)), p) break;
              } while (l);
            } else u[l.zIndex] = l;
          } else if (x.push(l.apply(e, n)), p) break;
        }

        return p = i, f = y, x;
      }), eve._events = d, eve.listeners = function (t) {
        var e = m(t) ? t : t.split(o),
            r = d,
            i,
            n,
            a,
            s,
            l,
            u,
            c,
            f,
            p = [r],
            g = [];

        for (s = 0, l = e.length; s < l; s++) {
          for (f = [], u = 0, c = p.length; u < c; u++) {
            for (r = p[u].n, n = [r[e[s]], r[h]], a = 2; a--;) {
              i = n[a], i && (f.push(i), g = g.concat(i.f || []));
            }
          }

          p = f;
        }

        return g;
      }, eve.separator = function (t) {
        t ? (t = y(t).replace(/(?=[\.\^\]\[\-])/g, "\\"), t = "[" + t + "]", o = new RegExp(t)) : o = /[\.\/]/;
      }, eve.on = function (t, e) {
        if ("function" != typeof e) return function () {};

        for (var r = m(t) ? m(t[0]) ? t : [t] : y(t).split(l), i = 0, n = r.length; i < n; i++) {
          !function (t) {
            for (var r = m(t) ? t : y(t).split(o), i = d, n, a = 0, s = r.length; a < s; a++) {
              i = i.n, i = i.hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = {
                n: {}
              });
            }

            for (i.f = i.f || [], a = 0, s = i.f.length; a < s; a++) {
              if (i.f[a] == e) {
                n = !0;
                break;
              }
            }

            !n && i.f.push(e);
          }(r[i]);
        }

        return function (t) {
          +t == +t && (e.zIndex = +t);
        };
      }, eve.f = function (t) {
        var e = [].slice.call(arguments, 1);
        return function () {
          eve.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)));
        };
      }, eve.stop = function () {
        p = 1;
      }, eve.nt = function (t) {
        var e = m(f) ? f.join(".") : f;
        return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e;
      }, eve.nts = function () {
        return m(f) ? f : f.split(o);
      }, eve.off = eve.unbind = function (t, e) {
        if (!t) return void (eve._events = d = {
          n: {}
        });
        var r = m(t) ? m(t[0]) ? t : [t] : y(t).split(l);
        if (r.length > 1) for (var i = 0, n = r.length; i < n; i++) {
          eve.off(r[i], e);
        } else {
          r = m(t) ? t : y(t).split(o);
          var a,
              u,
              c,
              i,
              n,
              f,
              p,
              g = [d];

          for (i = 0, n = r.length; i < n; i++) {
            for (f = 0; f < g.length; f += c.length - 2) {
              if (c = [f, 1], a = g[f].n, r[i] != h) a[r[i]] && c.push(a[r[i]]);else for (u in a) {
                a[s](u) && c.push(a[u]);
              }
              g.splice.apply(g, c);
            }
          }

          for (i = 0, n = g.length; i < n; i++) {
            for (a = g[i]; a.n;) {
              if (e) {
                if (a.f) {
                  for (f = 0, p = a.f.length; f < p; f++) {
                    if (a.f[f] == e) {
                      a.f.splice(f, 1);
                      break;
                    }
                  }

                  !a.f.length && delete a.f;
                }

                for (u in a.n) {
                  if (a.n[s](u) && a.n[u].f) {
                    var v = a.n[u].f;

                    for (f = 0, p = v.length; f < p; f++) {
                      if (v[f] == e) {
                        v.splice(f, 1);
                        break;
                      }
                    }

                    !v.length && delete a.n[u].f;
                  }
                }
              } else {
                delete a.f;

                for (u in a.n) {
                  a.n[s](u) && a.n[u].f && delete a.n[u].f;
                }
              }

              a = a.n;
            }
          }
        }
      }, eve.once = function (t, e) {
        var r = function r() {
          return eve.off(t, r), e.apply(this, arguments);
        };

        return eve.on(t, r);
      }, eve.version = a, eve.toString = function () {
        return "You are running Eve " + a;
      }, "undefined" != typeof t && t.exports ? t.exports = eve : (i = [], n = function () {
        return eve;
      }.apply(e, i), !(void 0 !== n && (t.exports = n)));
    }(this);
  }, function (t, e, r) {
    var i, n;
    i = [r(1)], n = function (t) {
      if (!t || t.svg) {
        var e = "hasOwnProperty",
            r = String,
            i = parseFloat,
            n = parseInt,
            a = Math,
            s = a.max,
            o = a.abs,
            l = a.pow,
            h = /[, ]+/,
            u = t.eve,
            c = "",
            f = " ",
            p = "http://www.w3.org/1999/xlink",
            d = {
          block: "M5,0 0,2.5 5,5z",
          classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
          diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
          open: "M6,1 1,3.5 6,6",
          oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
            g = {};

        t.toString = function () {
          return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
        };

        var v = function v(i, n) {
          if (n) {
            "string" == typeof i && (i = v(i));

            for (var a in n) {
              n[e](a) && ("xlink:" == a.substring(0, 6) ? i.setAttributeNS(p, a.substring(6), r(n[a])) : i.setAttribute(a, r(n[a])));
            }
          } else i = t._g.doc.createElementNS("http://www.w3.org/2000/svg", i), i.style && (i.style.webkitTapHighlightColor = "rgba(0,0,0,0)");

          return i;
        },
            x = function x(e, n) {
          var h = "linear",
              u = e.id + n,
              f = .5,
              p = .5,
              d = e.node,
              g = e.paper,
              x = d.style,
              y = t._g.doc.getElementById(u);

          if (!y) {
            if (n = r(n).replace(t._radial_gradient, function (t, e, r) {
              if (h = "radial", e && r) {
                f = i(e), p = i(r);
                var n = 2 * (p > .5) - 1;
                l(f - .5, 2) + l(p - .5, 2) > .25 && (p = a.sqrt(.25 - l(f - .5, 2)) * n + .5) && .5 != p && (p = p.toFixed(5) - 1e-5 * n);
              }

              return c;
            }), n = n.split(/\s*\-\s*/), "linear" == h) {
              var b = n.shift();
              if (b = -i(b), isNaN(b)) return null;
              var _ = [0, 0, a.cos(t.rad(b)), a.sin(t.rad(b))],
                  w = 1 / (s(o(_[2]), o(_[3])) || 1);
              _[2] *= w, _[3] *= w, _[2] < 0 && (_[0] = -_[2], _[2] = 0), _[3] < 0 && (_[1] = -_[3], _[3] = 0);
            }

            var k = t._parseDots(n);

            if (!k) return null;

            if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && u != e.gradient.id && (g.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
              y = v(h + "Gradient", {
                id: u
              }), e.gradient = y, v(y, "radial" == h ? {
                fx: f,
                fy: p
              } : {
                x1: _[0],
                y1: _[1],
                x2: _[2],
                y2: _[3],
                gradientTransform: e.matrix.invert()
              }), g.defs.appendChild(y);

              for (var B = 0, C = k.length; B < C; B++) {
                y.appendChild(v("stop", {
                  offset: k[B].offset ? k[B].offset : B ? "100%" : "0%",
                  "stop-color": k[B].color || "#fff",
                  "stop-opacity": isFinite(k[B].opacity) ? k[B].opacity : 1
                }));
              }
            }
          }

          return v(d, {
            fill: m(u),
            opacity: 1,
            "fill-opacity": 1
          }), x.fill = c, x.opacity = 1, x.fillOpacity = 1, 1;
        },
            y = function y() {
          var t = document.documentMode;
          return t && (9 === t || 10 === t);
        },
            m = function m(t) {
          if (y()) return "url('#" + t + "')";
          var e = document.location,
              r = e.protocol + "//" + e.host + e.pathname + e.search;
          return "url('" + r + "#" + t + "')";
        },
            b = function b(t) {
          var e = t.getBBox(1);
          v(t.pattern, {
            patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")"
          });
        },
            _ = function _(i, n, a) {
          if ("path" == i.type) {
            for (var s = r(n).toLowerCase().split("-"), o = i.paper, l = a ? "end" : "start", h = i.node, u = i.attrs, f = u["stroke-width"], p = s.length, x = "classic", y, m, b, _, w, k = 3, B = 3, C = 5; p--;) {
              switch (s[p]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                  x = s[p];
                  break;

                case "wide":
                  B = 5;
                  break;

                case "narrow":
                  B = 2;
                  break;

                case "long":
                  k = 5;
                  break;

                case "short":
                  k = 2;
              }
            }

            if ("open" == x ? (k += 2, B += 2, C += 2, b = 1, _ = a ? 4 : 1, w = {
              fill: "none",
              stroke: u.stroke
            }) : (_ = b = k / 2, w = {
              fill: u.stroke,
              stroke: "none"
            }), i._.arrows ? a ? (i._.arrows.endPath && g[i._.arrows.endPath]--, i._.arrows.endMarker && g[i._.arrows.endMarker]--) : (i._.arrows.startPath && g[i._.arrows.startPath]--, i._.arrows.startMarker && g[i._.arrows.startMarker]--) : i._.arrows = {}, "none" != x) {
              var S = "raphael-marker-" + x,
                  A = "raphael-marker-" + l + x + k + B + "-obj" + i.id;
              t._g.doc.getElementById(S) ? g[S]++ : (o.defs.appendChild(v(v("path"), {
                "stroke-linecap": "round",
                d: d[x],
                id: S
              })), g[S] = 1);

              var T = t._g.doc.getElementById(A),
                  E;

              T ? (g[A]++, E = T.getElementsByTagName("use")[0]) : (T = v(v("marker"), {
                id: A,
                markerHeight: B,
                markerWidth: k,
                orient: "auto",
                refX: _,
                refY: B / 2
              }), E = v(v("use"), {
                "xlink:href": "#" + S,
                transform: (a ? "rotate(180 " + k / 2 + " " + B / 2 + ") " : c) + "scale(" + k / C + "," + B / C + ")",
                "stroke-width": (1 / ((k / C + B / C) / 2)).toFixed(4)
              }), T.appendChild(E), o.defs.appendChild(T), g[A] = 1), v(E, w);
              var M = b * ("diamond" != x && "oval" != x);
              a ? (y = i._.arrows.startdx * f || 0, m = t.getTotalLength(u.path) - M * f) : (y = M * f, m = t.getTotalLength(u.path) - (i._.arrows.enddx * f || 0)), w = {}, w["marker-" + l] = "url(#" + A + ")", (m || y) && (w.d = t.getSubpath(u.path, y, m)), v(h, w), i._.arrows[l + "Path"] = S, i._.arrows[l + "Marker"] = A, i._.arrows[l + "dx"] = M, i._.arrows[l + "Type"] = x, i._.arrows[l + "String"] = n;
            } else a ? (y = i._.arrows.startdx * f || 0, m = t.getTotalLength(u.path) - y) : (y = 0, m = t.getTotalLength(u.path) - (i._.arrows.enddx * f || 0)), i._.arrows[l + "Path"] && v(h, {
              d: t.getSubpath(u.path, y, m)
            }), delete i._.arrows[l + "Path"], delete i._.arrows[l + "Marker"], delete i._.arrows[l + "dx"], delete i._.arrows[l + "Type"], delete i._.arrows[l + "String"];

            for (w in g) {
              if (g[e](w) && !g[w]) {
                var N = t._g.doc.getElementById(w);

                N && N.parentNode.removeChild(N);
              }
            }
          }
        },
            w = {
          "-": [3, 1],
          ".": [1, 1],
          "-.": [3, 1, 1, 1],
          "-..": [3, 1, 1, 1, 1, 1],
          ". ": [1, 3],
          "- ": [4, 3],
          "--": [8, 3],
          "- .": [4, 3, 1, 3],
          "--.": [8, 3, 1, 3],
          "--..": [8, 3, 1, 3, 1, 3]
        },
            k = function k(t, e, i) {
          if (e = w[r(e).toLowerCase()]) {
            for (var n = t.attrs["stroke-width"] || "1", a = {
              round: n,
              square: n,
              butt: 0
            }[t.attrs["stroke-linecap"] || i["stroke-linecap"]] || 0, s = [], o = e.length; o--;) {
              s[o] = e[o] * n + (o % 2 ? 1 : -1) * a;
            }

            v(t.node, {
              "stroke-dasharray": s.join(",")
            });
          } else v(t.node, {
            "stroke-dasharray": "none"
          });
        },
            B = function B(i, a) {
          var l = i.node,
              u = i.attrs,
              f = l.style.visibility;
          l.style.visibility = "hidden";

          for (var d in a) {
            if (a[e](d)) {
              if (!t._availableAttrs[e](d)) continue;
              var g = a[d];

              switch (u[d] = g, d) {
                case "blur":
                  i.blur(g);
                  break;

                case "title":
                  var y = l.getElementsByTagName("title");
                  if (y.length && (y = y[0])) y.firstChild.nodeValue = g;else {
                    y = v("title");

                    var m = t._g.doc.createTextNode(g);

                    y.appendChild(m), l.appendChild(y);
                  }
                  break;

                case "href":
                case "target":
                  var w = l.parentNode;

                  if ("a" != w.tagName.toLowerCase()) {
                    var B = v("a");
                    w.insertBefore(B, l), B.appendChild(l), w = B;
                  }

                  "target" == d ? w.setAttributeNS(p, "show", "blank" == g ? "new" : g) : w.setAttributeNS(p, d, g);
                  break;

                case "cursor":
                  l.style.cursor = g;
                  break;

                case "transform":
                  i.transform(g);
                  break;

                case "arrow-start":
                  _(i, g);

                  break;

                case "arrow-end":
                  _(i, g, 1);

                  break;

                case "clip-rect":
                  var C = r(g).split(h);

                  if (4 == C.length) {
                    i.clip && i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);
                    var A = v("clipPath"),
                        T = v("rect");
                    A.id = t.createUUID(), v(T, {
                      x: C[0],
                      y: C[1],
                      width: C[2],
                      height: C[3]
                    }), A.appendChild(T), i.paper.defs.appendChild(A), v(l, {
                      "clip-path": "url(#" + A.id + ")"
                    }), i.clip = T;
                  }

                  if (!g) {
                    var E = l.getAttribute("clip-path");

                    if (E) {
                      var M = t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g, c));

                      M && M.parentNode.removeChild(M), v(l, {
                        "clip-path": c
                      }), delete i.clip;
                    }
                  }

                  break;

                case "path":
                  "path" == i.type && (v(l, {
                    d: g ? u.path = t._pathToAbsolute(g) : "M0,0"
                  }), i._.dirty = 1, i._.arrows && ("startString" in i._.arrows && _(i, i._.arrows.startString), "endString" in i._.arrows && _(i, i._.arrows.endString, 1)));
                  break;

                case "width":
                  if (l.setAttribute(d, g), i._.dirty = 1, !u.fx) break;
                  d = "x", g = u.x;

                case "x":
                  u.fx && (g = -u.x - (u.width || 0));

                case "rx":
                  if ("rx" == d && "rect" == i.type) break;

                case "cx":
                  l.setAttribute(d, g), i.pattern && b(i), i._.dirty = 1;
                  break;

                case "height":
                  if (l.setAttribute(d, g), i._.dirty = 1, !u.fy) break;
                  d = "y", g = u.y;

                case "y":
                  u.fy && (g = -u.y - (u.height || 0));

                case "ry":
                  if ("ry" == d && "rect" == i.type) break;

                case "cy":
                  l.setAttribute(d, g), i.pattern && b(i), i._.dirty = 1;
                  break;

                case "r":
                  "rect" == i.type ? v(l, {
                    rx: g,
                    ry: g
                  }) : l.setAttribute(d, g), i._.dirty = 1;
                  break;

                case "src":
                  "image" == i.type && l.setAttributeNS(p, "href", g);
                  break;

                case "stroke-width":
                  1 == i._.sx && 1 == i._.sy || (g /= s(o(i._.sx), o(i._.sy)) || 1), l.setAttribute(d, g), u["stroke-dasharray"] && k(i, u["stroke-dasharray"], a), i._.arrows && ("startString" in i._.arrows && _(i, i._.arrows.startString), "endString" in i._.arrows && _(i, i._.arrows.endString, 1));
                  break;

                case "stroke-dasharray":
                  k(i, g, a);
                  break;

                case "fill":
                  var N = r(g).match(t._ISURL);

                  if (N) {
                    A = v("pattern");
                    var L = v("image");
                    A.id = t.createUUID(), v(A, {
                      x: 0,
                      y: 0,
                      patternUnits: "userSpaceOnUse",
                      height: 1,
                      width: 1
                    }), v(L, {
                      x: 0,
                      y: 0,
                      "xlink:href": N[1]
                    }), A.appendChild(L), function (e) {
                      t._preload(N[1], function () {
                        var t = this.offsetWidth,
                            r = this.offsetHeight;
                        v(e, {
                          width: t,
                          height: r
                        }), v(L, {
                          width: t,
                          height: r
                        });
                      });
                    }(A), i.paper.defs.appendChild(A), v(l, {
                      fill: "url(#" + A.id + ")"
                    }), i.pattern = A, i.pattern && b(i);
                    break;
                  }

                  var z = t.getRGB(g);

                  if (z.error) {
                    if (("circle" == i.type || "ellipse" == i.type || "r" != r(g).charAt()) && x(i, g)) {
                      if ("opacity" in u || "fill-opacity" in u) {
                        var P = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c));

                        if (P) {
                          var F = P.getElementsByTagName("stop");
                          v(F[F.length - 1], {
                            "stop-opacity": ("opacity" in u ? u.opacity : 1) * ("fill-opacity" in u ? u["fill-opacity"] : 1)
                          });
                        }
                      }

                      u.gradient = g, u.fill = "none";
                      break;
                    }
                  } else delete a.gradient, delete u.gradient, !t.is(u.opacity, "undefined") && t.is(a.opacity, "undefined") && v(l, {
                    opacity: u.opacity
                  }), !t.is(u["fill-opacity"], "undefined") && t.is(a["fill-opacity"], "undefined") && v(l, {
                    "fill-opacity": u["fill-opacity"]
                  });

                  z[e]("opacity") && v(l, {
                    "fill-opacity": z.opacity > 1 ? z.opacity / 100 : z.opacity
                  });

                case "stroke":
                  z = t.getRGB(g), l.setAttribute(d, z.hex), "stroke" == d && z[e]("opacity") && v(l, {
                    "stroke-opacity": z.opacity > 1 ? z.opacity / 100 : z.opacity
                  }), "stroke" == d && i._.arrows && ("startString" in i._.arrows && _(i, i._.arrows.startString), "endString" in i._.arrows && _(i, i._.arrows.endString, 1));
                  break;

                case "gradient":
                  ("circle" == i.type || "ellipse" == i.type || "r" != r(g).charAt()) && x(i, g);
                  break;

                case "opacity":
                  u.gradient && !u[e]("stroke-opacity") && v(l, {
                    "stroke-opacity": g > 1 ? g / 100 : g
                  });

                case "fill-opacity":
                  if (u.gradient) {
                    P = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c)), P && (F = P.getElementsByTagName("stop"), v(F[F.length - 1], {
                      "stop-opacity": g
                    }));
                    break;
                  }

                default:
                  "font-size" == d && (g = n(g, 10) + "px");
                  var R = d.replace(/(\-.)/g, function (t) {
                    return t.substring(1).toUpperCase();
                  });
                  l.style[R] = g, i._.dirty = 1, l.setAttribute(d, g);
              }
            }
          }

          S(i, a), l.style.visibility = f;
        },
            C = 1.2,
            S = function S(i, a) {
          if ("text" == i.type && (a[e]("text") || a[e]("font") || a[e]("font-size") || a[e]("x") || a[e]("y"))) {
            var s = i.attrs,
                o = i.node,
                l = o.firstChild ? n(t._g.doc.defaultView.getComputedStyle(o.firstChild, c).getPropertyValue("font-size"), 10) : 10;

            if (a[e]("text")) {
              for (s.text = a.text; o.firstChild;) {
                o.removeChild(o.firstChild);
              }

              for (var h = r(a.text).split("\n"), u = [], f, p = 0, d = h.length; p < d; p++) {
                f = v("tspan"), p && v(f, {
                  dy: l * C,
                  x: s.x
                }), f.appendChild(t._g.doc.createTextNode(h[p])), o.appendChild(f), u[p] = f;
              }
            } else for (u = o.getElementsByTagName("tspan"), p = 0, d = u.length; p < d; p++) {
              p ? v(u[p], {
                dy: l * C,
                x: s.x
              }) : v(u[0], {
                dy: 0
              });
            }

            v(o, {
              x: s.x,
              y: s.y
            }), i._.dirty = 1;

            var g = i._getBBox(),
                x = s.y - (g.y + g.height / 2);

            x && t.is(x, "finite") && v(u[0], {
              dy: x
            });
          }
        },
            A = function A(t) {
          return t.parentNode && "a" === t.parentNode.tagName.toLowerCase() ? t.parentNode : t;
        },
            T = function T(e, r) {
          function i() {
            return ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
          }

          var n = 0,
              a = 0;
          this[0] = this.node = e, e.raphael = !0, this.id = i(), e.raphaelid = this.id, this.matrix = t.matrix(), this.realPath = null, this.paper = r, this.attrs = this.attrs || {}, this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1
          }, !r.bottom && (r.bottom = this), this.prev = r.top, r.top && (r.top.next = this), r.top = this, this.next = null;
        },
            E = t.el;

        T.prototype = E, E.constructor = T, t._engine.path = function (t, e) {
          var r = v("path");
          e.canvas && e.canvas.appendChild(r);
          var i = new T(r, e);
          return i.type = "path", B(i, {
            fill: "none",
            stroke: "#000",
            path: t
          }), i;
        }, E.rotate = function (t, e, n) {
          if (this.removed) return this;

          if (t = r(t).split(h), t.length - 1 && (e = i(t[1]), n = i(t[2])), t = i(t[0]), null == n && (e = n), null == e || null == n) {
            var a = this.getBBox(1);
            e = a.x + a.width / 2, n = a.y + a.height / 2;
          }

          return this.transform(this._.transform.concat([["r", t, e, n]])), this;
        }, E.scale = function (t, e, n, a) {
          if (this.removed) return this;
          if (t = r(t).split(h), t.length - 1 && (e = i(t[1]), n = i(t[2]), a = i(t[3])), t = i(t[0]), null == e && (e = t), null == a && (n = a), null == n || null == a) var s = this.getBBox(1);
          return n = null == n ? s.x + s.width / 2 : n, a = null == a ? s.y + s.height / 2 : a, this.transform(this._.transform.concat([["s", t, e, n, a]])), this;
        }, E.translate = function (t, e) {
          return this.removed ? this : (t = r(t).split(h), t.length - 1 && (e = i(t[1])), t = i(t[0]) || 0, e = +e || 0, this.transform(this._.transform.concat([["t", t, e]])), this);
        }, E.transform = function (r) {
          var i = this._;
          if (null == r) return i.transform;

          if (t._extractTransform(this, r), this.clip && v(this.clip, {
            transform: this.matrix.invert()
          }), this.pattern && b(this), this.node && v(this.node, {
            transform: this.matrix
          }), 1 != i.sx || 1 != i.sy) {
            var n = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({
              "stroke-width": n
            });
          }

          return this;
        }, E.hide = function () {
          return this.removed || (this.node.style.display = "none"), this;
        }, E.show = function () {
          return this.removed || (this.node.style.display = ""), this;
        }, E.remove = function () {
          var e = A(this.node);

          if (!this.removed && e.parentNode) {
            var r = this.paper;
            r.__set__ && r.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && r.defs.removeChild(this.gradient), t._tear(this, r), e.parentNode.removeChild(e), this.removeData();

            for (var i in this) {
              this[i] = "function" == typeof this[i] ? t._removedFactory(i) : null;
            }

            this.removed = !0;
          }
        }, E._getBBox = function () {
          if ("none" == this.node.style.display) {
            this.show();
            var t = !0;
          }

          var e = !1,
              r;
          this.paper.canvas.parentElement ? r = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (r = this.paper.canvas.parentNode.style), r && "none" == r.display && (e = !0, r.display = "");
          var i = {};

          try {
            i = this.node.getBBox();
          } catch (n) {
            i = {
              x: this.node.clientLeft,
              y: this.node.clientTop,
              width: this.node.clientWidth,
              height: this.node.clientHeight
            };
          } finally {
            i = i || {}, e && (r.display = "none");
          }

          return t && this.hide(), i;
        }, E.attr = function (r, i) {
          if (this.removed) return this;

          if (null == r) {
            var n = {};

            for (var a in this.attrs) {
              this.attrs[e](a) && (n[a] = this.attrs[a]);
            }

            return n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n.transform = this._.transform, n;
          }

          if (null == i && t.is(r, "string")) {
            if ("fill" == r && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
            if ("transform" == r) return this._.transform;

            for (var s = r.split(h), o = {}, l = 0, c = s.length; l < c; l++) {
              r = s[l], r in this.attrs ? o[r] = this.attrs[r] : t.is(this.paper.customAttributes[r], "function") ? o[r] = this.paper.customAttributes[r].def : o[r] = t._availableAttrs[r];
            }

            return c - 1 ? o : o[s[0]];
          }

          if (null == i && t.is(r, "array")) {
            for (o = {}, l = 0, c = r.length; l < c; l++) {
              o[r[l]] = this.attr(r[l]);
            }

            return o;
          }

          if (null != i) {
            var f = {};
            f[r] = i;
          } else null != r && t.is(r, "object") && (f = r);

          for (var p in f) {
            u("raphael.attr." + p + "." + this.id, this, f[p]);
          }

          for (p in this.paper.customAttributes) {
            if (this.paper.customAttributes[e](p) && f[e](p) && t.is(this.paper.customAttributes[p], "function")) {
              var d = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
              this.attrs[p] = f[p];

              for (var g in d) {
                d[e](g) && (f[g] = d[g]);
              }
            }
          }

          return B(this, f), this;
        }, E.toFront = function () {
          if (this.removed) return this;
          var e = A(this.node);
          e.parentNode.appendChild(e);
          var r = this.paper;
          return r.top != this && t._tofront(this, r), this;
        }, E.toBack = function () {
          if (this.removed) return this;
          var e = A(this.node),
              r = e.parentNode;
          r.insertBefore(e, r.firstChild), t._toback(this, this.paper);
          var i = this.paper;
          return this;
        }, E.insertAfter = function (e) {
          if (this.removed || !e) return this;
          var r = A(this.node),
              i = A(e.node || e[e.length - 1].node);
          return i.nextSibling ? i.parentNode.insertBefore(r, i.nextSibling) : i.parentNode.appendChild(r), t._insertafter(this, e, this.paper), this;
        }, E.insertBefore = function (e) {
          if (this.removed || !e) return this;
          var r = A(this.node),
              i = A(e.node || e[0].node);
          return i.parentNode.insertBefore(r, i), t._insertbefore(this, e, this.paper), this;
        }, E.blur = function (e) {
          var r = this;

          if (0 !== +e) {
            var i = v("filter"),
                n = v("feGaussianBlur");
            r.attrs.blur = e, i.id = t.createUUID(), v(n, {
              stdDeviation: +e || 1.5
            }), i.appendChild(n), r.paper.defs.appendChild(i), r._blur = i, v(r.node, {
              filter: "url(#" + i.id + ")"
            });
          } else r._blur && (r._blur.parentNode.removeChild(r._blur), delete r._blur, delete r.attrs.blur), r.node.removeAttribute("filter");

          return r;
        }, t._engine.circle = function (t, e, r, i) {
          var n = v("circle");
          t.canvas && t.canvas.appendChild(n);
          var a = new T(n, t);
          return a.attrs = {
            cx: e,
            cy: r,
            r: i,
            fill: "none",
            stroke: "#000"
          }, a.type = "circle", v(n, a.attrs), a;
        }, t._engine.rect = function (t, e, r, i, n, a) {
          var s = v("rect");
          t.canvas && t.canvas.appendChild(s);
          var o = new T(s, t);
          return o.attrs = {
            x: e,
            y: r,
            width: i,
            height: n,
            rx: a || 0,
            ry: a || 0,
            fill: "none",
            stroke: "#000"
          }, o.type = "rect", v(s, o.attrs), o;
        }, t._engine.ellipse = function (t, e, r, i, n) {
          var a = v("ellipse");
          t.canvas && t.canvas.appendChild(a);
          var s = new T(a, t);
          return s.attrs = {
            cx: e,
            cy: r,
            rx: i,
            ry: n,
            fill: "none",
            stroke: "#000"
          }, s.type = "ellipse", v(a, s.attrs), s;
        }, t._engine.image = function (t, e, r, i, n, a) {
          var s = v("image");
          v(s, {
            x: r,
            y: i,
            width: n,
            height: a,
            preserveAspectRatio: "none"
          }), s.setAttributeNS(p, "href", e), t.canvas && t.canvas.appendChild(s);
          var o = new T(s, t);
          return o.attrs = {
            x: r,
            y: i,
            width: n,
            height: a,
            src: e
          }, o.type = "image", o;
        }, t._engine.text = function (e, r, i, n) {
          var a = v("text");
          e.canvas && e.canvas.appendChild(a);
          var s = new T(a, e);
          return s.attrs = {
            x: r,
            y: i,
            "text-anchor": "middle",
            text: n,
            "font-family": t._availableAttrs["font-family"],
            "font-size": t._availableAttrs["font-size"],
            stroke: "none",
            fill: "#000"
          }, s.type = "text", B(s, s.attrs), s;
        }, t._engine.setSize = function (t, e) {
          return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this;
        }, t._engine.create = function () {
          var e = t._getContainer.apply(0, arguments),
              r = e && e.container,
              i = e.x,
              n = e.y,
              a = e.width,
              s = e.height;

          if (!r) throw new Error("SVG container not found.");
          var o = v("svg"),
              l = "overflow:hidden;",
              h;
          return i = i || 0, n = n || 0, a = a || 512, s = s || 342, v(o, {
            height: s,
            version: 1.1,
            width: a,
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          }), 1 == r ? (o.style.cssText = l + "position:absolute;left:" + i + "px;top:" + n + "px", t._g.doc.body.appendChild(o), h = 1) : (o.style.cssText = l + "position:relative", r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o)), r = new t._Paper(), r.width = a, r.height = s, r.canvas = o, r.clear(), r._left = r._top = 0, h && (r.renderfix = function () {}), r.renderfix(), r;
        }, t._engine.setViewBox = function (t, e, r, i, n) {
          u("raphael.setViewBox", this, this._viewBox, [t, e, r, i, n]);
          var a = this.getSize(),
              o = s(r / a.width, i / a.height),
              l = this.top,
              h = n ? "xMidYMid meet" : "xMinYMin",
              c,
              p;

          for (null == t ? (this._vbSize && (o = 1), delete this._vbSize, c = "0 0 " + this.width + f + this.height) : (this._vbSize = o, c = t + f + e + f + r + f + i), v(this.canvas, {
            viewBox: c,
            preserveAspectRatio: h
          }); o && l;) {
            p = "stroke-width" in l.attrs ? l.attrs["stroke-width"] : 1, l.attr({
              "stroke-width": p
            }), l._.dirty = 1, l._.dirtyT = 1, l = l.prev;
          }

          return this._viewBox = [t, e, r, i, !!n], this;
        }, t.prototype.renderfix = function () {
          var t = this.canvas,
              e = t.style,
              r;

          try {
            r = t.getScreenCTM() || t.createSVGMatrix();
          } catch (i) {
            r = t.createSVGMatrix();
          }

          var n = -r.e % 1,
              a = -r.f % 1;
          (n || a) && (n && (this._left = (this._left + n) % 1, e.left = this._left + "px"), a && (this._top = (this._top + a) % 1, e.top = this._top + "px"));
        }, t.prototype.clear = function () {
          t.eve("raphael.clear", this);

          for (var e = this.canvas; e.firstChild;) {
            e.removeChild(e.firstChild);
          }

          this.bottom = this.top = null, (this.desc = v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël " + t.version)), e.appendChild(this.desc), e.appendChild(this.defs = v("defs"));
        }, t.prototype.remove = function () {
          u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);

          for (var e in this) {
            this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
          }
        };
        var M = t.st;

        for (var N in E) {
          E[e](N) && !M[e](N) && (M[N] = function (t) {
            return function () {
              var e = arguments;
              return this.forEach(function (r) {
                r[t].apply(r, e);
              });
            };
          }(N));
        }
      }
    }.apply(e, i), !(void 0 !== n && (t.exports = n));
  }, function (t, e, r) {
    var i, n;
    i = [r(1)], n = function (t) {
      if (!t || t.vml) {
        var e = "hasOwnProperty",
            r = String,
            i = parseFloat,
            n = Math,
            a = n.round,
            s = n.max,
            o = n.min,
            l = n.abs,
            h = "fill",
            u = /[, ]+/,
            c = t.eve,
            f = " progid:DXImageTransform.Microsoft",
            p = " ",
            d = "",
            g = {
          M: "m",
          L: "l",
          C: "c",
          Z: "x",
          m: "t",
          l: "r",
          c: "v",
          z: "x"
        },
            v = /([clmz]),?([^clmz]*)/gi,
            x = / progid:\S+Blur\([^\)]+\)/g,
            y = /-?[^,\s-]+/g,
            m = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",
            b = 21600,
            _ = {
          path: 1,
          rect: 1,
          image: 1
        },
            w = {
          circle: 1,
          ellipse: 1
        },
            k = function k(e) {
          var i = /[ahqstv]/gi,
              n = t._pathToAbsolute;

          if (r(e).match(i) && (n = t._path2curve), i = /[clmz]/g, n == t._pathToAbsolute && !r(e).match(i)) {
            var s = r(e).replace(v, function (t, e, r) {
              var i = [],
                  n = "m" == e.toLowerCase(),
                  s = g[e];
              return r.replace(y, function (t) {
                n && 2 == i.length && (s += i + g["m" == e ? "l" : "L"], i = []), i.push(a(t * b));
              }), s + i;
            });
            return s;
          }

          var o = n(e),
              l,
              h;
          s = [];

          for (var u = 0, c = o.length; u < c; u++) {
            l = o[u], h = o[u][0].toLowerCase(), "z" == h && (h = "x");

            for (var f = 1, x = l.length; f < x; f++) {
              h += a(l[f] * b) + (f != x - 1 ? "," : d);
            }

            s.push(h);
          }

          return s.join(p);
        },
            B = function B(e, r, i) {
          var n = t.matrix();
          return n.rotate(-e, .5, .5), {
            dx: n.x(r, i),
            dy: n.y(r, i)
          };
        },
            C = function C(t, e, r, i, n, a) {
          var s = t._,
              o = t.matrix,
              u = s.fillpos,
              c = t.node,
              f = c.style,
              d = 1,
              g = "",
              v,
              x = b / e,
              y = b / r;

          if (f.visibility = "hidden", e && r) {
            if (c.coordsize = l(x) + p + l(y), f.rotation = a * (e * r < 0 ? -1 : 1), a) {
              var m = B(a, i, n);
              i = m.dx, n = m.dy;
            }

            if (e < 0 && (g += "x"), r < 0 && (g += " y") && (d = -1), f.flip = g, c.coordorigin = i * -x + p + n * -y, u || s.fillsize) {
              var _ = c.getElementsByTagName(h);

              _ = _ && _[0], c.removeChild(_), u && (m = B(a, o.x(u[0], u[1]), o.y(u[0], u[1])), _.position = m.dx * d + p + m.dy * d), s.fillsize && (_.size = s.fillsize[0] * l(e) + p + s.fillsize[1] * l(r)), c.appendChild(_);
            }

            f.visibility = "visible";
          }
        };

        t.toString = function () {
          return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
        };

        var S = function S(t, e, i) {
          for (var n = r(e).toLowerCase().split("-"), a = i ? "end" : "start", s = n.length, o = "classic", l = "medium", h = "medium"; s--;) {
            switch (n[s]) {
              case "block":
              case "classic":
              case "oval":
              case "diamond":
              case "open":
              case "none":
                o = n[s];
                break;

              case "wide":
              case "narrow":
                h = n[s];
                break;

              case "long":
              case "short":
                l = n[s];
            }
          }

          var u = t.node.getElementsByTagName("stroke")[0];
          u[a + "arrow"] = o, u[a + "arrowlength"] = l, u[a + "arrowwidth"] = h;
        },
            A = function A(n, l) {
          n.attrs = n.attrs || {};
          var c = n.node,
              f = n.attrs,
              g = c.style,
              v,
              x = _[n.type] && (l.x != f.x || l.y != f.y || l.width != f.width || l.height != f.height || l.cx != f.cx || l.cy != f.cy || l.rx != f.rx || l.ry != f.ry || l.r != f.r),
              y = w[n.type] && (f.cx != l.cx || f.cy != l.cy || f.r != l.r || f.rx != l.rx || f.ry != l.ry),
              m = n;

          for (var B in l) {
            l[e](B) && (f[B] = l[B]);
          }

          if (x && (f.path = t._getPath[n.type](n), n._.dirty = 1), l.href && (c.href = l.href), l.title && (c.title = l.title), l.target && (c.target = l.target), l.cursor && (g.cursor = l.cursor), "blur" in l && n.blur(l.blur), (l.path && "path" == n.type || x) && (c.path = k(~r(f.path).toLowerCase().indexOf("r") ? t._pathToAbsolute(f.path) : f.path), n._.dirty = 1, "image" == n.type && (n._.fillpos = [f.x, f.y], n._.fillsize = [f.width, f.height], C(n, 1, 1, 0, 0, 0))), "transform" in l && n.transform(l.transform), y) {
            var A = +f.cx,
                E = +f.cy,
                M = +f.rx || +f.r || 0,
                L = +f.ry || +f.r || 0;
            c.path = t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a((A - M) * b), a((E - L) * b), a((A + M) * b), a((E + L) * b), a(A * b)), n._.dirty = 1;
          }

          if ("clip-rect" in l) {
            var z = r(l["clip-rect"]).split(u);

            if (4 == z.length) {
              z[2] = +z[2] + +z[0], z[3] = +z[3] + +z[1];

              var P = c.clipRect || t._g.doc.createElement("div"),
                  F = P.style;

              F.clip = t.format("rect({1}px {2}px {3}px {0}px)", z), c.clipRect || (F.position = "absolute", F.top = 0, F.left = 0, F.width = n.paper.width + "px", F.height = n.paper.height + "px", c.parentNode.insertBefore(P, c), P.appendChild(c), c.clipRect = P);
            }

            l["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto");
          }

          if (n.textpath) {
            var R = n.textpath.style;
            l.font && (R.font = l.font), l["font-family"] && (R.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), l["font-size"] && (R.fontSize = l["font-size"]), l["font-weight"] && (R.fontWeight = l["font-weight"]), l["font-style"] && (R.fontStyle = l["font-style"]);
          }

          if ("arrow-start" in l && S(m, l["arrow-start"]), "arrow-end" in l && S(m, l["arrow-end"], 1), null != l.opacity || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
            var j = c.getElementsByTagName(h),
                I = !1;

            if (j = j && j[0], !j && (I = j = N(h)), "image" == n.type && l.src && (j.src = l.src), l.fill && (j.on = !0), null != j.on && "none" != l.fill && null !== l.fill || (j.on = !1), j.on && l.fill) {
              var q = r(l.fill).match(t._ISURL);

              if (q) {
                j.parentNode == c && c.removeChild(j), j.rotate = !0, j.src = q[1], j.type = "tile";
                var D = n.getBBox(1);
                j.position = D.x + p + D.y, n._.fillpos = [D.x, D.y], t._preload(q[1], function () {
                  n._.fillsize = [this.offsetWidth, this.offsetHeight];
                });
              } else j.color = t.getRGB(l.fill).hex, j.src = d, j.type = "solid", t.getRGB(l.fill).error && (m.type in {
                circle: 1,
                ellipse: 1
              } || "r" != r(l.fill).charAt()) && T(m, l.fill, j) && (f.fill = "none", f.gradient = l.fill, j.rotate = !1);
            }

            if ("fill-opacity" in l || "opacity" in l) {
              var V = ((+f["fill-opacity"] + 1 || 2) - 1) * ((+f.opacity + 1 || 2) - 1) * ((+t.getRGB(l.fill).o + 1 || 2) - 1);
              V = o(s(V, 0), 1), j.opacity = V, j.src && (j.color = "none");
            }

            c.appendChild(j);
            var O = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0],
                Y = !1;
            !O && (Y = O = N("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (O.on = !0), ("none" == l.stroke || null === l.stroke || null == O.on || 0 == l.stroke || 0 == l["stroke-width"]) && (O.on = !1);
            var W = t.getRGB(l.stroke);
            O.on && l.stroke && (O.color = W.hex), V = ((+f["stroke-opacity"] + 1 || 2) - 1) * ((+f.opacity + 1 || 2) - 1) * ((+W.o + 1 || 2) - 1);
            var G = .75 * (i(l["stroke-width"]) || 1);

            if (V = o(s(V, 0), 1), null == l["stroke-width"] && (G = f["stroke-width"]), l["stroke-width"] && (O.weight = G), G && G < 1 && (V *= G) && (O.weight = 1), O.opacity = V, l["stroke-linejoin"] && (O.joinstyle = l["stroke-linejoin"] || "miter"), O.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (O.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), "stroke-dasharray" in l) {
              var H = {
                "-": "shortdash",
                ".": "shortdot",
                "-.": "shortdashdot",
                "-..": "shortdashdotdot",
                ". ": "dot",
                "- ": "dash",
                "--": "longdash",
                "- .": "dashdot",
                "--.": "longdashdot",
                "--..": "longdashdotdot"
              };
              O.dashstyle = H[e](l["stroke-dasharray"]) ? H[l["stroke-dasharray"]] : d;
            }

            Y && c.appendChild(O);
          }

          if ("text" == m.type) {
            m.paper.canvas.style.display = d;
            var X = m.paper.span,
                U = 100,
                $ = f.font && f.font.match(/\d+(?:\.\d*)?(?=px)/);
            g = X.style, f.font && (g.font = f.font), f["font-family"] && (g.fontFamily = f["font-family"]), f["font-weight"] && (g.fontWeight = f["font-weight"]), f["font-style"] && (g.fontStyle = f["font-style"]), $ = i(f["font-size"] || $ && $[0]) || 10, g.fontSize = $ * U + "px", m.textpath.string && (X.innerHTML = r(m.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var Z = X.getBoundingClientRect();
            m.W = f.w = (Z.right - Z.left) / U, m.H = f.h = (Z.bottom - Z.top) / U, m.X = f.x, m.Y = f.y + m.H / 2, ("x" in l || "y" in l) && (m.path.v = t.format("m{0},{1}l{2},{1}", a(f.x * b), a(f.y * b), a(f.x * b) + 1));

            for (var Q = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], J = 0, K = Q.length; J < K; J++) {
              if (Q[J] in l) {
                m._.dirty = 1;
                break;
              }
            }

            switch (f["text-anchor"]) {
              case "start":
                m.textpath.style["v-text-align"] = "left", m.bbx = m.W / 2;
                break;

              case "end":
                m.textpath.style["v-text-align"] = "right", m.bbx = -m.W / 2;
                break;

              default:
                m.textpath.style["v-text-align"] = "center", m.bbx = 0;
            }

            m.textpath.style["v-text-kern"] = !0;
          }
        },
            T = function T(e, a, s) {
          e.attrs = e.attrs || {};
          var o = e.attrs,
              l = Math.pow,
              h,
              u,
              c = "linear",
              f = ".5 .5";

          if (e.attrs.gradient = a, a = r(a).replace(t._radial_gradient, function (t, e, r) {
            return c = "radial", e && r && (e = i(e), r = i(r), l(e - .5, 2) + l(r - .5, 2) > .25 && (r = n.sqrt(.25 - l(e - .5, 2)) * (2 * (r > .5) - 1) + .5), f = e + p + r), d;
          }), a = a.split(/\s*\-\s*/), "linear" == c) {
            var g = a.shift();
            if (g = -i(g), isNaN(g)) return null;
          }

          var v = t._parseDots(a);

          if (!v) return null;

          if (e = e.shape || e.node, v.length) {
            e.removeChild(s), s.on = !0, s.method = "none", s.color = v[0].color, s.color2 = v[v.length - 1].color;

            for (var x = [], y = 0, m = v.length; y < m; y++) {
              v[y].offset && x.push(v[y].offset + p + v[y].color);
            }

            s.colors = x.length ? x.join() : "0% " + s.color, "radial" == c ? (s.type = "gradientTitle", s.focus = "100%", s.focussize = "0 0", s.focusposition = f, s.angle = 0) : (s.type = "gradient", s.angle = (270 - g) % 360), e.appendChild(s);
          }

          return 1;
        },
            E = function E(e, r) {
          this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = r, this.matrix = t.matrix(), this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
          }, !r.bottom && (r.bottom = this), this.prev = r.top, r.top && (r.top.next = this), r.top = this, this.next = null;
        },
            M = t.el;

        E.prototype = M, M.constructor = E, M.transform = function (e) {
          if (null == e) return this._.transform;
          var i = this.paper._viewBoxShift,
              n = i ? "s" + [i.scale, i.scale] + "-1-1t" + [i.dx, i.dy] : d,
              a;
          i && (a = e = r(e).replace(/\.{3}|\u2026/g, this._.transform || d)), t._extractTransform(this, n + e);
          var s = this.matrix.clone(),
              o = this.skew,
              l = this.node,
              h,
              u = ~r(this.attrs.fill).indexOf("-"),
              c = !r(this.attrs.fill).indexOf("url(");
          if (s.translate(1, 1), c || u || "image" == this.type) {
            if (o.matrix = "1 0 0 1", o.offset = "0 0", h = s.split(), u && h.noRotation || !h.isSimple) {
              l.style.filter = s.toFilter();
              var f = this.getBBox(),
                  g = this.getBBox(1),
                  v = f.x - g.x,
                  x = f.y - g.y;
              l.coordorigin = v * -b + p + x * -b, C(this, 1, 1, v, x, 0);
            } else l.style.filter = d, C(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate);
          } else l.style.filter = d, o.matrix = r(s), o.offset = s.offset();
          return null !== a && (this._.transform = a, t._extractTransform(this, a)), this;
        }, M.rotate = function (t, e, n) {
          if (this.removed) return this;

          if (null != t) {
            if (t = r(t).split(u), t.length - 1 && (e = i(t[1]), n = i(t[2])), t = i(t[0]), null == n && (e = n), null == e || null == n) {
              var a = this.getBBox(1);
              e = a.x + a.width / 2, n = a.y + a.height / 2;
            }

            return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", t, e, n]])), this;
          }
        }, M.translate = function (t, e) {
          return this.removed ? this : (t = r(t).split(u), t.length - 1 && (e = i(t[1])), t = i(t[0]) || 0, e = +e || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += e), this.transform(this._.transform.concat([["t", t, e]])), this);
        }, M.scale = function (t, e, n, a) {
          if (this.removed) return this;
          if (t = r(t).split(u), t.length - 1 && (e = i(t[1]), n = i(t[2]), a = i(t[3]), isNaN(n) && (n = null), isNaN(a) && (a = null)), t = i(t[0]), null == e && (e = t), null == a && (n = a), null == n || null == a) var s = this.getBBox(1);
          return n = null == n ? s.x + s.width / 2 : n, a = null == a ? s.y + s.height / 2 : a, this.transform(this._.transform.concat([["s", t, e, n, a]])), this._.dirtyT = 1, this;
        }, M.hide = function () {
          return !this.removed && (this.node.style.display = "none"), this;
        }, M.show = function () {
          return !this.removed && (this.node.style.display = d), this;
        }, M.auxGetBBox = t.el.getBBox, M.getBBox = function () {
          var t = this.auxGetBBox();

          if (this.paper && this.paper._viewBoxShift) {
            var e = {},
                r = 1 / this.paper._viewBoxShift.scale;
            return e.x = t.x - this.paper._viewBoxShift.dx, e.x *= r, e.y = t.y - this.paper._viewBoxShift.dy, e.y *= r, e.width = t.width * r, e.height = t.height * r, e.x2 = e.x + e.width, e.y2 = e.y + e.height, e;
          }

          return t;
        }, M._getBBox = function () {
          return this.removed ? {} : {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
          };
        }, M.remove = function () {
          if (!this.removed && this.node.parentNode) {
            this.paper.__set__ && this.paper.__set__.exclude(this), t.eve.unbind("raphael.*.*." + this.id), t._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);

            for (var e in this) {
              this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
            }

            this.removed = !0;
          }
        }, M.attr = function (r, i) {
          if (this.removed) return this;

          if (null == r) {
            var n = {};

            for (var a in this.attrs) {
              this.attrs[e](a) && (n[a] = this.attrs[a]);
            }

            return n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n.transform = this._.transform, n;
          }

          if (null == i && t.is(r, "string")) {
            if (r == h && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;

            for (var s = r.split(u), o = {}, l = 0, f = s.length; l < f; l++) {
              r = s[l], r in this.attrs ? o[r] = this.attrs[r] : t.is(this.paper.customAttributes[r], "function") ? o[r] = this.paper.customAttributes[r].def : o[r] = t._availableAttrs[r];
            }

            return f - 1 ? o : o[s[0]];
          }

          if (this.attrs && null == i && t.is(r, "array")) {
            for (o = {}, l = 0, f = r.length; l < f; l++) {
              o[r[l]] = this.attr(r[l]);
            }

            return o;
          }

          var p;
          null != i && (p = {}, p[r] = i), null == i && t.is(r, "object") && (p = r);

          for (var d in p) {
            c("raphael.attr." + d + "." + this.id, this, p[d]);
          }

          if (p) {
            for (d in this.paper.customAttributes) {
              if (this.paper.customAttributes[e](d) && p[e](d) && t.is(this.paper.customAttributes[d], "function")) {
                var g = this.paper.customAttributes[d].apply(this, [].concat(p[d]));
                this.attrs[d] = p[d];

                for (var v in g) {
                  g[e](v) && (p[v] = g[v]);
                }
              }
            }

            p.text && "text" == this.type && (this.textpath.string = p.text), A(this, p);
          }

          return this;
        }, M.toFront = function () {
          return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t._tofront(this, this.paper), this;
        }, M.toBack = function () {
          return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper)), this);
        }, M.insertAfter = function (e) {
          return this.removed ? this : (e.constructor == t.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this);
        }, M.insertBefore = function (e) {
          return this.removed ? this : (e.constructor == t.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), t._insertbefore(this, e, this.paper), this);
        }, M.blur = function (e) {
          var r = this.node.runtimeStyle,
              i = r.filter;
          return i = i.replace(x, d), 0 !== +e ? (this.attrs.blur = e, r.filter = i + p + f + ".Blur(pixelradius=" + (+e || 1.5) + ")", r.margin = t.format("-{0}px 0 0 -{0}px", a(+e || 1.5))) : (r.filter = i, r.margin = 0, delete this.attrs.blur), this;
        }, t._engine.path = function (t, e) {
          var r = N("shape");
          r.style.cssText = m, r.coordsize = b + p + b, r.coordorigin = e.coordorigin;
          var i = new E(r, e),
              n = {
            fill: "none",
            stroke: "#000"
          };
          t && (n.path = t), i.type = "path", i.path = [], i.Path = d, A(i, n), e.canvas && e.canvas.appendChild(r);
          var a = N("skew");
          return a.on = !0, r.appendChild(a), i.skew = a, i.transform(d), i;
        }, t._engine.rect = function (e, r, i, n, a, s) {
          var o = t._rectPath(r, i, n, a, s),
              l = e.path(o),
              h = l.attrs;

          return l.X = h.x = r, l.Y = h.y = i, l.W = h.width = n, l.H = h.height = a, h.r = s, h.path = o, l.type = "rect", l;
        }, t._engine.ellipse = function (t, e, r, i, n) {
          var a = t.path(),
              s = a.attrs;
          return a.X = e - i, a.Y = r - n, a.W = 2 * i, a.H = 2 * n, a.type = "ellipse", A(a, {
            cx: e,
            cy: r,
            rx: i,
            ry: n
          }), a;
        }, t._engine.circle = function (t, e, r, i) {
          var n = t.path(),
              a = n.attrs;
          return n.X = e - i, n.Y = r - i, n.W = n.H = 2 * i, n.type = "circle", A(n, {
            cx: e,
            cy: r,
            r: i
          }), n;
        }, t._engine.image = function (e, r, i, n, a, s) {
          var o = t._rectPath(i, n, a, s),
              l = e.path(o).attr({
            stroke: "none"
          }),
              u = l.attrs,
              c = l.node,
              f = c.getElementsByTagName(h)[0];

          return u.src = r, l.X = u.x = i, l.Y = u.y = n, l.W = u.width = a, l.H = u.height = s, u.path = o, l.type = "image", f.parentNode == c && c.removeChild(f), f.rotate = !0, f.src = r, f.type = "tile", l._.fillpos = [i, n], l._.fillsize = [a, s], c.appendChild(f), C(l, 1, 1, 0, 0, 0), l;
        }, t._engine.text = function (e, i, n, s) {
          var o = N("shape"),
              l = N("path"),
              h = N("textpath");
          i = i || 0, n = n || 0, s = s || "", l.v = t.format("m{0},{1}l{2},{1}", a(i * b), a(n * b), a(i * b) + 1), l.textpathok = !0, h.string = r(s), h.on = !0, o.style.cssText = m, o.coordsize = b + p + b, o.coordorigin = "0 0";
          var u = new E(o, e),
              c = {
            fill: "#000",
            stroke: "none",
            font: t._availableAttrs.font,
            text: s
          };
          u.shape = o, u.path = l, u.textpath = h, u.type = "text", u.attrs.text = r(s), u.attrs.x = i, u.attrs.y = n, u.attrs.w = 1, u.attrs.h = 1, A(u, c), o.appendChild(h), o.appendChild(l), e.canvas.appendChild(o);
          var f = N("skew");
          return f.on = !0, o.appendChild(f), u.skew = f, u.transform(d), u;
        }, t._engine.setSize = function (e, r) {
          var i = this.canvas.style;
          return this.width = e, this.height = r, e == +e && (e += "px"), r == +r && (r += "px"), i.width = e, i.height = r, i.clip = "rect(0 " + e + " " + r + " 0)", this._viewBox && t._engine.setViewBox.apply(this, this._viewBox), this;
        }, t._engine.setViewBox = function (e, r, i, n, a) {
          t.eve("raphael.setViewBox", this, this._viewBox, [e, r, i, n, a]);
          var s = this.getSize(),
              o = s.width,
              l = s.height,
              h,
              u;
          return a && (h = l / n, u = o / i, i * h < o && (e -= (o - i * h) / 2 / h), n * u < l && (r -= (l - n * u) / 2 / u)), this._viewBox = [e, r, i, n, !!a], this._viewBoxShift = {
            dx: -e,
            dy: -r,
            scale: s
          }, this.forEach(function (t) {
            t.transform("...");
          }), this;
        };
        var N;
        t._engine.initWin = function (t) {
          var e = t.document;
          e.styleSheets.length < 31 ? e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : e.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");

          try {
            !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), N = function N(t) {
              return e.createElement("<rvml:" + t + ' class="rvml">');
            };
          } catch (r) {
            N = function N(t) {
              return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
          }
        }, t._engine.initWin(t._g.win), t._engine.create = function () {
          var e = t._getContainer.apply(0, arguments),
              r = e.container,
              i = e.height,
              n,
              a = e.width,
              s = e.x,
              o = e.y;

          if (!r) throw new Error("VML container not found.");

          var l = new t._Paper(),
              h = l.canvas = t._g.doc.createElement("div"),
              u = h.style;

          return s = s || 0, o = o || 0, a = a || 512, i = i || 342, l.width = a, l.height = i, a == +a && (a += "px"), i == +i && (i += "px"), l.coordsize = 1e3 * b + p + 1e3 * b, l.coordorigin = "0 0", l.span = t._g.doc.createElement("span"), l.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", h.appendChild(l.span), u.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", a, i), 1 == r ? (t._g.doc.body.appendChild(h), u.left = s + "px", u.top = o + "px", u.position = "absolute") : r.firstChild ? r.insertBefore(h, r.firstChild) : r.appendChild(h), l.renderfix = function () {}, l;
        }, t.prototype.clear = function () {
          t.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = t._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null;
        }, t.prototype.remove = function () {
          t.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);

          for (var e in this) {
            this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
          }

          return !0;
        };
        var L = t.st;

        for (var z in M) {
          M[e](z) && !L[e](z) && (L[z] = function (t) {
            return function () {
              var e = arguments;
              return this.forEach(function (r) {
                r[t].apply(r, e);
              });
            };
          }(z));
        }
      }
    }.apply(e, i), !(void 0 !== n && (t.exports = n));
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.dat = t() : e.dat = t();
}(this, function () {
  return function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = n[o] = {
        exports: {},
        id: o,
        loaded: !1
      };
      return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0);
  }([function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.__esModule = !0;
    var i = n(1),
        r = o(i);
    t.default = r.default, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.__esModule = !0;

    var i = n(2),
        r = o(i),
        a = n(6),
        l = o(a),
        s = n(3),
        u = o(s),
        d = n(7),
        c = o(d),
        f = n(8),
        _ = o(f),
        p = n(10),
        h = o(p),
        m = n(11),
        b = o(m),
        g = n(12),
        v = o(g),
        y = n(13),
        w = o(y),
        x = n(14),
        E = o(x),
        C = n(15),
        A = o(C),
        S = n(16),
        k = o(S),
        O = n(9),
        T = o(O),
        R = n(17),
        L = o(R);

    t.default = {
      color: {
        Color: r.default,
        math: l.default,
        interpret: u.default
      },
      controllers: {
        Controller: c.default,
        BooleanController: _.default,
        OptionController: h.default,
        StringController: b.default,
        NumberController: v.default,
        NumberControllerBox: w.default,
        NumberControllerSlider: E.default,
        FunctionController: A.default,
        ColorController: k.default
      },
      dom: {
        dom: T.default
      },
      gui: {
        GUI: L.default
      },
      GUI: L.default
    }, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t, n) {
      Object.defineProperty(e, t, {
        get: function get() {
          return "RGB" === this.__state.space ? this.__state[t] : (h.recalculateRGB(this, t, n), this.__state[t]);
        },
        set: function set(e) {
          "RGB" !== this.__state.space && (h.recalculateRGB(this, t, n), this.__state.space = "RGB"), this.__state[t] = e;
        }
      });
    }

    function a(e, t) {
      Object.defineProperty(e, t, {
        get: function get() {
          return "HSV" === this.__state.space ? this.__state[t] : (h.recalculateHSV(this), this.__state[t]);
        },
        set: function set(e) {
          "HSV" !== this.__state.space && (h.recalculateHSV(this), this.__state.space = "HSV"), this.__state[t] = e;
        }
      });
    }

    t.__esModule = !0;

    var l = n(3),
        s = o(l),
        u = n(6),
        d = o(u),
        c = n(4),
        f = o(c),
        _ = n(5),
        p = o(_),
        h = function () {
      function e() {
        if (i(this, e), this.__state = s.default.apply(this, arguments), this.__state === !1) throw new Error("Failed to interpret color arguments");
        this.__state.a = this.__state.a || 1;
      }

      return e.prototype.toString = function () {
        return (0, f.default)(this);
      }, e.prototype.toHexString = function () {
        return (0, f.default)(this, !0);
      }, e.prototype.toOriginal = function () {
        return this.__state.conversion.write(this);
      }, e;
    }();

    h.recalculateRGB = function (e, t, n) {
      if ("HEX" === e.__state.space) e.__state[t] = d.default.component_from_hex(e.__state.hex, n);else {
        if ("HSV" !== e.__state.space) throw new Error("Corrupted color state");
        p.default.extend(e.__state, d.default.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v));
      }
    }, h.recalculateHSV = function (e) {
      var t = d.default.rgb_to_hsv(e.r, e.g, e.b);
      p.default.extend(e.__state, {
        s: t.s,
        v: t.v
      }), p.default.isNaN(t.h) ? p.default.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = t.h;
    }, h.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], r(h.prototype, "r", 2), r(h.prototype, "g", 1), r(h.prototype, "b", 0), a(h.prototype, "h"), a(h.prototype, "s"), a(h.prototype, "v"), Object.defineProperty(h.prototype, "a", {
      get: function get() {
        return this.__state.a;
      },
      set: function set(e) {
        this.__state.a = e;
      }
    }), Object.defineProperty(h.prototype, "hex", {
      get: function get() {
        return "HEX" !== !this.__state.space && (this.__state.hex = d.default.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex;
      },
      set: function set(e) {
        this.__state.space = "HEX", this.__state.hex = e;
      }
    }), t.default = h, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.__esModule = !0;

    var i = n(4),
        r = o(i),
        a = n(5),
        l = o(a),
        s = [{
      litmus: l.default.isString,
      conversions: {
        THREE_CHAR_HEX: {
          read: function read(e) {
            var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            return null !== t && {
              space: "HEX",
              hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString(), 0)
            };
          },
          write: r.default
        },
        SIX_CHAR_HEX: {
          read: function read(e) {
            var t = e.match(/^#([A-F0-9]{6})$/i);
            return null !== t && {
              space: "HEX",
              hex: parseInt("0x" + t[1].toString(), 0)
            };
          },
          write: r.default
        },
        CSS_RGB: {
          read: function read(e) {
            var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            return null !== t && {
              space: "RGB",
              r: parseFloat(t[1]),
              g: parseFloat(t[2]),
              b: parseFloat(t[3])
            };
          },
          write: r.default
        },
        CSS_RGBA: {
          read: function read(e) {
            var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            return null !== t && {
              space: "RGB",
              r: parseFloat(t[1]),
              g: parseFloat(t[2]),
              b: parseFloat(t[3]),
              a: parseFloat(t[4])
            };
          },
          write: r.default
        }
      }
    }, {
      litmus: l.default.isNumber,
      conversions: {
        HEX: {
          read: function read(e) {
            return {
              space: "HEX",
              hex: e,
              conversionName: "HEX"
            };
          },
          write: function write(e) {
            return e.hex;
          }
        }
      }
    }, {
      litmus: l.default.isArray,
      conversions: {
        RGB_ARRAY: {
          read: function read(e) {
            return 3 === e.length && {
              space: "RGB",
              r: e[0],
              g: e[1],
              b: e[2]
            };
          },
          write: function write(e) {
            return [e.r, e.g, e.b];
          }
        },
        RGBA_ARRAY: {
          read: function read(e) {
            return 4 === e.length && {
              space: "RGB",
              r: e[0],
              g: e[1],
              b: e[2],
              a: e[3]
            };
          },
          write: function write(e) {
            return [e.r, e.g, e.b, e.a];
          }
        }
      }
    }, {
      litmus: l.default.isObject,
      conversions: {
        RGBA_OBJ: {
          read: function read(e) {
            return !!(l.default.isNumber(e.r) && l.default.isNumber(e.g) && l.default.isNumber(e.b) && l.default.isNumber(e.a)) && {
              space: "RGB",
              r: e.r,
              g: e.g,
              b: e.b,
              a: e.a
            };
          },
          write: function write(e) {
            return {
              r: e.r,
              g: e.g,
              b: e.b,
              a: e.a
            };
          }
        },
        RGB_OBJ: {
          read: function read(e) {
            return !!(l.default.isNumber(e.r) && l.default.isNumber(e.g) && l.default.isNumber(e.b)) && {
              space: "RGB",
              r: e.r,
              g: e.g,
              b: e.b
            };
          },
          write: function write(e) {
            return {
              r: e.r,
              g: e.g,
              b: e.b
            };
          }
        },
        HSVA_OBJ: {
          read: function read(e) {
            return !!(l.default.isNumber(e.h) && l.default.isNumber(e.s) && l.default.isNumber(e.v) && l.default.isNumber(e.a)) && {
              space: "HSV",
              h: e.h,
              s: e.s,
              v: e.v,
              a: e.a
            };
          },
          write: function write(e) {
            return {
              h: e.h,
              s: e.s,
              v: e.v,
              a: e.a
            };
          }
        },
        HSV_OBJ: {
          read: function read(e) {
            return !!(l.default.isNumber(e.h) && l.default.isNumber(e.s) && l.default.isNumber(e.v)) && {
              space: "HSV",
              h: e.h,
              s: e.s,
              v: e.v
            };
          },
          write: function write(e) {
            return {
              h: e.h,
              s: e.s,
              v: e.v
            };
          }
        }
      }
    }],
        u = void 0,
        d = void 0,
        c = function c() {
      d = !1;
      var e = arguments.length > 1 ? l.default.toArray(arguments) : arguments[0];
      return l.default.each(s, function (t) {
        if (t.litmus(e)) return l.default.each(t.conversions, function (t, n) {
          if (u = t.read(e), d === !1 && u !== !1) return d = u, u.conversionName = n, u.conversion = t, l.default.BREAK;
        }), l.default.BREAK;
      }), d;
    };

    t.default = c, e.exports = t.default;
  }, function (e, t) {
    "use strict";

    t.__esModule = !0, t.default = function (e, t) {
      var n = e.__state.conversionName.toString(),
          o = Math.round(e.r),
          i = Math.round(e.g),
          r = Math.round(e.b),
          a = e.a,
          l = Math.round(e.h),
          s = e.s.toFixed(1),
          u = e.v.toFixed(1);

      if (t || "THREE_CHAR_HEX" === n || "SIX_CHAR_HEX" === n) {
        for (var d = e.hex.toString(16); d.length < 6;) {
          d = "0" + d;
        }

        return "#" + d;
      }

      return "CSS_RGB" === n ? "rgb(" + o + "," + i + "," + r + ")" : "CSS_RGBA" === n ? "rgba(" + o + "," + i + "," + r + "," + a + ")" : "HEX" === n ? "0x" + e.hex.toString(16) : "RGB_ARRAY" === n ? "[" + o + "," + i + "," + r + "]" : "RGBA_ARRAY" === n ? "[" + o + "," + i + "," + r + "," + a + "]" : "RGB_OBJ" === n ? "{r:" + o + ",g:" + i + ",b:" + r + "}" : "RGBA_OBJ" === n ? "{r:" + o + ",g:" + i + ",b:" + r + ",a:" + a + "}" : "HSV_OBJ" === n ? "{h:" + l + ",s:" + s + ",v:" + u + "}" : "HSVA_OBJ" === n ? "{h:" + l + ",s:" + s + ",v:" + u + ",a:" + a + "}" : "unknown format";
    }, e.exports = t.default;
  }, function (e, t) {
    "use strict";

    t.__esModule = !0;
    var n = Array.prototype.forEach,
        o = Array.prototype.slice,
        i = {
      BREAK: {},
      extend: function extend(e) {
        return this.each(o.call(arguments, 1), function (t) {
          var n = this.isObject(t) ? Object.keys(t) : [];
          n.forEach(function (n) {
            this.isUndefined(t[n]) || (e[n] = t[n]);
          }.bind(this));
        }, this), e;
      },
      defaults: function defaults(e) {
        return this.each(o.call(arguments, 1), function (t) {
          var n = this.isObject(t) ? Object.keys(t) : [];
          n.forEach(function (n) {
            this.isUndefined(e[n]) && (e[n] = t[n]);
          }.bind(this));
        }, this), e;
      },
      compose: function compose() {
        var e = o.call(arguments);
        return function () {
          for (var t = o.call(arguments), n = e.length - 1; n >= 0; n--) {
            t = [e[n].apply(this, t)];
          }

          return t[0];
        };
      },
      each: function each(e, t, o) {
        if (e) if (n && e.forEach && e.forEach === n) e.forEach(t, o);else if (e.length === e.length + 0) {
          var i = void 0,
              r = void 0;

          for (i = 0, r = e.length; i < r; i++) {
            if (i in e && t.call(o, e[i], i) === this.BREAK) return;
          }
        } else for (var a in e) {
          if (t.call(o, e[a], a) === this.BREAK) return;
        }
      },
      defer: function defer(e) {
        setTimeout(e, 0);
      },
      debounce: function debounce(e, t, n) {
        var o = void 0;
        return function () {
          function i() {
            o = null, n || e.apply(r, a);
          }

          var r = this,
              a = arguments,
              l = n || !o;
          clearTimeout(o), o = setTimeout(i, t), l && e.apply(r, a);
        };
      },
      toArray: function toArray(e) {
        return e.toArray ? e.toArray() : o.call(e);
      },
      isUndefined: function isUndefined(e) {
        return void 0 === e;
      },
      isNull: function isNull(e) {
        return null === e;
      },
      isNaN: function (e) {
        function t(t) {
          return e.apply(this, arguments);
        }

        return t.toString = function () {
          return e.toString();
        }, t;
      }(function (e) {
        return isNaN(e);
      }),
      isArray: Array.isArray || function (e) {
        return e.constructor === Array;
      },
      isObject: function isObject(e) {
        return e === Object(e);
      },
      isNumber: function isNumber(e) {
        return e === e + 0;
      },
      isString: function isString(e) {
        return e === e + "";
      },
      isBoolean: function isBoolean(e) {
        return e === !1 || e === !0;
      },
      isFunction: function isFunction(e) {
        return "[object Function]" === Object.prototype.toString.call(e);
      }
    };
    t.default = i, e.exports = t.default;
  }, function (e, t) {
    "use strict";

    t.__esModule = !0;
    var n = void 0,
        o = {
      hsv_to_rgb: function hsv_to_rgb(e, t, n) {
        var o = Math.floor(e / 60) % 6,
            i = e / 60 - Math.floor(e / 60),
            r = n * (1 - t),
            a = n * (1 - i * t),
            l = n * (1 - (1 - i) * t),
            s = [[n, l, r], [a, n, r], [r, n, l], [r, a, n], [l, r, n], [n, r, a]][o];
        return {
          r: 255 * s[0],
          g: 255 * s[1],
          b: 255 * s[2]
        };
      },
      rgb_to_hsv: function rgb_to_hsv(e, t, n) {
        var o = Math.min(e, t, n),
            i = Math.max(e, t, n),
            r = i - o,
            a = void 0,
            l = void 0;
        return 0 === i ? {
          h: NaN,
          s: 0,
          v: 0
        } : (l = r / i, a = e === i ? (t - n) / r : t === i ? 2 + (n - e) / r : 4 + (e - t) / r, a /= 6, a < 0 && (a += 1), {
          h: 360 * a,
          s: l,
          v: i / 255
        });
      },
      rgb_to_hex: function rgb_to_hex(e, t, n) {
        var o = this.hex_with_component(0, 2, e);
        return o = this.hex_with_component(o, 1, t), o = this.hex_with_component(o, 0, n);
      },
      component_from_hex: function component_from_hex(e, t) {
        return e >> 8 * t & 255;
      },
      hex_with_component: function hex_with_component(e, t, o) {
        return o << (n = 8 * t) | e & ~(255 << n);
      }
    };
    t.default = o, e.exports = t.default;
  }, function (e, t) {
    "use strict";

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    t.__esModule = !0;

    var o = function () {
      function e(t, o) {
        n(this, e), this.initialValue = t[o], this.domElement = document.createElement("div"), this.object = t, this.property = o, this.__onChange = void 0, this.__onFinishChange = void 0;
      }

      return e.prototype.onChange = function (e) {
        return this.__onChange = e, this;
      }, e.prototype.onFinishChange = function (e) {
        return this.__onFinishChange = e, this;
      }, e.prototype.setValue = function (e) {
        return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this;
      }, e.prototype.getValue = function () {
        return this.object[this.property];
      }, e.prototype.updateDisplay = function () {
        return this;
      }, e.prototype.isModified = function () {
        return this.initialValue !== this.getValue();
      }, e;
    }();

    t.default = o, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    t.__esModule = !0;

    var l = n(7),
        s = o(l),
        u = n(9),
        d = o(u),
        c = function (e) {
      function t(n, o) {
        function a() {
          s.setValue(!s.__prev);
        }

        i(this, t);
        var l = r(this, e.call(this, n, o)),
            s = l;
        return l.__prev = l.getValue(), l.__checkbox = document.createElement("input"), l.__checkbox.setAttribute("type", "checkbox"), d.default.bind(l.__checkbox, "change", a, !1), l.domElement.appendChild(l.__checkbox), l.updateDisplay(), l;
      }

      return a(t, e), t.prototype.setValue = function (t) {
        var n = e.prototype.setValue.call(this, t);
        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), n;
      }, t.prototype.updateDisplay = function () {
        return this.getValue() === !0 ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0, this.__prev = !0) : (this.__checkbox.checked = !1, this.__prev = !1), e.prototype.updateDisplay.call(this);
      }, t;
    }(s.default);

    t.default = c, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e) {
      if ("0" === e || a.default.isUndefined(e)) return 0;
      var t = e.match(u);
      return a.default.isNull(t) ? 0 : parseFloat(t[1]);
    }

    t.__esModule = !0;
    var r = n(5),
        a = o(r),
        l = {
      HTMLEvents: ["change"],
      MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
      KeyboardEvents: ["keydown"]
    },
        s = {};
    a.default.each(l, function (e, t) {
      a.default.each(e, function (e) {
        s[e] = t;
      });
    });
    var u = /(\d+(\.\d+)?)px/,
        d = {
      makeSelectable: function makeSelectable(e, t) {
        void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function () {
          return !1;
        } : function () {}, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off");
      },
      makeFullscreen: function makeFullscreen(e, t, n) {
        var o = n,
            i = t;
        a.default.isUndefined(i) && (i = !0), a.default.isUndefined(o) && (o = !0), e.style.position = "absolute", i && (e.style.left = 0, e.style.right = 0), o && (e.style.top = 0, e.style.bottom = 0);
      },
      fakeEvent: function fakeEvent(e, t, n, o) {
        var i = n || {},
            r = s[t];
        if (!r) throw new Error("Event type " + t + " not supported.");
        var l = document.createEvent(r);

        switch (r) {
          case "MouseEvents":
            var u = i.x || i.clientX || 0,
                d = i.y || i.clientY || 0;
            l.initMouseEvent(t, i.bubbles || !1, i.cancelable || !0, window, i.clickCount || 1, 0, 0, u, d, !1, !1, !1, !1, 0, null);
            break;

          case "KeyboardEvents":
            var c = l.initKeyboardEvent || l.initKeyEvent;
            a.default.defaults(i, {
              cancelable: !0,
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              metaKey: !1,
              keyCode: void 0,
              charCode: void 0
            }), c(t, i.bubbles || !1, i.cancelable, window, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.keyCode, i.charCode);
            break;

          default:
            l.initEvent(t, i.bubbles || !1, i.cancelable || !0);
        }

        a.default.defaults(l, o), e.dispatchEvent(l);
      },
      bind: function bind(e, t, n, o) {
        var i = o || !1;
        return e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n), d;
      },
      unbind: function unbind(e, t, n, o) {
        var i = o || !1;
        return e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent && e.detachEvent("on" + t, n), d;
      },
      addClass: function addClass(e, t) {
        if (void 0 === e.className) e.className = t;else if (e.className !== t) {
          var n = e.className.split(/ +/);
          n.indexOf(t) === -1 && (n.push(t), e.className = n.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
        }
        return d;
      },
      removeClass: function removeClass(e, t) {
        if (t) {
          if (e.className === t) e.removeAttribute("class");else {
            var n = e.className.split(/ +/),
                o = n.indexOf(t);
            o !== -1 && (n.splice(o, 1), e.className = n.join(" "));
          }
        } else e.className = void 0;
        return d;
      },
      hasClass: function hasClass(e, t) {
        return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1;
      },
      getWidth: function getWidth(e) {
        var t = getComputedStyle(e);
        return i(t["border-left-width"]) + i(t["border-right-width"]) + i(t["padding-left"]) + i(t["padding-right"]) + i(t.width);
      },
      getHeight: function getHeight(e) {
        var t = getComputedStyle(e);
        return i(t["border-top-width"]) + i(t["border-bottom-width"]) + i(t["padding-top"]) + i(t["padding-bottom"]) + i(t.height);
      },
      getOffset: function getOffset(e) {
        var t = e,
            n = {
          left: 0,
          top: 0
        };
        if (t.offsetParent) do {
          n.left += t.offsetLeft, n.top += t.offsetTop, t = t.offsetParent;
        } while (t);
        return n;
      },
      isActive: function isActive(e) {
        return e === document.activeElement && (e.type || e.href);
      }
    };
    t.default = d, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    t.__esModule = !0;

    var l = n(7),
        s = o(l),
        u = n(9),
        d = o(u),
        c = n(5),
        f = o(c),
        _ = function (e) {
      function t(n, o, a) {
        i(this, t);
        var l = r(this, e.call(this, n, o)),
            s = a,
            u = l;

        if (l.__select = document.createElement("select"), f.default.isArray(s)) {
          var c = {};
          f.default.each(s, function (e) {
            c[e] = e;
          }), s = c;
        }

        return f.default.each(s, function (e, t) {
          var n = document.createElement("option");
          n.innerHTML = t, n.setAttribute("value", e), u.__select.appendChild(n);
        }), l.updateDisplay(), d.default.bind(l.__select, "change", function () {
          var e = this.options[this.selectedIndex].value;
          u.setValue(e);
        }), l.domElement.appendChild(l.__select), l;
      }

      return a(t, e), t.prototype.setValue = function (t) {
        var n = e.prototype.setValue.call(this, t);
        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), n;
      }, t.prototype.updateDisplay = function () {
        return d.default.isActive(this.__select) ? this : (this.__select.value = this.getValue(), e.prototype.updateDisplay.call(this));
      }, t;
    }(s.default);

    t.default = _, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    t.__esModule = !0;

    var l = n(7),
        s = o(l),
        u = n(9),
        d = o(u),
        c = function (e) {
      function t(n, o) {
        function a() {
          u.setValue(u.__input.value);
        }

        function l() {
          u.__onFinishChange && u.__onFinishChange.call(u, u.getValue());
        }

        i(this, t);
        var s = r(this, e.call(this, n, o)),
            u = s;
        return s.__input = document.createElement("input"), s.__input.setAttribute("type", "text"), d.default.bind(s.__input, "keyup", a), d.default.bind(s.__input, "change", a), d.default.bind(s.__input, "blur", l), d.default.bind(s.__input, "keydown", function (e) {
          13 === e.keyCode && this.blur();
        }), s.updateDisplay(), s.domElement.appendChild(s.__input), s;
      }

      return a(t, e), t.prototype.updateDisplay = function () {
        return d.default.isActive(this.__input) || (this.__input.value = this.getValue()), e.prototype.updateDisplay.call(this);
      }, t;
    }(s.default);

    t.default = c, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    function l(e) {
      var t = e.toString();
      return t.indexOf(".") > -1 ? t.length - t.indexOf(".") - 1 : 0;
    }

    t.__esModule = !0;

    var s = n(7),
        u = o(s),
        d = n(5),
        c = o(d),
        f = function (e) {
      function t(n, o, a) {
        i(this, t);
        var s = r(this, e.call(this, n, o)),
            u = a || {};
        return s.__min = u.min, s.__max = u.max, s.__step = u.step, c.default.isUndefined(s.__step) ? 0 === s.initialValue ? s.__impliedStep = 1 : s.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(s.initialValue)) / Math.LN10)) / 10 : s.__impliedStep = s.__step, s.__precision = l(s.__impliedStep), s;
      }

      return a(t, e), t.prototype.setValue = function (t) {
        var n = t;
        return void 0 !== this.__min && n < this.__min ? n = this.__min : void 0 !== this.__max && n > this.__max && (n = this.__max), void 0 !== this.__step && n % this.__step !== 0 && (n = Math.round(n / this.__step) * this.__step), e.prototype.setValue.call(this, n);
      }, t.prototype.min = function (e) {
        return this.__min = e, this;
      }, t.prototype.max = function (e) {
        return this.__max = e, this;
      }, t.prototype.step = function (e) {
        return this.__step = e, this.__impliedStep = e, this.__precision = l(e), this;
      }, t;
    }(u.default);

    t.default = f, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    function l(e, t) {
      var n = Math.pow(10, t);
      return Math.round(e * n) / n;
    }

    t.__esModule = !0;

    var s = n(12),
        u = o(s),
        d = n(9),
        c = o(d),
        f = n(5),
        _ = o(f),
        p = function (e) {
      function t(n, o, a) {
        function l() {
          var e = parseFloat(m.__input.value);
          _.default.isNaN(e) || m.setValue(e);
        }

        function s() {
          m.__onFinishChange && m.__onFinishChange.call(m, m.getValue());
        }

        function u() {
          s();
        }

        function d(e) {
          var t = b - e.clientY;
          m.setValue(m.getValue() + t * m.__impliedStep), b = e.clientY;
        }

        function f() {
          c.default.unbind(window, "mousemove", d), c.default.unbind(window, "mouseup", f), s();
        }

        function p(e) {
          c.default.bind(window, "mousemove", d), c.default.bind(window, "mouseup", f), b = e.clientY;
        }

        i(this, t);
        var h = r(this, e.call(this, n, o, a));
        h.__truncationSuspended = !1;
        var m = h,
            b = void 0;
        return h.__input = document.createElement("input"), h.__input.setAttribute("type", "text"), c.default.bind(h.__input, "change", l), c.default.bind(h.__input, "blur", u), c.default.bind(h.__input, "mousedown", p), c.default.bind(h.__input, "keydown", function (e) {
          13 === e.keyCode && (m.__truncationSuspended = !0, this.blur(), m.__truncationSuspended = !1, s());
        }), h.updateDisplay(), h.domElement.appendChild(h.__input), h;
      }

      return a(t, e), t.prototype.updateDisplay = function () {
        return this.__input.value = this.__truncationSuspended ? this.getValue() : l(this.getValue(), this.__precision), e.prototype.updateDisplay.call(this);
      }, t;
    }(u.default);

    t.default = p, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    function l(e, t, n, o, i) {
      return o + (i - o) * ((e - t) / (n - t));
    }

    t.__esModule = !0;

    var s = n(12),
        u = o(s),
        d = n(9),
        c = o(d),
        f = function (e) {
      function t(n, o, a, s, u) {
        function d(e) {
          document.activeElement.blur(), c.default.bind(window, "mousemove", f), c.default.bind(window, "mouseup", _), f(e);
        }

        function f(e) {
          e.preventDefault();

          var t = h.__background.getBoundingClientRect();

          return h.setValue(l(e.clientX, t.left, t.right, h.__min, h.__max)), !1;
        }

        function _() {
          c.default.unbind(window, "mousemove", f), c.default.unbind(window, "mouseup", _), h.__onFinishChange && h.__onFinishChange.call(h, h.getValue());
        }

        i(this, t);
        var p = r(this, e.call(this, n, o, {
          min: a,
          max: s,
          step: u
        })),
            h = p;
        return p.__background = document.createElement("div"), p.__foreground = document.createElement("div"), c.default.bind(p.__background, "mousedown", d), c.default.addClass(p.__background, "slider"), c.default.addClass(p.__foreground, "slider-fg"), p.updateDisplay(), p.__background.appendChild(p.__foreground), p.domElement.appendChild(p.__background), p;
      }

      return a(t, e), t.prototype.updateDisplay = function () {
        var t = (this.getValue() - this.__min) / (this.__max - this.__min);

        return this.__foreground.style.width = 100 * t + "%", e.prototype.updateDisplay.call(this);
      }, t;
    }(u.default);

    t.default = f, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    t.__esModule = !0;

    var l = n(7),
        s = o(l),
        u = n(9),
        d = o(u),
        c = function (e) {
      function t(n, o, a) {
        i(this, t);
        var l = r(this, e.call(this, n, o)),
            s = l;
        return l.__button = document.createElement("div"), l.__button.innerHTML = void 0 === a ? "Fire" : a, d.default.bind(l.__button, "click", function (e) {
          return e.preventDefault(), s.fire(), !1;
        }), d.default.addClass(l.__button, "button"), l.domElement.appendChild(l.__button), l;
      }

      return a(t, e), t.prototype.fire = function () {
        this.__onChange && this.__onChange.call(this), this.getValue().call(this.object), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
      }, t;
    }(s.default);

    t.default = c, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function r(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != _typeof(t) && "function" != typeof t ? e : t;
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + _typeof(t));
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }

    function l(e, t, n, o) {
      e.style.background = "", g.default.each(y, function (i) {
        e.style.cssText += "background: " + i + "linear-gradient(" + t + ", " + n + " 0%, " + o + " 100%); ";
      });
    }

    function s(e) {
      e.style.background = "", e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    }

    t.__esModule = !0;

    var u = n(7),
        d = o(u),
        c = n(9),
        f = o(c),
        _ = n(2),
        p = o(_),
        h = n(3),
        m = o(h),
        b = n(5),
        g = o(b),
        v = function (e) {
      function t(n, o) {
        function a(e) {
          h(e), f.default.bind(window, "mousemove", h), f.default.bind(window, "mouseup", u);
        }

        function u() {
          f.default.unbind(window, "mousemove", h), f.default.unbind(window, "mouseup", u), _();
        }

        function d() {
          var e = (0, m.default)(this.value);
          e !== !1 ? (y.__color.__state = e, y.setValue(y.__color.toOriginal())) : this.value = y.__color.toString();
        }

        function c() {
          f.default.unbind(window, "mousemove", b), f.default.unbind(window, "mouseup", c), _();
        }

        function _() {
          y.__onFinishChange && y.__onFinishChange.call(y, y.__color.toOriginal());
        }

        function h(e) {
          e.preventDefault();

          var t = y.__saturation_field.getBoundingClientRect(),
              n = (e.clientX - t.left) / (t.right - t.left),
              o = 1 - (e.clientY - t.top) / (t.bottom - t.top);

          return o > 1 ? o = 1 : o < 0 && (o = 0), n > 1 ? n = 1 : n < 0 && (n = 0), y.__color.v = o, y.__color.s = n, y.setValue(y.__color.toOriginal()), !1;
        }

        function b(e) {
          e.preventDefault();

          var t = y.__hue_field.getBoundingClientRect(),
              n = 1 - (e.clientY - t.top) / (t.bottom - t.top);

          return n > 1 ? n = 1 : n < 0 && (n = 0), y.__color.h = 360 * n, y.setValue(y.__color.toOriginal()), !1;
        }

        i(this, t);
        var v = r(this, e.call(this, n, o));
        v.__color = new p.default(v.getValue()), v.__temp = new p.default(0);
        var y = v;
        v.domElement = document.createElement("div"), f.default.makeSelectable(v.domElement, !1), v.__selector = document.createElement("div"), v.__selector.className = "selector", v.__saturation_field = document.createElement("div"), v.__saturation_field.className = "saturation-field", v.__field_knob = document.createElement("div"), v.__field_knob.className = "field-knob", v.__field_knob_border = "2px solid ", v.__hue_knob = document.createElement("div"), v.__hue_knob.className = "hue-knob", v.__hue_field = document.createElement("div"), v.__hue_field.className = "hue-field", v.__input = document.createElement("input"), v.__input.type = "text", v.__input_textShadow = "0 1px 1px ", f.default.bind(v.__input, "keydown", function (e) {
          13 === e.keyCode && d.call(this);
        }), f.default.bind(v.__input, "blur", d), f.default.bind(v.__selector, "mousedown", function () {
          f.default.addClass(this, "drag").bind(window, "mouseup", function () {
            f.default.removeClass(y.__selector, "drag");
          });
        });
        var w = document.createElement("div");
        return g.default.extend(v.__selector.style, {
          width: "122px",
          height: "102px",
          padding: "3px",
          backgroundColor: "#222",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
        }), g.default.extend(v.__field_knob.style, {
          position: "absolute",
          width: "12px",
          height: "12px",
          border: v.__field_knob_border + (v.__color.v < .5 ? "#fff" : "#000"),
          boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
          borderRadius: "12px",
          zIndex: 1
        }), g.default.extend(v.__hue_knob.style, {
          position: "absolute",
          width: "15px",
          height: "2px",
          borderRight: "4px solid #fff",
          zIndex: 1
        }), g.default.extend(v.__saturation_field.style, {
          width: "100px",
          height: "100px",
          border: "1px solid #555",
          marginRight: "3px",
          display: "inline-block",
          cursor: "pointer"
        }), g.default.extend(w.style, {
          width: "100%",
          height: "100%",
          background: "none"
        }), l(w, "top", "rgba(0,0,0,0)", "#000"), g.default.extend(v.__hue_field.style, {
          width: "15px",
          height: "100px",
          border: "1px solid #555",
          cursor: "ns-resize",
          position: "absolute",
          top: "3px",
          right: "3px"
        }), s(v.__hue_field), g.default.extend(v.__input.style, {
          outline: "none",
          textAlign: "center",
          color: "#fff",
          border: 0,
          fontWeight: "bold",
          textShadow: v.__input_textShadow + "rgba(0,0,0,0.7)"
        }), f.default.bind(v.__saturation_field, "mousedown", a), f.default.bind(v.__field_knob, "mousedown", a), f.default.bind(v.__hue_field, "mousedown", function (e) {
          b(e), f.default.bind(window, "mousemove", b), f.default.bind(window, "mouseup", c);
        }), v.__saturation_field.appendChild(w), v.__selector.appendChild(v.__field_knob), v.__selector.appendChild(v.__saturation_field), v.__selector.appendChild(v.__hue_field), v.__hue_field.appendChild(v.__hue_knob), v.domElement.appendChild(v.__input), v.domElement.appendChild(v.__selector), v.updateDisplay(), v;
      }

      return a(t, e), t.prototype.updateDisplay = function () {
        var e = (0, m.default)(this.getValue());

        if (e !== !1) {
          var t = !1;
          g.default.each(p.default.COMPONENTS, function (n) {
            if (!g.default.isUndefined(e[n]) && !g.default.isUndefined(this.__color.__state[n]) && e[n] !== this.__color.__state[n]) return t = !0, {};
          }, this), t && g.default.extend(this.__color.__state, e);
        }

        g.default.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
        var n = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0,
            o = 255 - n;
        g.default.extend(this.__field_knob.style, {
          marginLeft: 100 * this.__color.s - 7 + "px",
          marginTop: 100 * (1 - this.__color.v) - 7 + "px",
          backgroundColor: this.__temp.toHexString(),
          border: this.__field_knob_border + "rgb(" + n + "," + n + "," + n + ")"
        }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, l(this.__saturation_field, "left", "#fff", this.__temp.toHexString()), this.__input.value = this.__color.toString(), g.default.extend(this.__input.style, {
          backgroundColor: this.__color.toHexString(),
          color: "rgb(" + n + "," + n + "," + n + ")",
          textShadow: this.__input_textShadow + "rgba(" + o + "," + o + "," + o + ",.7)"
        });
      }, t;
    }(d.default),
        y = ["-moz-", "-o-", "-webkit-", "-ms-", ""];

    t.default = v, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t, n) {
      var o = document.createElement("li");
      return t && o.appendChild(t), n ? e.__ul.insertBefore(o, n) : e.__ul.appendChild(o), e.onResize(), o;
    }

    function r(e, t) {
      var n = e.__preset_select[e.__preset_select.selectedIndex];
      t ? n.innerHTML = n.value + "*" : n.innerHTML = n.value;
    }

    function a(e, t, n) {
      if (n.__li = t, n.__gui = e, U.default.extend(n, {
        options: function options(t) {
          if (arguments.length > 1) {
            var o = n.__li.nextElementSibling;
            return n.remove(), s(e, n.object, n.property, {
              before: o,
              factoryArgs: [U.default.toArray(arguments)]
            });
          }

          if (U.default.isArray(t) || U.default.isObject(t)) {
            var i = n.__li.nextElementSibling;
            return n.remove(), s(e, n.object, n.property, {
              before: i,
              factoryArgs: [t]
            });
          }
        },
        name: function name(e) {
          return n.__li.firstElementChild.firstElementChild.innerHTML = e, n;
        },
        listen: function listen() {
          return n.__gui.listen(n), n;
        },
        remove: function remove() {
          return n.__gui.remove(n), n;
        }
      }), n instanceof N.default) {
        var o = new B.default(n.object, n.property, {
          min: n.__min,
          max: n.__max,
          step: n.__step
        });
        U.default.each(["updateDisplay", "onChange", "onFinishChange", "step"], function (e) {
          var t = n[e],
              i = o[e];

          n[e] = o[e] = function () {
            var e = Array.prototype.slice.call(arguments);
            return i.apply(o, e), t.apply(n, e);
          };
        }), z.default.addClass(t, "has-slider"), n.domElement.insertBefore(o.domElement, n.domElement.firstElementChild);
      } else if (n instanceof B.default) {
        var i = function i(t) {
          if (U.default.isNumber(n.__min) && U.default.isNumber(n.__max)) {
            var o = n.__li.firstElementChild.firstElementChild.innerHTML,
                i = n.__gui.__listening.indexOf(n) > -1;
            n.remove();
            var r = s(e, n.object, n.property, {
              before: n.__li.nextElementSibling,
              factoryArgs: [n.__min, n.__max, n.__step]
            });
            return r.name(o), i && r.listen(), r;
          }

          return t;
        };

        n.min = U.default.compose(i, n.min), n.max = U.default.compose(i, n.max);
      } else n instanceof O.default ? (z.default.bind(t, "click", function () {
        z.default.fakeEvent(n.__checkbox, "click");
      }), z.default.bind(n.__checkbox, "click", function (e) {
        e.stopPropagation();
      })) : n instanceof R.default ? (z.default.bind(t, "click", function () {
        z.default.fakeEvent(n.__button, "click");
      }), z.default.bind(t, "mouseover", function () {
        z.default.addClass(n.__button, "hover");
      }), z.default.bind(t, "mouseout", function () {
        z.default.removeClass(n.__button, "hover");
      })) : n instanceof j.default && (z.default.addClass(t, "color"), n.updateDisplay = U.default.compose(function (e) {
        return t.style.borderLeftColor = n.__color.toString(), e;
      }, n.updateDisplay), n.updateDisplay());

      n.setValue = U.default.compose(function (t) {
        return e.getRoot().__preset_select && n.isModified() && r(e.getRoot(), !0), t;
      }, n.setValue);
    }

    function l(e, t) {
      var n = e.getRoot(),
          o = n.__rememberedObjects.indexOf(t.object);

      if (o !== -1) {
        var i = n.__rememberedObjectIndecesToControllers[o];

        if (void 0 === i && (i = {}, n.__rememberedObjectIndecesToControllers[o] = i), i[t.property] = t, n.load && n.load.remembered) {
          var r = n.load.remembered,
              a = void 0;
          if (r[e.preset]) a = r[e.preset];else {
            if (!r[Q]) return;
            a = r[Q];
          }

          if (a[o] && void 0 !== a[o][t.property]) {
            var l = a[o][t.property];
            t.initialValue = l, t.setValue(l);
          }
        }
      }
    }

    function s(e, t, n, o) {
      if (void 0 === t[n]) throw new Error('Object "' + t + '" has no property "' + n + '"');
      var r = void 0;
      if (o.color) r = new j.default(t, n);else {
        var s = [t, n].concat(o.factoryArgs);
        r = C.default.apply(e, s);
      }
      o.before instanceof S.default && (o.before = o.before.__li), l(e, r), z.default.addClass(r.domElement, "c");
      var u = document.createElement("span");
      z.default.addClass(u, "property-name"), u.innerHTML = r.property;
      var d = document.createElement("div");
      d.appendChild(u), d.appendChild(r.domElement);
      var c = i(e, d, o.before);
      return z.default.addClass(c, oe.CLASS_CONTROLLER_ROW), r instanceof j.default ? z.default.addClass(c, "color") : z.default.addClass(c, g(r.getValue())), a(e, c, r), e.__controllers.push(r), r;
    }

    function u(e, t) {
      return document.location.href + "." + t;
    }

    function d(e, t, n) {
      var o = document.createElement("option");
      o.innerHTML = t, o.value = t, e.__preset_select.appendChild(o), n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1);
    }

    function c(e, t) {
      t.style.display = e.useLocalStorage ? "block" : "none";
    }

    function f(e) {
      var t = e.__save_row = document.createElement("li");
      z.default.addClass(e.domElement, "has-save"), e.__ul.insertBefore(t, e.__ul.firstChild), z.default.addClass(t, "save-row");
      var n = document.createElement("span");
      n.innerHTML = "&nbsp;", z.default.addClass(n, "button gears");
      var o = document.createElement("span");
      o.innerHTML = "Save", z.default.addClass(o, "button"), z.default.addClass(o, "save");
      var i = document.createElement("span");
      i.innerHTML = "New", z.default.addClass(i, "button"), z.default.addClass(i, "save-as");
      var r = document.createElement("span");
      r.innerHTML = "Revert", z.default.addClass(r, "button"), z.default.addClass(r, "revert");
      var a = e.__preset_select = document.createElement("select");

      if (e.load && e.load.remembered ? U.default.each(e.load.remembered, function (t, n) {
        d(e, n, n === e.preset);
      }) : d(e, Q, !1), z.default.bind(a, "change", function () {
        for (var t = 0; t < e.__preset_select.length; t++) {
          e.__preset_select[t].innerHTML = e.__preset_select[t].value;
        }

        e.preset = this.value;
      }), t.appendChild(a), t.appendChild(n), t.appendChild(o), t.appendChild(i), t.appendChild(r), q) {
        var l = document.getElementById("dg-local-explain"),
            s = document.getElementById("dg-local-storage"),
            f = document.getElementById("dg-save-locally");
        f.style.display = "block", "true" === localStorage.getItem(u(e, "isLocal")) && s.setAttribute("checked", "checked"), c(e, l), z.default.bind(s, "change", function () {
          e.useLocalStorage = !e.useLocalStorage, c(e, l);
        });
      }

      var _ = document.getElementById("dg-new-constructor");

      z.default.bind(_, "keydown", function (e) {
        !e.metaKey || 67 !== e.which && 67 !== e.keyCode || Z.hide();
      }), z.default.bind(n, "click", function () {
        _.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2), Z.show(), _.focus(), _.select();
      }), z.default.bind(o, "click", function () {
        e.save();
      }), z.default.bind(i, "click", function () {
        var t = prompt("Enter a new preset name.");
        t && e.saveAs(t);
      }), z.default.bind(r, "click", function () {
        e.revert();
      });
    }

    function _(e) {
      function t(t) {
        return t.preventDefault(), e.width += i - t.clientX, e.onResize(), i = t.clientX, !1;
      }

      function n() {
        z.default.removeClass(e.__closeButton, oe.CLASS_DRAG), z.default.unbind(window, "mousemove", t), z.default.unbind(window, "mouseup", n);
      }

      function o(o) {
        return o.preventDefault(), i = o.clientX, z.default.addClass(e.__closeButton, oe.CLASS_DRAG), z.default.bind(window, "mousemove", t), z.default.bind(window, "mouseup", n), !1;
      }

      var i = void 0;
      e.__resize_handle = document.createElement("div"), U.default.extend(e.__resize_handle.style, {
        width: "6px",
        marginLeft: "-3px",
        height: "200px",
        cursor: "ew-resize",
        position: "absolute"
      }), z.default.bind(e.__resize_handle, "mousedown", o), z.default.bind(e.__closeButton, "mousedown", o), e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild);
    }

    function p(e, t) {
      e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px");
    }

    function h(e, t) {
      var n = {};
      return U.default.each(e.__rememberedObjects, function (o, i) {
        var r = {},
            a = e.__rememberedObjectIndecesToControllers[i];
        U.default.each(a, function (e, n) {
          r[n] = t ? e.initialValue : e.getValue();
        }), n[i] = r;
      }), n;
    }

    function m(e) {
      for (var t = 0; t < e.__preset_select.length; t++) {
        e.__preset_select[t].value === e.preset && (e.__preset_select.selectedIndex = t);
      }
    }

    function b(e) {
      0 !== e.length && D.default.call(window, function () {
        b(e);
      }), U.default.each(e, function (e) {
        e.updateDisplay();
      });
    }

    t.__esModule = !0;
    var g = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    },
        v = n(18),
        y = o(v),
        w = n(19),
        x = o(w),
        E = n(20),
        C = o(E),
        A = n(7),
        S = o(A),
        k = n(8),
        O = o(k),
        T = n(15),
        R = o(T),
        L = n(13),
        B = o(L),
        M = n(14),
        N = o(M),
        H = n(16),
        j = o(H),
        P = n(21),
        D = o(P),
        V = n(22),
        F = o(V),
        I = n(9),
        z = o(I),
        G = n(5),
        U = o(G),
        X = n(23),
        K = o(X);
    y.default.inject(K.default);

    var Y = "dg",
        J = 72,
        W = 20,
        Q = "Default",
        q = function () {
      try {
        return "localStorage" in window && null !== window.localStorage;
      } catch (e) {
        return !1;
      }
    }(),
        Z = void 0,
        $ = !0,
        ee = void 0,
        te = !1,
        ne = [],
        oe = function e(t) {
      function n() {
        var e = o.getRoot();
        e.width += 1, U.default.defer(function () {
          e.width -= 1;
        });
      }

      var o = this,
          r = t || {};
      this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), z.default.addClass(this.domElement, Y), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], r = U.default.defaults(r, {
        closeOnTop: !1,
        autoPlace: !0,
        width: e.DEFAULT_WIDTH
      }), r = U.default.defaults(r, {
        resizable: r.autoPlace,
        hideable: r.autoPlace
      }), U.default.isUndefined(r.load) ? r.load = {
        preset: Q
      } : r.preset && (r.load.preset = r.preset), U.default.isUndefined(r.parent) && r.hideable && ne.push(this), r.resizable = U.default.isUndefined(r.parent) && r.resizable, r.autoPlace && U.default.isUndefined(r.scrollable) && (r.scrollable = !0);
      var a = q && "true" === localStorage.getItem(u(this, "isLocal")),
          l = void 0;

      if (Object.defineProperties(this, {
        parent: {
          get: function get() {
            return r.parent;
          }
        },
        scrollable: {
          get: function get() {
            return r.scrollable;
          }
        },
        autoPlace: {
          get: function get() {
            return r.autoPlace;
          }
        },
        closeOnTop: {
          get: function get() {
            return r.closeOnTop;
          }
        },
        preset: {
          get: function get() {
            return o.parent ? o.getRoot().preset : r.load.preset;
          },
          set: function set(e) {
            o.parent ? o.getRoot().preset = e : r.load.preset = e, m(this), o.revert();
          }
        },
        width: {
          get: function get() {
            return r.width;
          },
          set: function set(e) {
            r.width = e, p(o, e);
          }
        },
        name: {
          get: function get() {
            return r.name;
          },
          set: function set(e) {
            r.name = e, titleRowName && (titleRowName.innerHTML = r.name);
          }
        },
        closed: {
          get: function get() {
            return r.closed;
          },
          set: function set(t) {
            r.closed = t, r.closed ? z.default.addClass(o.__ul, e.CLASS_CLOSED) : z.default.removeClass(o.__ul, e.CLASS_CLOSED), this.onResize(), o.__closeButton && (o.__closeButton.innerHTML = t ? e.TEXT_OPEN : e.TEXT_CLOSED);
          }
        },
        load: {
          get: function get() {
            return r.load;
          }
        },
        useLocalStorage: {
          get: function get() {
            return a;
          },
          set: function set(e) {
            q && (a = e, e ? z.default.bind(window, "unload", l) : z.default.unbind(window, "unload", l), localStorage.setItem(u(o, "isLocal"), e));
          }
        }
      }), U.default.isUndefined(r.parent)) {
        if (r.closed = !1, z.default.addClass(this.domElement, e.CLASS_MAIN), z.default.makeSelectable(this.domElement, !1), q && a) {
          o.useLocalStorage = !0;
          var s = localStorage.getItem(u(this, "gui"));
          s && (r.load = JSON.parse(s));
        }

        this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = e.TEXT_CLOSED, z.default.addClass(this.__closeButton, e.CLASS_CLOSE_BUTTON), r.closeOnTop ? (z.default.addClass(this.__closeButton, e.CLASS_CLOSE_TOP), this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0])) : (z.default.addClass(this.__closeButton, e.CLASS_CLOSE_BOTTOM), this.domElement.appendChild(this.__closeButton)), z.default.bind(this.__closeButton, "click", function () {
          o.closed = !o.closed;
        });
      } else {
        void 0 === r.closed && (r.closed = !0);
        var d = document.createTextNode(r.name);
        z.default.addClass(d, "controller-name");

        var c = i(o, d),
            f = function f(e) {
          return e.preventDefault(), o.closed = !o.closed, !1;
        };

        z.default.addClass(this.__ul, e.CLASS_CLOSED), z.default.addClass(c, "title"), z.default.bind(c, "click", f), r.closed || (this.closed = !1);
      }

      r.autoPlace && (U.default.isUndefined(r.parent) && ($ && (ee = document.createElement("div"), z.default.addClass(ee, Y), z.default.addClass(ee, e.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(ee), $ = !1), ee.appendChild(this.domElement), z.default.addClass(this.domElement, e.CLASS_AUTO_PLACE)), this.parent || p(o, r.width)), this.__resizeHandler = function () {
        o.onResizeDebounced();
      }, z.default.bind(window, "resize", this.__resizeHandler), z.default.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler), z.default.bind(this.__ul, "transitionend", this.__resizeHandler), z.default.bind(this.__ul, "oTransitionEnd", this.__resizeHandler), this.onResize(), r.resizable && _(this), l = function l() {
        q && "true" === localStorage.getItem(u(o, "isLocal")) && localStorage.setItem(u(o, "gui"), JSON.stringify(o.getSaveObject()));
      }, this.saveToLocalStorageIfPossible = l, r.parent || n();
    };

    oe.toggleHide = function () {
      te = !te, U.default.each(ne, function (e) {
        e.domElement.style.display = te ? "none" : "";
      });
    }, oe.CLASS_AUTO_PLACE = "a", oe.CLASS_AUTO_PLACE_CONTAINER = "ac", oe.CLASS_MAIN = "main", oe.CLASS_CONTROLLER_ROW = "cr", oe.CLASS_TOO_TALL = "taller-than-window", oe.CLASS_CLOSED = "closed", oe.CLASS_CLOSE_BUTTON = "close-button", oe.CLASS_CLOSE_TOP = "close-top", oe.CLASS_CLOSE_BOTTOM = "close-bottom", oe.CLASS_DRAG = "drag", oe.DEFAULT_WIDTH = 245, oe.TEXT_CLOSED = "Close Controls", oe.TEXT_OPEN = "Open Controls", oe._keydownHandler = function (e) {
      "text" === document.activeElement.type || e.which !== J && e.keyCode !== J || oe.toggleHide();
    }, z.default.bind(window, "keydown", oe._keydownHandler, !1), U.default.extend(oe.prototype, {
      add: function add(e, t) {
        return s(this, e, t, {
          factoryArgs: Array.prototype.slice.call(arguments, 2)
        });
      },
      addColor: function addColor(e, t) {
        return s(this, e, t, {
          color: !0
        });
      },
      remove: function remove(e) {
        this.__ul.removeChild(e.__li), this.__controllers.splice(this.__controllers.indexOf(e), 1);
        var t = this;
        U.default.defer(function () {
          t.onResize();
        });
      },
      destroy: function destroy() {
        this.autoPlace && ee.removeChild(this.domElement), z.default.unbind(window, "keydown", oe._keydownHandler, !1), z.default.unbind(window, "resize", this.__resizeHandler), this.saveToLocalStorageIfPossible && z.default.unbind(window, "unload", this.saveToLocalStorageIfPossible);
      },
      addFolder: function addFolder(e) {
        if (void 0 !== this.__folders[e]) throw new Error('You already have a folder in this GUI by the name "' + e + '"');
        var t = {
          name: e,
          parent: this
        };
        t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed, t.load = this.load.folders[e]);
        var n = new oe(t);
        this.__folders[e] = n;
        var o = i(this, n.domElement);
        return z.default.addClass(o, "folder"), n;
      },
      open: function open() {
        this.closed = !1;
      },
      close: function close() {
        this.closed = !0;
      },
      onResize: function onResize() {
        var e = this.getRoot();

        if (e.scrollable) {
          var t = z.default.getOffset(e.__ul).top,
              n = 0;
          U.default.each(e.__ul.childNodes, function (t) {
            e.autoPlace && t === e.__save_row || (n += z.default.getHeight(t));
          }), window.innerHeight - t - W < n ? (z.default.addClass(e.domElement, oe.CLASS_TOO_TALL), e.__ul.style.height = window.innerHeight - t - W + "px") : (z.default.removeClass(e.domElement, oe.CLASS_TOO_TALL), e.__ul.style.height = "auto");
        }

        e.__resize_handle && U.default.defer(function () {
          e.__resize_handle.style.height = e.__ul.offsetHeight + "px";
        }), e.__closeButton && (e.__closeButton.style.width = e.width + "px");
      },
      onResizeDebounced: U.default.debounce(function () {
        this.onResize();
      }, 50),
      remember: function remember() {
        if (U.default.isUndefined(Z) && (Z = new F.default(), Z.domElement.innerHTML = x.default), this.parent) throw new Error("You can only call remember on a top level GUI.");
        var e = this;
        U.default.each(Array.prototype.slice.call(arguments), function (t) {
          0 === e.__rememberedObjects.length && f(e), e.__rememberedObjects.indexOf(t) === -1 && e.__rememberedObjects.push(t);
        }), this.autoPlace && p(this, this.width);
      },
      getRoot: function getRoot() {
        for (var e = this; e.parent;) {
          e = e.parent;
        }

        return e;
      },
      getSaveObject: function getSaveObject() {
        var e = this.load;
        return e.closed = this.closed, this.__rememberedObjects.length > 0 && (e.preset = this.preset, e.remembered || (e.remembered = {}), e.remembered[this.preset] = h(this)), e.folders = {}, U.default.each(this.__folders, function (t, n) {
          e.folders[n] = t.getSaveObject();
        }), e;
      },
      save: function save() {
        this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = h(this), r(this, !1), this.saveToLocalStorageIfPossible();
      },
      saveAs: function saveAs(e) {
        this.load.remembered || (this.load.remembered = {}, this.load.remembered[Q] = h(this, !0)), this.load.remembered[e] = h(this), this.preset = e, d(this, e, !0), this.saveToLocalStorageIfPossible();
      },
      revert: function revert(e) {
        U.default.each(this.__controllers, function (t) {
          this.getRoot().load.remembered ? l(e || this.getRoot(), t) : t.setValue(t.initialValue), t.__onFinishChange && t.__onFinishChange.call(t, t.getValue());
        }, this), U.default.each(this.__folders, function (e) {
          e.revert(e);
        }), e || r(this.getRoot(), !1);
      },
      listen: function listen(e) {
        var t = 0 === this.__listening.length;
        this.__listening.push(e), t && b(this.__listening);
      },
      updateDisplay: function updateDisplay() {
        U.default.each(this.__controllers, function (e) {
          e.updateDisplay();
        }), U.default.each(this.__folders, function (e) {
          e.updateDisplay();
        });
      }
    }), t.default = oe, e.exports = t.default;
  }, function (e, t) {
    "use strict";

    e.exports = {
      load: function load(e, t) {
        var n = t || document,
            o = n.createElement("link");
        o.type = "text/css", o.rel = "stylesheet", o.href = e, n.getElementsByTagName("head")[0].appendChild(o);
      },
      inject: function inject(e, t) {
        var n = t || document,
            o = document.createElement("style");
        o.type = "text/css", o.innerHTML = e;
        var i = n.getElementsByTagName("head")[0];

        try {
          i.appendChild(o);
        } catch (e) {}
      }
    };
  }, function (e, t) {
    e.exports = "<div id=dg-save class=\"dg dialogue\"> Here's the new load parameter for your <code>GUI</code>'s constructor: <textarea id=dg-new-constructor></textarea> <div id=dg-save-locally> <input id=dg-local-storage type=checkbox /> Automatically save values to <code>localStorage</code> on exit. <div id=dg-local-explain>The values saved to <code>localStorage</code> will override those passed to <code>dat.GUI</code>'s constructor. This makes it easier to work incrementally, but <code>localStorage</code> is fragile, and your friends may not see the same values you do. </div> </div> </div>";
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.__esModule = !0;

    var i = n(10),
        r = o(i),
        a = n(13),
        l = o(a),
        s = n(14),
        u = o(s),
        d = n(11),
        c = o(d),
        f = n(15),
        _ = o(f),
        p = n(8),
        h = o(p),
        m = n(5),
        b = o(m),
        g = function g(e, t) {
      var n = e[t];
      return b.default.isArray(arguments[2]) || b.default.isObject(arguments[2]) ? new r.default(e, t, arguments[2]) : b.default.isNumber(n) ? b.default.isNumber(arguments[2]) && b.default.isNumber(arguments[3]) ? b.default.isNumber(arguments[4]) ? new u.default(e, t, arguments[2], arguments[3], arguments[4]) : new u.default(e, t, arguments[2], arguments[3]) : b.default.isNumber(arguments[4]) ? new l.default(e, t, {
        min: arguments[2],
        max: arguments[3],
        step: arguments[4]
      }) : new l.default(e, t, {
        min: arguments[2],
        max: arguments[3]
      }) : b.default.isString(n) ? new c.default(e, t) : b.default.isFunction(n) ? new _.default(e, t, "") : b.default.isBoolean(n) ? new h.default(e, t) : null;
    };

    t.default = g, e.exports = t.default;
  }, function (e, t) {
    "use strict";

    function n(e) {
      setTimeout(e, 1e3 / 60);
    }

    t.__esModule = !0, t.default = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || n, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    t.__esModule = !0;

    var r = n(9),
        a = o(r),
        l = n(5),
        s = o(l),
        u = function () {
      function e() {
        i(this, e), this.backgroundElement = document.createElement("div"), s.default.extend(this.backgroundElement.style, {
          backgroundColor: "rgba(0,0,0,0.8)",
          top: 0,
          left: 0,
          display: "none",
          zIndex: "1000",
          opacity: 0,
          WebkitTransition: "opacity 0.2s linear",
          transition: "opacity 0.2s linear"
        }), a.default.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), s.default.extend(this.domElement.style, {
          position: "fixed",
          display: "none",
          zIndex: "1001",
          opacity: 0,
          WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
          transition: "transform 0.2s ease-out, opacity 0.2s linear"
        }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
        var t = this;
        a.default.bind(this.backgroundElement, "click", function () {
          t.hide();
        });
      }

      return e.prototype.show = function () {
        var e = this;
        this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), s.default.defer(function () {
          e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)";
        });
      }, e.prototype.hide = function e() {
        var t = this,
            e = function e() {
          t.domElement.style.display = "none", t.backgroundElement.style.display = "none", a.default.unbind(t.domElement, "webkitTransitionEnd", e), a.default.unbind(t.domElement, "transitionend", e), a.default.unbind(t.domElement, "oTransitionEnd", e);
        };

        a.default.bind(this.domElement, "webkitTransitionEnd", e), a.default.bind(this.domElement, "transitionend", e), a.default.bind(this.domElement, "oTransitionEnd", e), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)";
      }, e.prototype.layout = function () {
        this.domElement.style.left = window.innerWidth / 2 - a.default.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - a.default.getHeight(this.domElement) / 2 + "px";
      }, e;
    }();

    t.default = u, e.exports = t.default;
  }, function (e, t, n) {
    t = e.exports = n(24)(), t.push([e.id, ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1!important}.dg.main .close-button.drag,.dg.main:hover .close-button{opacity:1}.dg.main .close-button{transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{transition:height .1s ease-out;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid transparent}.dg li.title{margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.boolean,.dg .cr.boolean *,.dg .cr.function,.dg .cr.function *,.dg .cr.function .property-name{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco,monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px Lucida Grande,sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid hsla(0,0%,100%,.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.boolean:hover,.dg .cr.function:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}", ""]);
  }, function (e, t) {
    e.exports = function () {
      var e = [];
      return e.toString = function () {
        for (var e = [], t = 0; t < this.length; t++) {
          var n = this[t];
          n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1]);
        }

        return e.join("");
      }, e.i = function (t, n) {
        "string" == typeof t && (t = [[null, t, ""]]);

        for (var o = {}, i = 0; i < this.length; i++) {
          var r = this[i][0];
          "number" == typeof r && (o[r] = !0);
        }

        for (i = 0; i < t.length; i++) {
          var a = t[i];
          "number" == typeof a[0] && o[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a));
        }
      }, e;
    };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'preset': 'stresstest',
  'closed': false,
  'remembered': {
    'Default': {
      '0': {}
    },
    'Normal': {
      '0': {
        'rtt': 1300,
        'jitter': 0,
        'sendWait': 650,
        'timeout': 2700,
        'dropRate': 0.1
      }
    },
    'Slow': {
      '0': {
        'rtt': 1500,
        'jitter': 0,
        'sendWait': 850,
        'timeout': 1850,
        'dropRate': 0.1
      }
    },
    'stresstest': {
      '0': {
        'rtt': 400,
        'jitter': 0,
        'sendWait': 0,
        'timeout': 1850,
        'dropRate': 0
      }
    }
  },
  'folders': {}
};
exports.default = _default;

/***/ })
/******/ ]);