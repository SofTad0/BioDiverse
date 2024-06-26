const { app, BrowserWindow, ipcMain, shell} = require('electron')

let win;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 700,
    autoHideMenuBar: true,
    icon: "imgs/logo.png",
    resizable: false,
    webPreferences: {
        nodeIntegration: true, // Enable Node.js integration in the renderer process
        contextIsolation: false, // This is set to false to allow access to Node.js globals in the renderer process
    },
  })

  win.loadFile('index.html')
  //win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow();
  
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


// Handle the open-new-window event
ipcMain.on('open-new-window', (event, arg) => {
    const newWindow = new BrowserWindow({
      width: 1300,
      height: 700,
      parent: win,
      modal: true,
      autoHideMenuBar: true,
      icon: "imgs/logo.png",
      title: 'New Window',
    });
    newWindow.loadFile("regions/"+arg+".html");
    //newWindow.webContents.openDevTools()
  
});


// Open links externally in the user's default browser
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });

  contents.on('new-window', async (event, navigationUrl) => {
    event.preventDefault();
    await shell.openExternal(navigationUrl);
  });
});
