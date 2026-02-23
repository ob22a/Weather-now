import { useCallback, useMemo, useState } from 'react';
import searchButton from '../../assets/images/icon-search.svg';
import SearchResult from './SearchResult';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { performLocationSearch } from '../../features/search/searchThunks';
import { selectSearchResult } from '../../features/weather/weatherThunks';
import { debounce } from '../../utils/debounce';

const Search = () => {
  const dispatch = useAppDispatch();
  const { results, isSearching } = useAppSelector((state) => state.search);
  const [query, setQuery] = useState<string>('');

  const debouncedSearch = useMemo(() => {
    const fn = (value: string) => {
      void dispatch(performLocationSearch(value));
    };
    return debounce(fn as (...args: unknown[]) => void, 400);
  }, [dispatch]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (query.trim()) {
        void dispatch(performLocationSearch(query));
      }
    },
    [dispatch, query],
  );

  return (
    <form role="search" className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <img src={searchButton} alt="Search icon" />
        <input
          placeholder="Search for a place..."
          className="search-box"
          value={query}
          onChange={handleChange}
        />
      </div>
      <SearchResult
        isSearching={isSearching}
        results={results}
        onSelect={(item) => {
          void dispatch(selectSearchResult(item));
          setQuery('');
        }}
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
