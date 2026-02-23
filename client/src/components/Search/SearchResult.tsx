import searchLogo from '../../assets/images/icon-search.svg';
import type { SearchResultItem } from '../../types/APIdata';

interface Props {
  isSearching: boolean;
  results: SearchResultItem[];
  onSelect: (item: SearchResultItem) => void;
}

const SearchResult = ({ isSearching, results, onSelect }: Props) => {
  const showModal = isSearching || results.length > 0;

  return (
    <div className={`search-modal ${showModal ? '' : 'hidden'}`}>
      {isSearching && (
        <button type="button">
          <img className="searching-img" src={searchLogo} alt="Searching" />
          <p>Search in progress</p>
        </button>
      )}
      {!isSearching &&
        results.map((item, index) => {
          const labelParts = [item.city, item.name].filter(Boolean);
          const label = labelParts.join(', ') || 'Unknown location';
          return (
            <button
              type="button"
              key={`${item.city ?? 'city'}-${item.name ?? 'country'}-${index}`}
              onClick={() => onSelect(item)}
            >
              {label}
            </button>
          );
        })}
    </div>
  );
};

export default SearchResult;
