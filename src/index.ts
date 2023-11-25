import { app, ipcMain} from "electron";
import { createWindow } from "./utils/window";
import { clearSettingsRow, createDefaultSettingsRecord, defaultSettings, getSettingsRow, insertSettings } from "./objs/settings";
import { createHighScoresTable, updateHighScores } from "./objs/score";
import { getHighScores } from "./menu/scores";
import { Database } from "sqlite3";



// main process



export const db = new Database('brickbreaker.db', (err: Error| null) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

createDefaultSettingsRecord(db, defaultSettings);
createHighScoresTable(db);


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
                console.log(`${property} setting updated successfully`);
            }
          };

        await db.run(query, params, errorHandle);
        const appSettings = await getSettingsRow(db, 0);
        mainWindow.webContents.send('current-settings', appSettings);

    });


    ipcMain.on("apply-default-settings", async () => {

        await clearSettingsRow(db, 0);
        await insertSettings(db, 0, defaultSettings);
        const appSettings = await getSettingsRow(db, 0);
        mainWindow.webContents.send("apply-default-settings", appSettings);

    });


    ipcMain.on("update-highscores", async (event, score) => {

        await updateHighScores(db, score);
        const scores = await getHighScores(db);
        mainWindow.webContents.send("get-highscores", scores);
    
    });


    ipcMain.on("get-highscores", async () => {

        const scores = await getHighScores(db);
        mainWindow.webContents.send("get-highscores", scores);
        
    })


});



app.on("window-all-closed", () => {
    console.log("window-all-closed")
    app.quit();
    return
});



app.on("will-quit", () => {
    db.close((err: Error | null) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed');
        }
      });
      console.log("will-quit");
    return
});





