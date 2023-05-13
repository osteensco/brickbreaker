// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { initGameLoop } from "../game/gameLoop";
import { createCanvas, getCanvasContext } from "./helpers";



// renderer process



let ctx: CanvasRenderingContext2D
let main: mainMenu
let canvas: HTMLCanvasElement



const menu = {
    load: () => {
        main = new mainMenu()
    } 
};


const game = {

    init: () => {
        initGameLoop(ctx);
    },

    loadCanvas: () => {
        
        canvas = createCanvas()
        ctx = getCanvasContext()
        
    },

    // spawnPaddle: () => {
    //     player = new Paddle(100,200, 25, 7, 2)
    //     console.log('paddle spawned')
    // },

    // draw: () => {
    //     return
    // }


   
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
        ipcRenderer.on("game-load", (_event, ) => callback());
    },
};

const rendererSend = {
    loaded: () => {
        ipcRenderer.send("renderer-load")
    }
}

contextBridge.exposeInMainWorld("APP", {
    menu,
    game,
    listeners,
    rendererSend,
});


