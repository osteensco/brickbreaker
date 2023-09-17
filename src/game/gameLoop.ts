import { ipcRenderer } from "electron";
import { Level } from "./levelBuilder";
import { Brick } from "../objs/bricks";
import { cleanup, displayGame, displayGameMessage, startMessageTimer } from "../utils/helpers";
import { Ball } from "../objs/balls";
import { Paddle } from "../objs/paddles";
import { updateHighScores } from "../objs/score";


// renderer process



function gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: any): void {

    if (!game.objs.player) {
        game.objs.player = new Paddle(canvas, ctx, game);
    }
    // check if the current level is empty or if it's the start of the game
    if (!game.objs.level || game.objs.level.bricks.length === 0) {
        startMessageTimer(game);
        if (game.current_level < game.level_map.length) {
            if (game.current_level != 0) {
                game.objs.score.update(1500);
            }
            game.current_level += 1;
        } else {
            game.current_level = 1;
            game.objs.score.update(3000);
        }
        game.message.text = `Level ${game.current_level}`;
        game.objs.level = new Level(game.current_level.toString(), game.level_map[game.current_level-1], canvas, ctx, game);
        game.objs.ball = new Ball(game.objs.player, canvas, ctx, game);
    }

    // check if ball has fallen off screen
    if (game.objs.ball.despawn && !game.message.timer && !game.over) {
        startMessageTimer(game);
        game.objs.score.update(-1000);
        if (game.objs.player.lives > 0) {
            game.message.text = 'Ball Lost!';
            game.objs.ball = new Ball(game.objs.player, canvas, ctx, game);
            game.objs.player.lives -= 1;
        } else {
            game.message.text = 'Game Over';
            game.over = true;
        }
        
    }

    // manage brick array and check brick collisions
    game.objs.level.bricks = game.objs.level.bricks.filter((brick: Brick) => !brick.destroyed);
    for (const b in game.objs.level.bricks) {
        const brick = game.objs.level.bricks[b]
       if (game.objs.ball.collideWithBrick(brick)) {
        game.objs.score.update(100);
        break
       }
    }

    // checks if game should pause to display a message
    if (!game.message.show) {
        displayGame(game, canvas, ctx);
        // when game is over clear canvas, end game loop, update highscores table, and return to main menu
        if (game.over) {
            cleanup('game-canvas')
            ipcRenderer.send("update-highscores", parseInt(game.objs.score.score));
            game.run = false;
            ipcRenderer.send("load-menu");
        }
    } else {
        displayGame(game, canvas, ctx);
        displayGameMessage(game.message.text, canvas, ctx);
    }


    // continue running game
    if (game.run) {
        requestAnimationFrame(() => {
            gameLoop(canvas, ctx, game);
        });
    }





}






export function initGameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: any): void {

    requestAnimationFrame(() => {
        gameLoop(canvas, ctx, game);
      });
}


