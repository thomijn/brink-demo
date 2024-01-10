import { create } from 'zustand'
import { configOptions } from '../constants';

const useStore = create((set) => ({
    active: false,
    setActive: (active) => set({ active }),
    selectedColors: configOptions.map((option) => {
        return { id: option.id, color: option.color };
    }),
    setSelectedColors: (selectedColors) => set({ selectedColors }),
}))

export default useStore;