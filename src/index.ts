import { app, ipcMain} from "electron";
import { createWindow } from "./utils/window";
import { createDefaultSettingsRecord, defaultSettings, getSettingsRow } from "./objs/settings";




// main process




const sqlite = require('sqlite3').verbose();

export const db = new sqlite.Database('brickbreaker.db', (err: Error) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

createDefaultSettingsRecord(db, defaultSettings);

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

    ipcMain.on("update-setting", async (event, property, newValue) => {

        const query = `UPDATE settings SET ${property} = ? WHERE dfault = 0`;
        const params = [newValue];
        const errorHandle = (err: Error) => {
            if (err) {
                console.log(query, params);
                console.error('Error updating setting:', err.message);
            } else {
                console.log(`${property} setting updated successfully.`);
            }
          };

        await db.run(query, params, errorHandle);
        const appSettings = await getSettingsRow(db, 0);
        mainWindow.webContents.send('current-settings', appSettings);

    });

    ipcMain.on("apply-default-settings", () => {
        mainWindow.webContents.send("apply-default-settings");
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





