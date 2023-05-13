import { ipcRenderer } from "electron";
import { Paddle } from "../objs/paddles";



// renderer process



function gameLoop(ctx: CanvasRenderingContext2D, gameObjects: any): void {




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

export function initGameLoop(ctx: CanvasRenderingContext2D): void {
    
    
    
    // let gameState = defaultGameState;
    let objects = {
        player: new Paddle(100,200, 25, 7, 2),

    }
   
    


    setInterval(() => {
        gameLoop(ctx, objects);
      }, 16.7); // run game loop at 60 fps
}


