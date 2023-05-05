// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";






const test = {
    stuff: "here's some stuff"//this could be functions, classes, react components probably, etc
};


const game = {
    // loop: () => { 
    //     // gameLoop()
    //     // console.log('gameLoop running')
    // },
    init: () => {
        ipcRenderer.send("game-start")
    },
    canvas: document.getElementById('gameCanvas'),
   
};


const listeners = {
    onWindowSize: (callback: (winSize: any) => void) => {
        ipcRenderer.on("window-size", (_event, winSize) => callback(winSize));
      }
};



contextBridge.exposeInMainWorld("API", {
    test,
    game,
    listeners,
});


