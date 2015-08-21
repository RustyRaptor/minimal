module.exports = window.App = App

var EventEmitter = require('events').EventEmitter

var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var h = require('virtual-dom/h')
var inherits = require('inherits')

var Menu = require('./lib/elements/menu')
var Composer = require('./lib/elements/composer')

inherits(App, EventEmitter)

function App (el, currentWindow) {
  var self = this
  if (!(self instanceof App)) return new App(el)
  self._notifications = 0
  self.currentWindow = currentWindow

  // View instances in our app
  self.views = {
    menu: new Menu(self),
    composer: new Composer(self)
  }

  // Initial render
  var tree = self.render()
  var rootNode = createElement(tree)
  el.appendChild(rootNode)

  function render () {
    var newTree = self.render()
    var patches = diff(tree, newTree)
    rootNode = patch(rootNode, patches)
    tree = newTree
  }

  self.on('render', render)
}

App.prototype.render = function () {
  var self = this
  var views = self.views

  return h('div#minimal', [
    h('div#titlebar', views.menu.render()),
    h('div#content', [
      h('div#channels')
    ]),
    views.composer.render()
  ])
}

App.prototype.isFocused = function () {
  if (this.currentWindow) {
    return this.currentWindow.isFocused()
  }
  return true
}
