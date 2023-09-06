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
        this.createAllSettingInputs();

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



    private createAllSettingInputs(): void {

        for (const key in this.settings.map) {
            if (this.settings.map.hasOwnProperty(key)) {
                
                const value = this.settings.map[key];
                this.createSettingInput(key, value)
            }
        }
        
    }



    private createSettingInput(key: string, value: number | string): void {
        const settingContainer = createElement('div', 'setting-container', undefined, this.selectorString);
        const label = createElement('label', 'setting-label', undefined, undefined);
        label.innerText = key;
        const input = createElement('input', 'setting-input', undefined, undefined) as HTMLInputElement;
        input.name = key;
        input.value = String(value);
        input.addEventListener('change', () => {
            this.handleSettingChange(key, input.value);
        });
        settingContainer.appendChild(label);
        settingContainer.appendChild(input);
        this.container.appendChild(settingContainer); 
    }



    private handleSettingChange(key: string, newValue: string): void {
        
        this.settings.change(key, newValue);
        // TODO:
        //  Save to database
    }



    private navMain(): void {
        ipcRenderer.send("load-menu")
    }


    private cleanup(): void {
        cleanup('settings-menu')
    }



}

