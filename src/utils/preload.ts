// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { createElement } from "./helpers";








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
    test: () => {
        
        const canvas = createElement('canvas', 'game-canvas', 'game-canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    
        // Set the canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        // Set the square fill color
        ctx.fillStyle = "red";
    
        // Draw the square
        ctx.fillRect(50, 50, 10, 10);
        
        // createElement('div', 'block', 'block-1', '.game-canvas#game-canvas');
    },
   
};


const listeners = {
    onStart: (callback: () => void) => {
        // callback();
        ipcRenderer.on("app-start", (_event) => callback());
    },
    onWindowSize: (callback: (winSize: any) => void) => {
        ipcRenderer.on("window-size", (_event, winSize) => callback(winSize));
      },
    onGameLoad: (callback: () => void) => {
        ipcRenderer.on("game-load", (_event) => callback());
    },
};

const rendererSend = {
    loaded: () => {
        ipcRenderer.send("renderer-load")
    }
}

contextBridge.exposeInMainWorld("API", {
    menu,
    game,
    listeners,
    rendererSend,
});


