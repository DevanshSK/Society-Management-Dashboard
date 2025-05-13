import { create } from 'zustand';
import type { Flat } from '../types';
import { initialFlats } from '../data';

interface FlatState {
    flats: Flat[];
    loading: boolean;
    loadFlats: () => void;

    addOpen: boolean;
    setAddOpen: (value: boolean) => void;

    isEditing: boolean;
    editingFlat: Flat | null;
    setEditingFlat: (flat: Flat | null) => void;

    getFlatById: (id: string) => Flat | undefined;
    addFlat: (flat: Flat) => void;
    updateFlat: (id: string, updatedFlat: Flat) => void;
    deleteFlat: (id: string) => void;
    getOccupiedFlats: () => Flat[];
    getAvailableFlats: () => Flat[];
    resetFlats: () => void;
}

const useFlatStore = create<FlatState>((set, get) => ({
    flats: [],
    loading: false,
    addOpen: false,

    setAddOpen: (value) => set({ addOpen: value }),

    isEditing: false,
    editingFlat: null,
    setEditingFlat: (flat) => {
        set({
            editingFlat: flat, isEditing: !!flat,
        })
    },

    loadFlats: () => {
        set({ loading: true });
        setTimeout(() => {
            set({ flats: initialFlats, loading: false });
        }, 500);
    },
    getFlatById: (id: string) => get().flats.find((f) => f.id === id),
    addFlat: async (flat) => {
        set({ loading: true })
        await new Promise((resolve) => setTimeout(resolve, 400));
        set((state) => ({
            flats: [...state.flats, flat],
            loading: false,
        }));
    },
    updateFlat: async (id, updatedFlat) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 400));
        set((state) => ({
            flats: state.flats.map((f) => (f.id === id ? { ...f, ...updatedFlat } : f)),
            editingFlat: null,
            isEditing: false,
            loading: false,
        }));
    },
    deleteFlat: async (id) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 400));
        set((state) => ({
            flats: state.flats.filter((f) => f.id !== id),
            loading: false,
        }))
    },
    resetFlats: () => {
        set({ flats: [], loading: false });
    },
    getOccupiedFlats: () => get().flats.filter(f => f.occupied),
    getAvailableFlats: () => get().flats.filter(f => !f.occupied),
}));

export default useFlatStore;

