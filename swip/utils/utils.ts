import { SetOfWOrdProps } from "../types/Props";


export const filterKeywordByCategoryID = (keyWords: SetOfWOrdProps[], categoryId)=>{
    console.log(keyWords[0].categoryID)
    try {
        const data = keyWords.filter((item)=> item.categoryID == categoryId)
        return data
    } catch (error) {
        return error
    }
}


function generateRandom(items) {
    const shuffleArray = (array) => {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };
  
    const shuffledItems = shuffleArray(items);
  
    return shuffledItems;
  }
  
  
  // GENERET RANDOM KEYWORD FROM A LIST 
  export const generateRandomKeyWord = (items) => {
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // Shuffle the items
    const shuffledItems = shuffleArray(items);

    return shuffledItems;
};

// GENERET RANDOM KEYWORD FROM A LIST 
export const newGenerateRandomKeyWord = (items) => {
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // Shuffle the items
    const shuffledItems = shuffleArray(items);

    // Return a random item from the shuffled array
    const randomIndex = Math.floor(Math.random() * shuffledItems.length);
    return shuffledItems[randomIndex];
};



// GENERATE RANDOM KEYWORD FROM A LIST 
export const generateRandomKeyWord2 = (items) => {
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // Shuffle the items using an optimized version of Fisher-Yates algorithm
    const shuffleOptimized = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i); // Generate random index directly from i to 0
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // Shuffle the items using the optimized algorithm
    const shuffledItems = shuffleOptimized(items);

    return shuffledItems;
};

