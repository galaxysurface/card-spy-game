import * as SQLite from 'expo-sqlite';
import { CategoryProps, PlayerProps, SetOfWOrdProps } from '../types/Props';


const DBNAME = 'database'
const VERSION = 'v99'

const db = SQLite.openDatabase(`${DBNAME+VERSION}`);

/**  initialize database */
export const initDatabase = () => {
    /** TABLE Players */
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Players (playerID INTEGER PRIMARY KEY AUTOINCREMENT,playerName TEXT NOT NULL);'
        );
    });
        /** TABLE Categorys */
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Categorys (categoryID INTEGER PRIMARY KEY AUTOINCREMENT,categoryName TEXT NOT NULL);'
        );
    });
    /** TABLE SetOfWords */
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS SetOfWords ( keyWordID INTEGER PRIMARY KEY AUTOINCREMENT, keyWord TEXT NOT NULL, categoryID INTEGER, FOREIGN KEY (categoryID) REFERENCES Categorys(categoryID) );'
        );
    });
};

/*

************************ PLAYERS **************************

*/

// CREATE NEW PLAYER
export const createNewPlayer = (playerName: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO Players (playerName) VALUES (?);', [playerName], (_, res) => {
                resolve(res.insertId); // Return the ID of the inserted row
            });
        });
    });
};

// SELECT ALL PLAYERS 
export const selectAllPlayers = (): Promise<PlayerProps[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Players;', [], (_, rows) => {
                resolve(rows.rows._array);
            });
        });
    });
};

// DELETE PLAYER BY ID 
export const deletePlayerByID = (playerID: number) => {
    return new Promise((resolve,reject) =>{
        db.transaction(tx => {
            tx.executeSql('DELETE FROM PLayers WHERE playerID = ?;', [playerID],(_,row)=>{
                console.log(row.insertId)
                resolve(row.insertId)
            });
        });
    })
};

export const deleteAllPlayer = async() =>{
    db.transaction((tx) =>{
        tx.executeSql('DELETE FROM Players')
    })
}

/*
************************ CATEGORYS **************************
*/

// CREATE NEW CATEGORY
export const createNewCategory = (categoryName: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO Categorys (categoryName) VALUES (?);', [categoryName], (_, res) => {
                resolve(res.insertId); 
            });
        });
    });
};

// SELECT ALL CATEGORYS 
export const selectAllCategorys = (): Promise<CategoryProps[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Categorys;', [], (_, rows) => {
                resolve(rows.rows._array);
            });
        });
    });
};

// DELETE CATEGORY BY ID 
export const deleteCategoryByID = (categoryID: number) => {
    return new Promise((resolve,reject) =>{
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Categorys WHERE categoryID = ?;', [categoryID],(_,row)=>{
                console.log(row.insertId)
                resolve(row.insertId)
            });
        });
    })
};

/*
************************ SET OF WORDS **************************
*/

// CREATE NEW WORD
export const createNewWord = (keyWord: string, categoryID: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO SetOfWords (keyWord, categoryId) VALUES (?, ?);',
                [keyWord, categoryID],
                (_, res) => {
                    resolve(res.insertId); 
                },
            );
        });
    });
};



// INSERT NEW KEYWORD
export const insertKeyWord = (keyWord: string, categoryID: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        try {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO SetOfWords (keyWord, categoryID) VALUES (?, ?);'
            ,[keyWord,categoryID],
        (_,res)=>{
            resolve(res.insertId)
        },
        (_,error) => {
            reject(error.message)
            console.log('Error while inserting:', error);
            return true
        }
        );
        })
            
        } catch (error) {
            console.log(error)
        }
            
    })
};


// SELECT ALL WORDS 
export const selectAllWords = (): Promise<SetOfWOrdProps[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM SetOfWords;', [], (_, rows) => {
                resolve(rows.rows._array);
            });
        });
    });
};

// DELETE WORD BY ID 
export const deleteWordById = (keyWordID: number) => {
    return new Promise((resolve,reject) =>{
        db.transaction(tx => {
            tx.executeSql('DELETE FROM SetOfWords WHERE keyWordID = ?;', 
            [keyWordID],
            (_,row)=>{
            
                resolve(row.insertId)
            },
            (_,error) => {
                reject(error.message)
                console.log('Error while inserting:', error);
                return true
            });
        });
    })
};


// SELECT ALL WORDS 
export const deleteAllWords = (): Promise<SetOfWOrdProps[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM SetOfWords;', [], (_, rows) => {
                resolve(rows.rows._array);
            });
        });
    });
};