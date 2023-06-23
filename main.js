const { app, BrowserWindow } = require('electron')
const settings = require('electron-settings');


function createWindow () {
  const win = new BrowserWindow({
    width: 410,
    height: 360,
    transparent: true,
    frame:false,
    icon: './weather.ico',
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}


app.on('ready', () => {
  settings.setSync('hide-app-in-taskbar', true);
});

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform!== 'darwin') {
    app.quit()
  }
})