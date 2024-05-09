import { create } from "zustand";
import { CategoryProps } from "../types/Props";
import { createNewCategory as dbCreateNewCategory, initDatabase, selectAllCategorys } from "../database/db";

interface CategoryStore {
    category: CategoryProps[],
    setCategory: () => void,
    addCategory: (categoryName: string) => void,
    removeCategory: () => void,
}

// setCategory: (category: CategoryProps[]) => void,

export const useCatgeoryStore = create<CategoryStore>((set,get)=> ({
    category: [],
    setCategory: () => {
        selectAllCategorys().then((category) => {
            set({
                category
            })
        })
    },
    addCategory: (categoryName: string) => {
        const category = get().category
        dbCreateNewCategory(categoryName).then((id) => {
            set({
                category: [...get().category,{categoryID: id,categoryName: categoryName}]
            })
        })
    },
    removeCategory: () => {}
}))

// Initialize the database
initDatabase()

