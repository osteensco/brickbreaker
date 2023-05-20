// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { initGameLoop } from "../game/gameLoop";
import { createCanvas, getCanvasContext, updateSize } from "./helpers";
import { Paddle } from "../objs/paddles";
import { Ball } from "../objs/balls";

// renderer process



let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let main: mainMenu
let gameObjects: any


const menu = {
    load: () => {
        main = new mainMenu();
    } 
};


const game = {

    init: () => {

        gameObjects = {
            player: new Paddle(canvas, ctx),
            level: null,
            message: {
                show: true,
                text: '',
                timer: null,
                duration: 4000,
                // dummy functions to allow for simple loop in gameLoop
                draw: () => {
                    return
                },
                updateSize: (canvas: HTMLCanvasElement) => {
                    return
                }
            },
        };

        initGameLoop(canvas, ctx, gameObjects);

    },

    loadCanvas: () => {
        
        canvas = createCanvas();
        ctx = getCanvasContext();
        
    },

    windowResize: () => {
        if (canvas) {
            updateSize(canvas);
            for (const objName in gameObjects) {
                gameObjects[objName].updateSize(canvas);
            }
        }
        
    }
   
};


const listeners = {
    onStart: (callback: () => void) => {
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
        ipcRenderer.send("renderer-load");
    }
}

contextBridge.exposeInMainWorld("APP", {
    menu,
    game,
    listeners,
    rendererSend,
});


