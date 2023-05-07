//helper functions
export function randomNumberBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export function createElement(type: string = "div", className: string, id?: string, parentSelector?: string) {
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
    }
    document.body.appendChild(elem)

}

export function cleanup(className?: string, id?: string) {

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


