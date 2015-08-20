module.exports = window.App = App

var EventEmitter = require('events').EventEmitter

var _ = require('lodash')
var createElement = require('virtual-dom/create-element')
var h = require('virtual-dom/h')
var inherits = require('inherits')

inherits(App, EventEmitter)

function App (el, currentWindow) {
  var self = this
  if (!(self instanceof App)) return new App(el)
  self._notifications = 0
  self.currentWindow = currentWindow

  // Initial render
  var tree = self.render()
  var rootNode = createElement(tree)
  el.appendChild(rootNode)
}

App.prototype.render = function () {
  return h('div#minimal', [
    h('div#titlebar', [
      h('div#window-menu.menu', [
        h('a'),
        h('ul.menu-items', [
          _.map({
            '#fullscreen-window': 'Fullscreen',
            '#maximize-window': 'Maximize',
            '#minimize-window': 'Minimize',
            '#close-window': 'Close'
          }, function (val, key) {
            return h('li', [
              h('a' + key, val)
            ])
          })
        ])
      ])
    ]),
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
