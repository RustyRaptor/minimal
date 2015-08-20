module.exports = window.App = App

var EventEmitter = require('events').EventEmitter

var createElement = require('virtual-dom/create-element')
var h = require('virtual-dom/h')
var inherits = require('inherits')

var Menu = require('./lib/elements/menu')

inherits(App, EventEmitter)

function App (el, currentWindow) {
  var self = this
  if (!(self instanceof App)) return new App(el)
  self._notifications = 0
  self.currentWindow = currentWindow

  // View instances in our app
  self.views = {
    menu: new Menu(self)
  }

  // Initial render
  var tree = self.render()
  var rootNode = createElement(tree)
  el.appendChild(rootNode)
}

App.prototype.render = function () {
  var self = this
  var views = self.views

  return h('div#minimal', [
    h('div#titlebar', views.menu.render()),
    h('div#content', [
      h('div#channels')
    ]),
    h('textarea#message-input', {
      placeholder: 'Message'
    })
  ])
}

App.prototype.isFocused = function () {
  if (this.currentWindow) {
    return this.currentWindow.isFocused()
  }
  return true
}
