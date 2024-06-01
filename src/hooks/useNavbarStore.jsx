import create from 'zustand';

const useNavBarStore = create((set) => ({
    showNavBar: true,
    setShowNavBar: (show) => set({ showNavBar: show }),
    excludeLoading: () => set({ showNavBar: false }),
}));

export default useNavBarStore;