import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window";




// main process




const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('mydatabase.db', (err: Error) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});


const isDev = process.env.NODE_ENV !== 'production';

app.on("ready", () => {
    const mainWindow = createWindow();
    
    
    
    if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    
    
    ipcMain.on("load-menu", () => {
        mainWindow.webContents.send("app-start");
    });


    
    ipcMain.on("game-start", () => {

        mainWindow.webContents.send("game-load");

    });


    ipcMain.on("nav-scores", () => {
        mainWindow.webContents.send("scores-load");
    });


    ipcMain.on("nav-settings", () => {
        mainWindow.webContents.send("settings-load");
    });


});



app.on("window-all-closed", () => {
    console.log("window-all-closed")
    app.quit();
    return
});



app.on("will-quit", () => {
    db.close((err: Error) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed');
        }
      });
      console.log("will-quit");
    return
});





