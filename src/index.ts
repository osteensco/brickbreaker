import {app, ipcMain, BrowserWindow} from "electron"

let mainWindow: BrowserWindow


app.on("ready", createWindow)
// const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
// const ctx = canvas.getContext('2d');



function createWindow (): void {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: __dirname + "/preload.js"
        },
        show: false
    });

    let winArray = mainWindow.getSize()
    mainWindow.loadFile("./index.html");
    mainWindow.on("ready-to-show", () => mainWindow.show())
    mainWindow.on("resized", () => {
        winArray = mainWindow.getSize()
       console.log(`width: ${winArray[0]}`)
       console.log(`height: ${winArray[1]}`)
    })
       
}


