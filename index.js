var BrowserWindow = require('browser-window')
var path = require('path')

var INDEX = 'file://' + path.join(__dirname, 'index.html')

var app = require('app')
app.on('ready', appReady)

var mainWindow

function appReady () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'minimal.'
  })
  mainWindow.loadUrl(INDEX)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
