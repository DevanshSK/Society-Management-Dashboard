import { create } from "zustand";

interface SidebarState {
    open: boolean;
    showDrawer: () => void;
    closeDrawer: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
    open: false,
    showDrawer: () => {
        set({ open: true });
    },
    closeDrawer: () => {
        set({open: false});
    }
}));

export default useSidebarStore;