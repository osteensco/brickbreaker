import { ipcRenderer } from "electron";
import { Level } from "./levelBuilder";
import { lvl_1 } from "./levels";
import { Brick } from "../objs/bricks";
import { displayGameMessage } from "../utils/helpers";




// renderer process



function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {

    
    // check if the current level is empty or if it's the start of the game
    if (!gameObjects.level || gameObjects.level.bricks.length === 0) {
        displayGameMessage('Level 1', canvas, ctx);
        gameObjects.level = new Level(lvl_1, canvas, ctx);
    }

    if (gameObjects.ball.despawn) {
        displayGameMessage('Ball Lost!', canvas, ctx);
    }

    for (const b in gameObjects.level.bricks) {
        const brick = gameObjects.level.bricks[b]
        
        gameObjects.level.bricks = gameObjects.level.bricks.filter((brick: Brick) => !brick.destroyed);
        
        gameObjects.ball.collideWithBrick(brick)
    }

    // display all game objects on the screen with updated gameState data
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const objName in gameObjects) {
        gameObjects[objName].draw();
    }
    

}






export function initGameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {

    setInterval(() => {
        gameLoop(canvas, ctx, gameObjects);
      }, 16.7); // run game loop at 60 fps
}


