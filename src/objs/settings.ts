





export let defaultSettings = {
    brickBaseHealth: 1,
    ballSpeed: 1,
    paddleSpeed: 1,
    lives: 3,
    paddleLeftControl: 'ArrowLeft',
    paddleRightControl: 'ArrowRight',
    paddleUsePowerControl: ''
}

export class Settings {
    public readonly brickBaseHealth: number;
    public readonly ballSpeed: number;
    public readonly paddleSpeed: number;
    public lives: number;
    public readonly paddleLeftControl: string;
    public readonly paddleRightControl: string;
    public readonly paddleUsePowerControl: string;



    constructor(settingsMap: {[key: string]: number | string}) {
        this.brickBaseHealth = settingsMap['brickBaseHealth'] as number;
        this.ballSpeed = settingsMap['ballSpeed'] as number;
        this.paddleSpeed = settingsMap['paddleSpeed'] as number;
        this.lives = settingsMap['lives'] as number;
        this.paddleLeftControl = settingsMap['paddleLeftControl'] as string;
        this.paddleRightControl = settingsMap['paddleRightControl'] as string;
        this.paddleUsePowerControl = settingsMap['paddleUsePowerControl'] as string;
    }

    public change(property: number | string, newValue: number | string) {
        if (typeof property == typeof newValue) {
            property = newValue;
        } else {
            console.log(`${typeof property} != ${typeof newValue}`);
            // handle type errors    
        }
    }


}



