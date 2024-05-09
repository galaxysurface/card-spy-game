import {create} from 'zustand';

interface TimerState {
    time: number;
    setTime: (val: number) => void;
    isEnable: boolean;
    enabledFun: (val: boolean) => void; // Corrected return type to void
}

export const useTimerStore = create<TimerState>((set) => ({
  isEnable: false,
  enabledFun: (val) => set((state) => ({ isEnable: val })),
  time: 5,
  setTime: (val) => set((state) => ({ time: val}))
}));
