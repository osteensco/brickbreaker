import { createElement, cleanup } from "../utils/helpers";
import { ipcRenderer } from "electron";



// renderer process



export interface highscores {
    rank: number,
    score: number
}



export async function getHighScores(db:any): Promise<highscores[]>{
    return new Promise<Array<highscores>>((resolve, reject) => {
        db.all('SELECT RANK() OVER(ORDER BY score DESC) rank, score FROM highscores ORDER BY score DESC LIMIT 10', (err:Error, rows:highscores[]) => {
            if (err) {
            reject(err);
            } else {
            resolve(rows);
            }
        });
    });
}







export class scoresMenu {
    private screenContainer: HTMLElement;
    private selectorString: string;
    private title: HTMLElement;
    private mainMenu: HTMLElement;
    private scores: Array<highscores>;


    constructor(highscores: Array<highscores>) {
        this.scores = highscores;
        this.screenContainer = createElement('div', 'menu');
        this.selectorString = '.menu'
        this.title = this.createTitle();
        this.mainMenu = this.createButton('nav-main', 'Main Menu', this.navMain);
        this.displayScores();
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



    private displayScores(): void {

        createElement('div', 'container', 'scores-container', this.selectorString);
        
        if (this.scores) {

            createElement('ul', 'scores-list', undefined, '#scores-container');
            this.scores.forEach((score) => {
                let scoreitem = createElement('li', 'score-item', undefined, '.scores-list');
                scoreitem.textContent = `${score.rank}: ${score.score}`;
            });

        } else {

            createElement('h2', 'no-scores', undefined, '#scores-container').appendChild(document.createTextNode('No Scores Available'))
        
        }

    }



    private navMain(): void {
        ipcRenderer.send("load-menu")
    }


    private cleanup(): void {
        cleanup('menu')
    }



}

