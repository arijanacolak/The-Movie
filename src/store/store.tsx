import create from "zustand";

interface State {
  searchTerm: string;
  selectedTab: string;
  gridItems: any[];
  setGridItems: (items: any[]) => void;
  filteredItems: any[];
  setFilteredItems: (items: any[]) => void;
  selectedMovie: any | null;
  setSelectedMovie: (movie: any) => void;
}

export const useStore = create<State>((set) => ({
  searchTerm: "",
  selectedTab: "movies",
  gridItems: [],
  setGridItems: (items) => set({ gridItems: items }),
  filteredItems: [],
  setFilteredItems: (items) => set({ filteredItems: items }),
  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));
