// this script allows the usage of nodejs and electron specific modules 
// and libraries without typical security vulnerabilities
import { ipcRenderer, contextBridge } from "electron";






const test = {
    stuff: "here's some stuff"//this could be functions, classes, react components probably, etc
};


const game = {
    // loop: () => { 
    //     // gameLoop()
    //     // console.log('gameLoop running')
    // },
    // init: () => {
        
    // },
    canvas: document.getElementById('gameCanvas'),
   
};





contextBridge.exposeInMainWorld("API", {
    test,
    game,
});


