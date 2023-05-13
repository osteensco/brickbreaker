import { BrowserWindow } from "electron";
import { join } from "path";


// main process



export function createWindow (): BrowserWindow {
    let mainWindow: BrowserWindow;

    mainWindow = new BrowserWindow({
        width: 1000, height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "/preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        },
        show: false
    });

    
    mainWindow.loadFile("./index.html");
    mainWindow.once("ready-to-show", () => mainWindow.show());
    mainWindow.focus();


    mainWindow.on("resized", () => {
        const [width, height] = mainWindow.getSize();
        const winSize = { width, height };
        mainWindow.webContents.send("window-size", winSize);
    });

    mainWindow.on("resize", () => {
        const [width, height] = mainWindow.getSize();
        const winSize = { width, height };
        mainWindow.webContents.send("window-size", winSize);
    });
       

    return mainWindow
}





