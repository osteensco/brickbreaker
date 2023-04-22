// import { ipcRenderer } from "electron";



// Listen for game updates from the main process
// ipcRenderer.on("update-game", (event, gameState) => {
  // Update games UI using data in the gameState object
  //// For example, x,y positions can be passed to draw methods for appropriate class
// });

// window.postMessage({
//     myTypeField: 'update-game',
//     // someData: 123,
//   });

console.log("render success");

// @ts-expect-error
console.log(API.test.stuff)
// @ts-expect-error
API.gameLoop.init({myTypeField: 'start-game'})


