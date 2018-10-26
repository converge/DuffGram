 // Basic init
const electron = require('electron')
const {
    app,
    BrowserWindow
} = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    mainWindow.on('closed', () => {
        win = null
    })
}

app.on('ready', function () {
    createWindow()
    // devTools
    // BrowserWindow.addDevToolsExtension("/Users/converge/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.4.1_0/")
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
