import { BrowserWindow, ipcMain } from "electron";
// import { mainWindow } from "../utils/window";



function gameLoop(mainWindow: BrowserWindow): void {
    // Initialize game state
    // let gameState: Object;

            // Update game state
            
    console.log("Loop running");
            // gameState = {
            //     player: {
            //       x: 10,
            //       y: 20,
            //       health: 100,
            //       score: 0
            //     },
            //     enemies: [
            //       {
            //         x: 50,
            //         y: 100,
            //         health: 50
            //       },
            //       {
            //         x: 200,
            //         y: 150,
            //         health: 75
            //       }
            //     ]
            //   };
              

            // ipcRenderer.send("update-game", /* game state */);

}

export function initGameLoop(window: BrowserWindow): void {

    setInterval(() => {
        gameLoop(window);
      }, 16.7); // run game loop at 60 fps
}

