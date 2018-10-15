 // Basic init
const electron = require('electron')
const {
    app,
    BrowserWindow
} = electron
const Store = require('./app/src/store.js')

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// First instantiate the class
const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        default_ig_account: {
            ig_account: 'cycling_apparel'
        }
    }
});

// To avoid being garbage collected
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600
    })
    let {
        ig_account
    } = store.get('default_ig_account');
    console.log(ig_account);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    mainWindow.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform != 'Darwin') {
        app.quit()
    }
})

app.on('active', () => {
    if (mainWindow == null) {
        createWindow()
    }
})
