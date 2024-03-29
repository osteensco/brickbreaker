// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities caused by
// exposing node processes to the internet
import { ipcRenderer, contextBridge } from "electron";
import { mainMenu } from "../menu/mainMenu";
import { highscores, scoresMenu } from "../menu/scores";
import { settingsMenu } from "../menu/settings";
import { initGameLoop } from "../game/gameLoop";
import { createCanvas, getCanvasContext, updateSize } from "./helpers";
import { lvl_1, lvl_2, lvl_3 } from "../game/levels";
import { Score } from "../objs/score";
import { defaultSettings, Settings, SettingsRow } from "../objs/settings";



// renderer process



let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let mainView: mainMenu
let scoresView: scoresMenu
let settingsView: settingsMenu
let gameObjects: any
let settings: Settings
let appSettings: SettingsRow;
let highScores: Array<highscores>;






const menu = {
    loadMain: () => {
        mainView = new mainMenu();
    },

    loadScores: () => {
        scoresView = new scoresMenu(highScores);
    },

    loadSettings: () => {
        settings = new Settings(appSettings);
        settingsView = new settingsMenu(settings);
    },

};


const game = {

    init: () => {
        settings = new Settings(appSettings)

        gameObjects = {
            settings: settings,
            run: true,
            over: false,
            objs: {
                player: null,
                level: null,
                score: new Score(0, canvas, ctx),
                
            },
            message: {
                show: true,
                text: '',
                timer: null,
                duration: 3000,
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
    onCurrentSettingsLoad: () => {
        ipcRenderer.on("current-settings", (_event, settings) => {
            appSettings = settings;
        });
    },
    onApplyDefaultSettings: () => {
        ipcRenderer.on("apply-default-settings", (_event, settings) => {
            appSettings = settings;
            menu.loadSettings();
        });
    },
    onGetHighScores: () => {
        ipcRenderer.on("get-highscores", (_event, scores) => {
            highScores = scores;
        });
    }


};



const rendererSend = {
    appLoaded: () => {
        ipcRenderer.send("load-menu");
        ipcRenderer.send("get-current-settings");
        ipcRenderer.send("get-highscores");
    }
}


contextBridge.exposeInMainWorld("APP", {
    menu,
    game,
    listeners,
    rendererSend,
});


