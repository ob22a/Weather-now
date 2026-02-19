import { createSlice } from '@reduxjs/toolkit';
import type { SearchResultItem } from '../../types/APIdata';
import { performLocationSearch } from './searchThunks';

interface SearchState {
  text: string;
  results: SearchResultItem[];
  isSearching: boolean;
  error: string | null;
}

const initialState: SearchState = {
  text: '',
  results: [],
  isSearching: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.results = [];
      state.text = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLocationSearch.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(performLocationSearch.fulfilled, (state, action) => {
        state.isSearching = false;
        state.text = action.payload.text;
        state.results = action.payload.results;
      })
      .addCase(performLocationSearch.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload ?? 'Search failed. Please try again.';
        state.results = [];
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
