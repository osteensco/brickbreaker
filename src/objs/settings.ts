





export let defaultSettings = {
    // TODO
    // read settings from database
    brickBaseHealth: 1,
    ballSpeed: 1,
    paddleSpeed: 1,
    extraLives: 3,
    paddleLeftControl: 'ArrowLeft',
    paddleRightControl: 'ArrowRight',
    paddleUsePowerControl: 'Space'
}

export class Settings {
    public readonly brickBaseHealth: number;
    public readonly ballSpeed: number;
    public readonly paddleSpeed: number;
    public extraLives: number;
    public readonly paddleLeftControl: string;
    public readonly paddleRightControl: string;
    public readonly paddleUsePowerControl: string;
    public readonly map: {[key: string]: number | string};


    constructor(settingsMap: {[key: string]: number | string}) {
        this.brickBaseHealth = settingsMap['brickBaseHealth'] as number;
        this.ballSpeed = settingsMap['ballSpeed'] as number;
        this.paddleSpeed = settingsMap['paddleSpeed'] as number;
        this.extraLives = settingsMap['extraLives'] as number;
        this.paddleLeftControl = settingsMap['paddleLeftControl'] as string;
        this.paddleRightControl = settingsMap['paddleRightControl'] as string;
        this.paddleUsePowerControl = settingsMap['paddleUsePowerControl'] as string;
        this.map = this.toDictionary();
    }

    public change(this: Settings, property: number | string, newValue: number | string) {
        
        const property_type = typeof (this as any)[property];

        switch (property_type) {
            case 'number':
                
                (this as any)[property] = Number(newValue);
                (defaultSettings as any)[property] = Number(newValue);
                break;
            case 'string':
                (this as any)[property] = String(newValue);
                (defaultSettings as any)[property] = String(newValue);
                break;
            default:
                console.error(`${property} is of type ${property_type} not number or string`)
        }
            
    }

    public toDictionary(): { [key: string]: number | string } {
        const dictionary: { [key: string]: number | string } = {};

        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                dictionary[key] = this[key] as number | string;
            }
        }

        return dictionary;
    }


}



