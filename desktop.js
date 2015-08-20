module.exports = Desktop

var inherits = require('util').inherits
var App = require('./app.js')

var remote = require('remote')
var app = remote.require('app')
var shell = require('shell')
var currentWindow = remote.getCurrentWindow()

inherits(Desktop, App)

function Desktop () {
  if (!(this instanceof Desktop)) return new Desktop()
  App.call(this, document.body, currentWindow)
  var self = this

  // clear notifications on focus.
  currentWindow.on('focus', function () {
    self.setBadge(false)
  })

  this.on('setBadge', this.setBadge.bind(this))
  this.on('openUrl', function (url) {
    shell.openExternal(url)
  })
}

Desktop.prototype.setBadge = function (num) {
  if (!app.dock) return

  if (num === false) {
    return app.dock.setBadge('')
  } else if (num == null) {
    this._notifications++
  } else {
    this._notifications = num
  }
  app.dock.setBadge(this._notifications.toString())
}
