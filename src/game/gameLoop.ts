import { ipcRenderer } from "electron";




// renderer process



function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {



    

    // display all game objects on the screen with updated gameState data
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const objName in gameObjects) {
        // console.log(`${gameObjects[objName].x},${gameObjects[objName].y}`);
        gameObjects[objName].draw();
    }


}






export function initGameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gameObjects: any): void {

    setInterval(() => {
        gameLoop(canvas, ctx, gameObjects);
      }, 16.7); // run game loop at 60 fps
}


