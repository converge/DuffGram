const electron = require('electron')
const {
    app,
    BrowserWindow
} = electron

const server = require('./server.js')
const userData = app.getPath('userData',)
console.log('user dir: ', userData)
server.start_server(userData)

// Let electron reloads by itself when webpack watches changes in ./app/
// require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        win = null
    })
}

app.on('ready', function () {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'Darwin') {
        app.quit()
    }
})

app.on('active', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
