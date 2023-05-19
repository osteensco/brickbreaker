import { ipcRenderer } from "electron";
import { Level } from "./levelBuilder";
import { lvl_1 } from "./levels";
import { Brick } from "../objs/bricks";
import { displayGameMessage, startMessageTimer } from "../utils/helpers";
import { Ball } from "../objs/balls";



// renderer process



function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: any): void {

    
    // check if the current level is empty or if it's the start of the game
    if (!game.level || game.level.bricks.length === 0) {
        startMessageTimer(game);
        game.message.text = 'Level 1';
        game.level = new Level(lvl_1, canvas, ctx);
    }

    // check if ball has fallen off screen
    if (game.ball.despawn && !game.message.timer) {
        startMessageTimer(game);
        game.message.text = 'Ball Lost!';
        game.ball = new Ball(game.player, canvas, ctx);
    }

    // manage brick array and check collisions
    game.level.bricks = game.level.bricks.filter((brick: Brick) => !brick.destroyed);
    for (const b in game.level.bricks) {
        const brick = game.level.bricks[b]
       if (game.ball.collideWithBrick(brick)) {
        break
       }
    }

    // checks if game should pause to display a message
    if (!game.message.show) {
        // display all game objects on the screen with updated gameState data
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const objName in game) {
            game[objName].draw();
        }
    } else {
        displayGameMessage(game.message.text, canvas, ctx)
    }



    requestAnimationFrame(() => {
        gameLoop(canvas, ctx, game);
    });
    
}






export function initGameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: any): void {

    requestAnimationFrame(() => {
        gameLoop(canvas, ctx, game);
      }); // run game loop at 60 fps
}


