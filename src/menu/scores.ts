import { createElement, cleanup } from "../utils/helpers";
import { ipcRenderer } from "electron";



// renderer process



export class scoresMenu {
    private container: HTMLElement;
    private selectorString: string;
    private title: HTMLElement;
    private mainMenu: HTMLElement;


    constructor() {
        this.container = createElement('div', 'scores-menu');
        this.selectorString = '.scores-menu'
        this.title = this.createTitle();
        this.mainMenu = this.createButton('nav-main', 'Main Menu', this.navMain);

    }



    private createButton(id: string, text: string, action: () => void): HTMLElement {
        let button = createElement('a', 'button', id, this.selectorString);
        button.setAttribute('href', '#');
        button.addEventListener("click", () => {
            action()
            this.cleanup()
        });
        button.appendChild(document.createTextNode(text));
        return button
    }



    private createTitle(): HTMLElement {
        let title = createElement('h1','alt-title', 'alt-title', this.selectorString);
        title.appendChild(document.createTextNode('High Scores'))
        return title
    }



    private navMain(): void {
        ipcRenderer.send("load-menu")
    }


    private cleanup(): void {
        cleanup('scores-menu')
    }



}

