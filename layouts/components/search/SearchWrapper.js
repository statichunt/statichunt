import { SearchContext } from "context/searchContext";
import Search from "./Search";

const SearchWrapper = ({ setSearchModal, searchModal }) => {
  return (
    <SearchContext>
      <Search searchModal={searchModal} setSearchModal={setSearchModal} />
    </SearchContext>
  );
};

export default SearchWrapper;
