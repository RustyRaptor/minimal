module.exports = window.App = App

var EventEmitter = require('events').EventEmitter

var h = require('virtual-dom/h')
var inherits = require('inherits')

inherits(App, EventEmitter)

function App (el, currentWindow) {
  var self = this
  if (!(self instanceof App)) return new App(el)
  self._notifications = 0
  self.currentWindow = currentWindow
}

App.prototype.render = function () {
  var self = this

  return h('div.layout')
}

App.prototype.isFocused = function () {
  if (this.currentWindow) {
    return this.currentWindow.isFocused()
  }
  return true
}
