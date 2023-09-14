





export let defaultSettings = {
    brickBaseHealth: 1,
    ballSpeed: 1,
    paddleSpeed: 1,
    extraLives: 3,
    paddleLeftControl: 'ArrowLeft',
    paddleRightControl: 'ArrowRight',
    paddleUsePowerControl: 'Space'
}

interface SettingsRow {
        default: number;
        brickBaseHealth: number;
        ballSpeed: number;
        paddleSpeed: number;
        extraLives: number;
        paddleLeftControl: string;
        paddleRightControl: string;
        paddleUsePowerControl: string;
    }

async function insertSettings(db: any, dfault: number) {
    return new Promise<void>((resolve, reject) => {
        const insertstatement = db.prepare(
            `
            INSERT INTO settings (
                dfault,
                brickBaseHealth,
                ballSpeed,
                paddleSpeed,
                extraLives,
                paddleLeftControl,
                paddleRightControl,
                paddleUsePowerControl
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `
        );
    
        insertstatement.run(
            dfault,
            defaultSettings.brickBaseHealth,
            defaultSettings.ballSpeed,
            defaultSettings.paddleSpeed,
            defaultSettings.extraLives,
            defaultSettings.paddleLeftControl,
            defaultSettings.paddleRightControl,
            defaultSettings.paddleUsePowerControl,
            (err: Error) => {
                if (err) {
                    console.error('Error inserting settings:', err.message);
                    reject(err);
                } else {
                    console.log('Settings inserted successfully.');
                    resolve();
                }
            }
        );
        
        insertstatement.finalize();
    });
}




export async function createSettingsTable(db: any) {
    return new Promise<void>((resolve, reject) => {
        db.run(
            `
            CREATE TABLE IF NOT EXISTS settings (
                dfault INTEGER PRIMARY KEY,
                brickBaseHealth REAL,
                ballSpeed REAL,
                paddleSpeed REAL,
                extraLives REAL,
                paddleLeftControl TEXT,
                paddleRightControl TEXT,
                paddleUsePowerControl TEXT
            )
            `,
            (err: Error) => {
                if (err) {
                    console.error('Error creating settings table:', err.message);
                    reject(err);
                } else {
                    console.log('settings table successfully or already exists.');
                    resolve();
                }
            }
        );
    });
}

export async function clearDefaultSettings(db: any) {
    return new Promise<void>((resolve, reject) => {
        db.run(
            `
            DELETE FROM settings WHERE dfault = 1
            `, 
            (err: Error) => {
                if (err) {
                    console.error('Error deleting default record:', err.message);
                    reject(err);
                } else {
                    console.log('Default record deleted successfully.');
                    resolve();
                }
            }
        );
    });

}


export async function setDefualtSettings(db: any) {
    await insertSettings(db, 1);
}

export async function setCurrentSettings(db: any) {
    return new Promise<void>((resolve, reject) => {
        db.get('SELECT * FROM settings WHERE dfault = 0', (err: Error, row: SettingsRow) => {
            if (err) {
              console.error('Error checking for current settings record:', err.message);
              reject(err);
            } else {
              if (!row) {
                insertSettings(db, 0);
              } else {
                console.log('Current settings record already exists.');
              }
              resolve();
            }
          });
    });
}

export async function createDefaultSettingsRecord(db: any) {
    await createSettingsTable(db);
    await clearDefaultSettings(db);
    await setDefualtSettings(db);
    await setCurrentSettings(db);
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



