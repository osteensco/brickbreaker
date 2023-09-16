import { ipcMain, ipcRenderer } from "electron";



// renderer process





export interface SettingsRow {
    dfault: number;
    brickBaseHealth: number;
    ballSpeed: number;
    paddleSpeed: number;
    extraLives: number;
    paddleLeftControl: string;
    paddleRightControl: string;
    paddleUsePowerControl: string;
}



export const defaultSettings: SettingsRow =  {
    dfault: 1,
    brickBaseHealth: 1,
    ballSpeed: 1,
    paddleSpeed: 1,
    extraLives: 3,
    paddleLeftControl: 'ArrowLeft',
    paddleRightControl: 'ArrowRight',
    paddleUsePowerControl: 'Space'
}



export async function insertSettings(db: any, dfault: number, defaultSettings: SettingsRow) {
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
                    let settings_type: string;
                    switch (dfault) {
                        case 0: 
                            settings_type = 'Current'; 
                        case 1: 
                            settings_type = 'Default'; 
                        console.log(`${settings_type} settings inserted successfully`);
                        console.log(dfault)
                    }
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
                    console.log('Settings table initialized');
                    resolve();
                }
            }
        );
    });
}



export async function clearSettingsRow(db: any, dfault: number) {
    return new Promise<void>((resolve, reject) => {
        db.run(
            `
            DELETE FROM settings WHERE dfault = ?
            `, 
            [dfault],
            (err: Error) => {
                if (err) {
                    console.error('Error deleting default record:', err.message);
                    reject(err);
                } else {
                    let settings_type: string;
                    switch (dfault) {
                        case 0: 
                            settings_type = 'Current'; 
                        case 1: 
                            settings_type = 'Default'; 
                        console.log(`${settings_type} settings cleared successfully`);
                    }
                    resolve();
                }
            }
        );
    });

}



export async function setDefualtSettings(db: any) {
    await insertSettings(db, 1, defaultSettings);
}



export async function setCurrentSettings(db: any, defaultSettings: SettingsRow) {
    return new Promise<void>(async (resolve, reject) => {
        let appSettings: SettingsRow;
        try {
            const row = await getSettingsRow(db, 0);
            
            if (!row) {
                // If the record doesn't exist, insert it
                await insertSettings(db, 0, defaultSettings);
                console.log('Default settings applied to current settings')
            } else {
                console.log('Current settings already exists, sending to renderer');
                appSettings = {
                    dfault: row.dfault,
                    brickBaseHealth: row.brickBaseHealth,
                    ballSpeed: row.ballSpeed,
                    paddleSpeed: row.paddleSpeed,
                    extraLives: row.extraLives,
                    paddleLeftControl: row.paddleLeftControl,
                    paddleRightControl: row.paddleRightControl,
                    paddleUsePowerControl: row.paddleUsePowerControl
                }

            }
            
            ipcMain.on('get-current-settings', async (event) => {
                event.sender.send('current-settings', appSettings);
            });
    
            resolve();
        } catch (err) {
                console.error('Error setting current settings:', (err as Error).message);
                reject(err);
        }
    });
}
  
export function getSettingsRow(db: any, dfault: number): Promise<SettingsRow | null> {
    return new Promise<SettingsRow | null>((resolve, reject) => {
        db.get('SELECT * FROM settings WHERE dfault = ?', [dfault], (err: Error, row: SettingsRow) => {
            if (err) {
                reject(err);
            } else {
                resolve(row || null);
            }
        });
    });
}
  
  
  



export async function createDefaultSettingsRecord(db: any, defaultSettings: SettingsRow) {
    await createSettingsTable(db);
    await clearSettingsRow(db, 1);
    await setDefualtSettings(db);
    await setCurrentSettings(db, defaultSettings);
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



    constructor(settingsMap: SettingsRow) {
        this.brickBaseHealth = settingsMap.brickBaseHealth;
        this.ballSpeed = settingsMap.ballSpeed;
        this.paddleSpeed = settingsMap.paddleSpeed;
        this.extraLives = settingsMap.extraLives;
        this.paddleLeftControl = settingsMap.paddleLeftControl;
        this.paddleRightControl = settingsMap.paddleRightControl;
        this.paddleUsePowerControl = settingsMap.paddleUsePowerControl;
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

        ipcRenderer.send('update-setting', property, newValue)
        

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



