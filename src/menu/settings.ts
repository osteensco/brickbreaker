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
    private applyDefaultSettings: HTMLElement;
    private settings: Settings;


    constructor(settings: Settings ) {
        this.selectorString = '.menu'
        this.screenContainer = createElement('div', 'menu');
        this.settingsContainer = createElement('div', 'container', 'settings-container', this.selectorString);
        this.title = this.createTitle();
        this.mainMenuButton = this.createButton('nav-main', 'Main Menu', this.navMain);
        this.applyDefaultSettings = this.createButton('apply-default-settings', 'Set to Default', this.applyDefault);
        this.screenContainer.appendChild(this.title);
        this.screenContainer.appendChild(this.mainMenuButton);
        this.screenContainer.appendChild(this.applyDefaultSettings);
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
        const settingContainer = createElement('div', 'setting-row', undefined, '#settings-container');
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
        
        const valueType = typeof value;
        switch (valueType) {
            case 'number':
                input.type="number";
                input.addEventListener('input', () => {
                    this.settings.change(key, value);
                });
                break;
            case 'string':
                input.readOnly = true;
                input.addEventListener('keydown', (event) => {
                    event.preventDefault();
                    const keyCode = event.code;
                    input.value = keyCode;
                    this.settings.change(key, event.code);
                  });
                  break;
        }
        
    }



    private handleSettingChange(key: string, newValue: string): void {
        
        this.settings.change(key, newValue);
        
    }



    private navMain(): void {
        ipcRenderer.send("load-menu")
    }

    private applyDefault(): void {
        ipcRenderer.send("apply-default-settings")
    }


    private cleanup(): void {
        cleanup('menu')
    }



}

