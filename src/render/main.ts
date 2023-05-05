


// renderer process



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
console.log(API.test.stuff);

// @ts-expect-error
API.listeners.onWindowSize((winSize) => {
  console.log(`Window size: ${winSize.width}x${winSize.height}`);
});
// @ts-expect-error
API.game.init()










