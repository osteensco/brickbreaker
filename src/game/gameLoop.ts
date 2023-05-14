import { ipcRenderer } from "electron";




// renderer process



function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {




    // display all game objects on the screen with updated gameState data
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const objName in gameObjects) {
        console.log(`${gameObjects[objName].x},${gameObjects[objName].y}`);
        gameObjects[objName].draw(ctx);
    }
    
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

export function initGameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {



    setInterval(() => {
        gameLoop(canvas, ctx, gameObjects);
      }, 16.7); // run game loop at 60 fps
}


