import create from "zustand";

type SearchTermStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useSearchTermStore = create<SearchTermStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
