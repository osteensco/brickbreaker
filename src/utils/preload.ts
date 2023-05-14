// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { initGameLoop } from "../game/gameLoop";
import { createCanvas, getCanvasContext, updateSize } from "./helpers";
import { Paddle } from "../objs/paddles";


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
            // let gameState = defaultGameState;
        gameObjects = {
            player: new Paddle(canvas, ctx),
            // balls: {
            //     1: new Ball(player.x, )
            // },
        };
        initGameLoop(canvas, ctx, gameObjects);
    },

    loadCanvas: () => {
        
        canvas = createCanvas();
        ctx = getCanvasContext();
        
    },

    windowResize: () => {
        updateSize(canvas);
        for (const objName in gameObjects) {
            gameObjects[objName].updateSize(canvas);
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


