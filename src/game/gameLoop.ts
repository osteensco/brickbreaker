import { ipcRenderer } from "electron";
import { Paddle } from "../objs/paddles";
import { Ball } from "../objs/balls";



// renderer process



function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {




    // display all game objects on the screen with updated gameState data
    for (const objName in gameObjects) {
        gameObjects[objName].draw(ctx);
    }
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

export function initGameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {
    
    
    

   
    


    setInterval(() => {
        gameLoop(canvas, ctx, gameObjects);
      }, 16.7); // run game loop at 60 fps
}


