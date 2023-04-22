// this script allows the usage of nodejs and electron specific modules and libraries without typical security vulnerabilities
import { ipcRenderer, contextBridge } from "electron";



const test = {
    stuff: "here's some stuff"//this could be functions, classes, react components probably, etc
};

const gameLoop = {
    init: (message: any) => {
        if (message.myTypeField === 'start-game') {
          ipcRenderer.send('start-game-loop', message);
        }
      }
};

// const gameloop = ??????








contextBridge.exposeInMainWorld("API", {
    test,
    gameLoop,
});


