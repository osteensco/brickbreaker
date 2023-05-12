// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { createElement } from "./helpers";
import { Brick } from "../objs/bricks";
import { Paddle } from "../objs/paddles";




let player: Paddle






const menu = {
    load: () => {
        new mainMenu()
    } 
};


const game = {

    load: () => {
        // game logic should reside in a game object
        const canvas = createElement('canvas', 'game-canvas', 'game-canvas') as HTMLCanvasElement;
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    
    },

    spawnPaddle: () => {
        player = new Paddle(100,200, 25, 7, 2)
    },

    draw: () => {
        player.draw()
    }


   
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

contextBridge.exposeInMainWorld("API", {
    menu,
    game,
    listeners,
    rendererSend,
});


