import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window";
import { initGameLoop } from "./game/gameLoop";





const isDev = process.env.NODE_ENV !== 'production';

app.on("ready", () => {
    const mainWindow = createWindow();

    if (isDev) {
        mainWindow.webContents.openDevTools();
      }

    initGameLoop(mainWindow);
    
});


