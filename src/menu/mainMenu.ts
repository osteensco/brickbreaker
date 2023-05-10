import { createElement, cleanup } from "../utils/helpers";
import { ipcRenderer } from "electron";


export class mainMenu {
    private container: HTMLElement;
    private selectorString: string;
    private title: HTMLElement;
    private newGame: HTMLElement;
    private scores: HTMLElement;
    private settings: HTMLElement;

    constructor() {
        // console.log('main menu load')
        this.container = createElement('div', 'menu');
        this.selectorString = '.menu'
        this.title = this.createTitle();
        this.newGame = this.createButton('start-game', 'New Game', this.startGame);
        this.scores = this.createButton('nav-scores', 'High Scores', this.navScores);
        this.settings = this.createButton('nav-settings', 'Settings', this.navSettings);
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
        let title = createElement('h1','title', 'title', this.selectorString);
        title.appendChild(document.createTextNode('BRICK BREAKER!'))
        return title
    }



    private startGame(): void {
        ipcRenderer.send("game-start")
    }



    private navScores(): void {
        return
    }



    private navSettings(): void {
        return
    }    



    private cleanup(): void {
        cleanup('menu')
    }

    //TODO
        //write function for each button's action
        //import functions for each button's action

}

