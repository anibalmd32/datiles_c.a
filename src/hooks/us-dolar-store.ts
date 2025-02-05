import { create } from 'zustand'

type State = {
    dolarPrice: string | null;
    getDolarPrice: () => Promise<void>;
}

export const useDolarStore = create<State>((set) => ({
    dolarPrice: null,
    getDolarPrice: async () => {
        const res = await fetch('https://pydolarve.org/api/v1/dollar?page=bcv');
        const data = await res.json();
        const { price } = data.monitors['usd'];

        set((state) => ({
            ...state,
            dolarPrice: price,
        }));
    },
}));

