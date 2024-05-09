import {create} from 'zustand';

interface GameState {
  bears: number;
  isSwipingDone: boolean;
  swipingDone: (val: boolean) => void; // Corrected return type to void
}

export const useGameStore = create<GameState>((set) => ({
  bears: 0,
  isSwipingDone: false,
  swipingDone: (val) => set((state) => ({ isSwipingDone: val })),
}));
