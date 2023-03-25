import { ipcRenderer } from "electron";

// Listen for game updates from the main process
ipcRenderer.on("update-game", (event, gameState) => {
  // Update games UI using data in the gameState object
  //// For example, x,y positions can be passed to draw methods for appropriate class
});



console.log("render success");


