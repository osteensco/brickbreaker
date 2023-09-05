





export let defaultSettings = {
    brickBaseHealth: 0,
    ballSpeed: 0,
    paddleSpeed: 0,
    paddleLeftControl: '',
    paddleRightControl: '',
    paddleUsePowerControl: ''
}

export class Settings {
    private readonly brickBaseHealth: number;
    private readonly ballSpeed: number;
    private readonly paddleSpeed: number;
    private readonly paddleLeftControl: string;
    private readonly paddleRightControl: string;
    private readonly paddleUsePowerControl: string;



    constructor(settingsMap: {[key: string]: number | string}) {
        this.brickBaseHealth = settingsMap['brickBaseHealth'] as number;
        this.ballSpeed = settingsMap['ballSpeed'] as number;
        this.paddleSpeed = settingsMap['paddleSpeed'] as number;
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



