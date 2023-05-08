// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";









const menu = {
    load: () => {
        new mainMenu()
    } 
};


const game = {
    // loop: () => { 
    //     // gameLoop()
    //     // console.log('gameLoop running')
    // },
    // init: () => {
    //     ipcRenderer.send("game-start")
    // },
    canvas: document.getElementById('gameCanvas'),
   
};


const listeners = {
    onStart: (callback: () => void) => {
        callback();
        ipcRenderer.on("app-start", (_event) => callback());
    },
    onWindowSize: (callback: (winSize: any) => void) => {
        ipcRenderer.on("window-size", (_event, winSize) => callback(winSize));
      }
};



contextBridge.exposeInMainWorld("API", {
    menu,
    game,
    listeners,
});


