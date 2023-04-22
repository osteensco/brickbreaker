import { app, ipcMain } from "electron";
import { createWindow } from "./utils/window";



app.on("ready", () => {
    createWindow();
});


