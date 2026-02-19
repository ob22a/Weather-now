import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchLocations } from '../../apis/weatherApi';
import type { SearchResultItem } from '../../types/APIdata';

interface SearchPayload {
  text: string;
  results: SearchResultItem[];
}

export const performLocationSearch = createAsyncThunk<
  SearchPayload,
  string,
  { rejectValue: string }
>('search/performSearch', async (text, { rejectWithValue }) => {
  const trimmed = text.trim();
  if (!trimmed) {
    return { text: '', results: [] };
  }

  try {
    const response = await searchLocations(trimmed);
    return { text, results: response.results };
  } catch {
    return rejectWithValue('Search failed. Please try again.');
  }
});
