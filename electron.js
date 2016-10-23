/* jshint node: true */
'use strict';

const electron             = require('electron');
const path                 = require('path');
const {app, BrowserWindow, globalShortcut} = electron;
const dirname              = __dirname || path.resolve(path.dirname());
const emberAppLocation     = `file://${dirname}/dist/index.html`;

/* TODO MOve this !!!!! */
try {
var eddystoneBeacon = require('eddystone-beacon');
var url = 'http://example.com';
eddystoneBeacon.advertiseUrl(url);
} catch(e) {

}

app.commandLine.appendSwitch('enable-web-bluetooth', true);

var io = require('socket.io')(4201);

io.on('connection', function (socket) {
  console.log('Connection started');

  socket.on('controls', function (data) {
    socket.broadcast.emit('controls', data);
  });
});

var express = require('express')();

express.get('/', function (req, res) {
    res.send(`
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.5.0/socket.io.min.js"></script>
<style>
    button {
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        border: 1px solid #DDD;
    }
    button:active { background-color #FFF; }
    .left { left: 0; background-color: #98d4ff; } .right { right: 0;  background-color: #ff9898;}
</style>
<script>
  var socket = io('ws://172.27.131.188:4201/');
</script>
<button onclick="socket.emit('controls', { control: 'left' });" class="left">&larr;</button>
<button onclick="socket.emit('controls', { control: 'right' });" class="right">&rarr;</button>
`);
});

express.listen(4203, function () {
  console.log('Web server serving!');
});

/* END TODO: MOVE THIS ^^^^^ */

let mainWindow = null;

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/

// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

app.commandLine.appendSwitch('--enable-viewport-meta', 'true');

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {
    mainWindow = new BrowserWindow({
        kiosk: true,
        frame: false,
        fullscreen: true
    });

    delete mainWindow.module;

    // If you want to open up dev tools programmatically, call
    // mainWindow.openDevTools();

    // By default, we'll open the Ember App by directly going to the
    // file system.
    //
    // Please ensure that you have set the locationType option in the
    // config/environment.js file to 'hash'. For more information,
    // please consult the ember-electron readme.
    mainWindow.loadURL(emberAppLocation);

    // If a loading operation goes wrong, we'll send Electron back to
    // Ember App entry point

    globalShortcut.register('CommandOrControl+B', () => {
      console.log('CommandOrControl+B is pressed')
    });

    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.webContents.on('crashed', () => {
        console.log('Your Ember app (or other code) in the main window has crashed.');
        console.log('This is a serious issue that needs to be handled and/or debugged.');
    });

    mainWindow.on('unresponsive', () => {
        console.log('Your Ember app (or other code) has made the window unresponsive.');
    });

    mainWindow.on('responsive', () => {
        console.log('The main window has become responsive again.');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle an unhandled error in the main thread
    //
    // Note that 'uncaughtException' is a crude mechanism for exception handling intended to
    // be used only as a last resort. The event should not be used as an equivalent to
    // "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
    // an undefined state. Attempting to resume application code without properly recovering
    // from the exception can cause additional unforeseen and unpredictable issues.
    //
    // Attempting to resume normally after an uncaught exception can be similar to pulling out
    // of the power cord when upgrading a computer -- nine out of ten times nothing happens -
    // but the 10th time, the system becomes corrupted.
    //
    // The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
    // resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
    // not safe to resume normal operation after 'uncaughtException'.
    process.on('uncaughtException', (err) => {
        console.log('An exception in the main thread was not handled.');
        console.log('This is a serious issue that needs to be handled and/or debugged.');
        console.log(`Exception: ${err}`);
    });
});
