import { Settings } from "../objs/settings";
import { createElement, cleanup } from "../utils/helpers";
import { ipcRenderer } from "electron";



// renderer process



export class settingsMenu {
    private screenContainer: HTMLElement;
    private settingsContainer: HTMLElement;
    private selectorString: string;
    private title: HTMLElement;
    private mainMenuButton: HTMLElement;
    private settings: Settings;


    constructor(settings: Settings ) {
        this.selectorString = '.settings-menu'
        this.screenContainer = createElement('div', 'settings-menu');
        this.settingsContainer = createElement('div', 'settings-container', undefined, this.selectorString);
        this.title = this.createTitle();
        this.mainMenuButton = this.createButton('nav-main', 'Main Menu', this.navMain);
        this.screenContainer.appendChild(this.title);
        this.screenContainer.appendChild(this.mainMenuButton);
        this.settings = settings;
        this.createAllSettingInputs();

    }



    private createButton(id: string, text: string, action: () => void): HTMLElement {
        let button = createElement('a', 'button', id);
        button.setAttribute('href', '#');
        button.addEventListener("click", () => {
            action()
            this.cleanup()
        });
        button.appendChild(document.createTextNode(text));
        return button
    }



    private createTitle(): HTMLElement {
        let title = createElement('h1','alt-title', 'alt-title');
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
        const settingContainer = createElement('div', 'setting-row', undefined, '.settings-container');
        const label = createElement('label', 'setting-label');
        label.innerText = key;
        const input = createElement('input', 'setting-input') as HTMLInputElement;
        input.name = key;
        input.value = String(value);
        input.addEventListener('change', () => {
            this.handleSettingChange(key, input.value);
        });
        settingContainer.appendChild(label);
        settingContainer.appendChild(input);
        this.settingsContainer.appendChild(settingContainer); 
        input.addEventListener('input', () => {
            this.settings.change(key, input.value)
            console.log(`${key}: ${(this.settings as any)[key]}`) 
        });
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

