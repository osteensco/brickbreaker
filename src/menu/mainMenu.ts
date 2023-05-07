import { createElement } from "../utils/helpers";
import { ipcRenderer } from "electron";


export class mainMenu {
    private newGame: HTMLElement;
    private scores: HTMLElement;
    private settings: HTMLElement;

    constructor() {
        console.log('mainMenu obj created')
        this.newGame = this.createButton('start-game', 'New Game', this.startGame.bind(this));
        this.scores = this.createButton('nav-scores', 'High Scores', this.navScores.bind(this));
        this.settings = this.createButton('nav-settings', 'Settings', this.navSettings.bind(this));
    }



    private createButton(id: string, text: string, action: () => void): HTMLElement {
        let button = createElement('a', 'button', id);
        button.setAttribute('href', '#');
        button.addEventListener("click", action)
        button.appendChild(document.createTextNode(text));
        return button
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

    //TODO
        //write function for each button's action
        //import functions for each button's action

}

