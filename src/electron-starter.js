const { app, BrowserWindow, shell, dialog, electron } = require("electron");
const contextMenu = require('electron-context-menu');


// Module to control application life.
// Module to create native browser window.

const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  const screenElectron = require("electron").screen;
  const display = screenElectron.getPrimaryDisplay();
  const dimensions = display.workAreaSize;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    maximizable: true,
    width: parseInt(dimensions.width * 1),
    height: parseInt(dimensions.height * 1),
    webPreferences: {
      spellcheck: false
    }
  });
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on("close", function(event) {
    event.preventDefault();
    const choice = dialog.showMessageBoxSync({
      type: "warning",
      icon:"src/assets/icon/favicon.png",
      buttons: ["YES", "NO"],
      title: "Cerrar",
      message: "¿Estás seguro de que quieres cerrar la aplicación?"
    });
    if (choice === 0) {
      app.exit(0);
    }
  });
  mainWindow.webContents.session.clearCache(function() {
    return true;
  });
  mainWindow.webContents.session.flushStorageData(function () {

    return true;

  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../www/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// app.whenReady().then(() => {

//   createWindow();

//   contextMenu({ showInspectElement: false, showSearchWithGoogle: false, spellcheck: false, learnSpelling: false, lookUpSelection: false });

// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
