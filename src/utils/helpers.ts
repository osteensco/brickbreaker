
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





