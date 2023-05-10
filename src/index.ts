import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window";
import { initGameLoop } from "./game/gameLoop";
import { defaultState, currentState } from "./game/gameState";


// main process

const isDev = process.env.NODE_ENV !== 'production';

app.on("ready", () => {
    const mainWindow = createWindow();
    
    
    
    if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    
    
    ipcMain.on("renderer-load", () => {
        mainWindow.webContents.send("app-start");
    });


    
    ipcMain.on("game-start", () => {

        initGameLoop(mainWindow);
        // currentState = defaultState
    });
    // ipcMain.on("game-update", currentState)

    
    



});


