module.exports = Menu

var _ = require('lodash')
var h = require('virtual-dom/h')
var inherits = require('util').inherits
var BaseElement = require('./base-element')
var mainWindow = require('remote').getCurrentWindow()

function Menu (target) {
  BaseElement.call(this, target)
}
inherits(Menu, BaseElement)

Menu.prototype.render = function () {
  var actions = {
    'Fullscreen': {
      id: '#fullscreen-window',
      fn: function () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen())
      }
    },
    'Maximize': {
      id: '#maximize-window',
      fn: function () {
        mainWindow.maximize()
      }
    },
    'Minimize': {
      id: '#minimize-window',
      fn: function () {
        mainWindow.minimize()
      }
    },
    'Close': {
      id: '#close-window',
      fn: function () {
        mainWindow.close()
      }
    }
  }
  var items = _.map(actions, function (val, key) {
    return h('li', [
      h('a' + val.id, {
        onclick: function () {
          val.fn()
        }
      }, key)
    ])
  })

  return [
    h('div#window-menu.menu', [
      h('a'),
      h('ul.menu-items', [
        items
      ])
    ])
  ]
}
