module.exports = Composer

var h = require('virtual-dom/h')
var inherits = require('util').inherits
var BaseElement = require('./base-element')

function Composer (target) {
  BaseElement.call(this, target)
}
inherits(Composer, BaseElement)

var ENTER_KEY = 13

// the height taken up by padding, margin, border combined
Composer.prototype.minimumHeight = 48  // the default height of the composer element in pixels is one row + mimimum
Composer.prototype.defaultHeight = 17 + this.minimumHeight

Composer.prototype.render = function () {
  var self = this

  return h('textarea#message-input', {
    onload: self,
    rows: 1,
    autofocus: true,
    onkeydown: function (e) {
      if (e.keyCode === ENTER_KEY && !e.shiftKey) {
        e.preventDefault()
        self.submit(e.target)
      }
    },
    oninput: function (e) {
      self.resize(e.target)
    }
  })
}

Composer.prototype.submit = function (node) {
  var self = this
  if (node.value.charAt(0) === '/') {
    self.send('executeCommand', node.value)
  } else {
    self.send('sendMessage', node.value)
  }
  node.value = ''
  self.resize()
}

Composer.prototype.focus = function () {
  var self = this
  self.node.focus()
}

Composer.prototype.hook = function (node) {
  var self = this
  self.node = node

  // init for auto expander
  setTimeout(function () {
    console.log('test')
    node.setAttribute('aria-label', 'Enter a message and press enter')
    var savedValue = self.node.value
    self.node.value = ''
    self.node.baseScrollHeight = self.node.scrollHeight
    self.node.value = savedValue
  })
}

Composer.prototype.resize = function () {
  var oldrows = this.node.rows
  this.node.rows = 1
  var rows = Math.ceil((this.node.scrollHeight - this.node.baseScrollHeight) / 17)
  this.node.rows = 1 + rows

  // only dispatch an event if the rows count actually changed
  if (oldrows !== this.node.rows) {
    this.send('resizeComposer', rows * 17 + this.minimumHeight)
  }
}
