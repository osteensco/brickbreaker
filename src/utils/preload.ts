// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { scoresMenu } from "../menu/scores";
import { settingsMenu } from "../menu/settings";
import { initGameLoop } from "../game/gameLoop";
import { createCanvas, getCanvasContext, updateSize } from "./helpers";
import { Paddle } from "../objs/paddles";
import { lvl_1, lvl_2, lvl_3 } from "../game/levels";

// renderer process



let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let main: mainMenu
let scores: scoresMenu
let settings: settingsMenu
let gameObjects: any


const menu = {
    loadMain: () => {
        main = new mainMenu();
    },

    loadScores: () => {
        scores = new scoresMenu();
    },

    loadSettings: () => {
        settings = new settingsMenu();
    },

};


const game = {

    init: () => {

        gameObjects = {
            run: true,
            over: false,
            objs: {
                player: new Paddle(canvas, ctx),
                level: null,
            },
            message: {
                show: true,
                text: '',
                timer: null,
                duration: 4000,
            },
            current_level: 0,
            level_map: [
                lvl_1,
                lvl_2,
                lvl_3
            ]
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
    onScoresNav: (callback: () => void) => {
        ipcRenderer.on("scores-load", (_event, ) => callback());
    },
    onSettingsNav: (callback: () => void) => {
        ipcRenderer.on("settings-load", (_event, ) => callback());
    },
};



const rendererSend = {
    appLoaded: () => {
        ipcRenderer.send("load-menu");
    }
}


contextBridge.exposeInMainWorld("APP", {
    menu,
    game,
    listeners,
    rendererSend,
});


