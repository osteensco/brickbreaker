import { BrowserWindow } from "electron";
import { gameLoop } from "../game/gameLoop";


export let mainWindow: BrowserWindow;
let winArray: Array<number>;
export let winWidth: number;
export let winHeight: number;





export function createWindow (): void {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: __dirname + "/preload.js"
        },
        show: false
    });

    
    mainWindow.loadFile("./index.html");
    mainWindow.on("ready-to-show", () => mainWindow.show())
    mainWindow.focus()

    mainWindow.on("resized", () => {
        winArray = mainWindow.getSize()
        
        winWidth = winArray[0]
        winHeight = winArray[1]
    })
       
    const resizeEvent = mainWindow.listeners("resized");
    resizeEvent.forEach((getSize) => {
        getSize.call(mainWindow);
    })

    gameLoop(mainWindow)
}





