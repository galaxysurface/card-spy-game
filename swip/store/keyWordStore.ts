import { create } from "zustand";
import { CategoryProps, SetOfWOrdProps } from "../types/Props";
import { insertKeyWord as dbInsertKeyWord, 
    deleteWordById as dbDeleteWordById, 
    initDatabase, 
    selectAllWords } from "../database/db";
import { generateRandomKeyWord, generateRandomKeyWord2 } from "../utils/utils";

interface KeyWordStore {
    keywords: SetOfWOrdProps[],
    keyWordByCategroy: SetOfWOrdProps[],
    fetchKeyWords: () => void,
    addKeyword: (categoryName: string, categoryId) => void,
    removeKeywordByid: (id: number) => void,
    filterKeyword: (categoryId: number) => void,
    generate: (keywordList: SetOfWOrdProps[]) => void,
    getFinalKeyWord: string ,
}


export const useKeyWordStore = create<KeyWordStore>((set,get)=> ({
    keywords: [],
    keyWordByCategroy: [],
    getFinalKeyWord: null,
    fetchKeyWords: () => {
        selectAllWords().then((data) => {
            set({keywords: data})
        })
    },
    addKeyword: (keyword: string, categoryId) => {
        console.log(categoryId)
        dbInsertKeyWord(keyword, categoryId).then((insertId) => {
            set({
                keyWordByCategroy: [...get().keyWordByCategroy, {
                    keyWordID: insertId,
                    keyWord: keyword,
                    categoryID: categoryId
                }]
            })
        })
    },
    filterKeyword: (categoryId) => {
        selectAllWords().then((data) => {
            const filterByCategory = data.filter((item) => item.categoryID === categoryId)
            set({keyWordByCategroy: filterByCategory})
        })
  
    },
    removeKeywordByid: (id) => {
        dbDeleteWordById(id).then((insertId)=>{
            console.log('insertId :' , insertId)
            const data = get().keyWordByCategroy.filter((item)=> item.keyWordID !== id)
            set({keyWordByCategroy: data})
        })
    },
    generate: (keywordList) =>{

    }
}))

// Initialize the database
initDatabase()

