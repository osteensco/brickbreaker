import { Settings } from "../objs/settings";
import { createElement, cleanup } from "../utils/helpers";
import { ipcRenderer } from "electron";



// renderer process



export class settingsMenu {
    private container: HTMLElement;
    private selectorString: string;
    private title: HTMLElement;
    private mainMenu: HTMLElement;
    private settings: Settings;


    constructor(settings: Settings ) {
        this.container = createElement('div', 'settings-menu');
        this.selectorString = '.settings-menu'
        this.title = this.createTitle();
        this.mainMenu = this.createButton('nav-main', 'Main Menu', this.navMain);
        this.settings = settings;

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
        title.appendChild(document.createTextNode('Settings'))
        return title
    }



    private navMain(): void {
        ipcRenderer.send("load-menu")
    }


    private cleanup(): void {
        cleanup('settings-menu')
    }



}

