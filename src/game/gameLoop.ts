import { BrowserWindow, ipcMain } from "electron";



export function gameLoop(mainWindow: BrowserWindow): void {
    // Initialize game state
    let gameState: Object;

    ipcMain.on("start-game-loop", (event, arg) => {
        function loop() {
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
              

            mainWindow.webContents.send("update-game", /* game state */);

            // Request next frame
            requestAnimationFrame(loop);
        }

        // Start game loop
        requestAnimationFrame(loop);
    });
}


