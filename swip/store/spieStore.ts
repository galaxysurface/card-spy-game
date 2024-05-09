import {create} from 'zustand';

interface GameState {
  spie: number;
  increaseSpie: () => void; // Corrected return type to void
  decreaseSpie: () => void; // Corrected return type to void
  resetSpie: () => void;
}

export const useSpieStore = create<GameState>((set) => ({
  spie: 1,
  increaseSpie: ()=> set((state)=>({spie: state.spie + 1})),
  decreaseSpie: ()=> set((state)=>(
    {spie: state.spie < 0 ? state.spie - 1 : 1}
  )),
  resetSpie: () => set(()=>({spie: 1}))

}));
