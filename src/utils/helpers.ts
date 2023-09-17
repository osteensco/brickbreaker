
//helper functions



export function randomNumberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min
}



export function createElement(type: string, className: string, id?: string, parentSelector?: string): HTMLElement | HTMLCanvasElement {
    let elem = document.createElement(type)
    elem.classList.add(className)
    if (id) {
        elem.setAttribute("id", id);
      }
    if (parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (parent) {
            parent.appendChild(elem);
        } else {
            console.error(`Parent element with selector '${parentSelector}' not found.`);
        }
    } else {
        document.body.appendChild(elem);
      }

    return elem
}



export function cleanup(className?: string, id?: string): void {

    let selector = ''
    if (id) {
        selector += `#${id}`
    }
    if (className) {
        selector += `.${className}`
    }
    
    try {
        document.querySelectorAll(selector).forEach(i => {i.remove()})
    } catch (error) {
        console.log((`At least an id or className has to be provided. ${error}`))
    }

}



export function createCanvas(): HTMLCanvasElement {
    const canvas = createElement('canvas', 'game-canvas', 'game-canvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    return canvas
}



export function getCanvasContext(): CanvasRenderingContext2D {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    return ctx
}



export function updateSize(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}



export function displayGameMessage(message: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {

    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    // let messageSize = ctx.measureText(message)
    // ctx.clearRect(canvas.width / 2, canvas.height / 2, messageSize.width, messageSize.fontBoundingBoxAscent)
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);

  }



export function displayGame(game: any, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    // display all game objects on the screen with updated movements/collisions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const objName in game.objs) {
        game.objs[objName].draw();
    }
}



export function startMessageTimer(game: any) {
    game.message.show = true;

    // clear any existing timer
    if (game.message.timer) {
    clearTimeout(game.message.timer);
    }

    // start timer and hide the message after the duration
    game.message.timer = setTimeout(() => {
    game.message.show = false;
    game.message.timer = null;
    }, game.message.duration);
}



export function drawBall(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}



