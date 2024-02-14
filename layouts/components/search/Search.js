import useSearchBlog from "@/hooks/useSearchBlog";
import useSearchTheme from "@/hooks/useSearchTheme";
import useSearchTool from "@/hooks/useSearchTool";
import { useSearchContext } from "context/searchContext";
import { useEffect, useRef, useTransition } from "react";
import BlogCard from "./BlogCard";
import SearchTab from "./SearchTab";
import ThemesCard from "./ThemesCard";
import ToolCard from "./ToolCard";

const Search = ({ setSearchModal, searchModal }) => {
  const searchInputRef = useRef(null);
  const { searchKey, setSearchKey, isTheme, isBlog, isTool } =
    useSearchContext();
  const { themes } = useSearchTheme();
  const { tools } = useSearchTool();
  const { blogs } = useSearchBlog();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    searchModal
      ? searchInputRef.current.focus()
      : (searchInputRef.current.value = ""),
      setSearchKey("");
  }, [searchModal, setSearchKey]);

  const handleChange = (e) => {
    startTransition(() => setSearchKey(e.target.value));
  };

  return (
    <div className={`modal ${searchModal ? "block" : "hidden"}`}>
      <div className="modal-overlay" onClick={() => setSearchModal(false)} />
      <div className="modal-box top-12 w-[1096px]">
        {/* search input */}
        <div className="flex items-center bg-theme-light px-6 py-1 dark:bg-darkmode-theme-light sm:py-3 md:px-8">
          <svg
            width="18"
            height="18"
            viewBox="0 0 491 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-dark dark:text-white"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M321 380.03L318.1 381.9C252.8 423.8 165.5 424.3 99.3003 383.3C16.3003 331.7 -19.4997 232 11.6003 139.1C17.5003 121.7 30.7003 97.1998 43.1003 80.7998C51.1003 70.1998 71.1003 50.1998 81.5003 42.3998C110 20.7998 143.7 6.59982 177.8 1.59982C191 -0.300171 222.8 -0.400146 235.8 1.49985C271.4 6.59985 304.4 20.2998 333.2 42.0998C343.9 50.1998 364 70.2998 371.8 80.6998C410.9 132.6 424 196.7 408.1 258.1C402.076 281.432 392.093 304.044 379.189 323.127L379 323C376.399 326.948 373.761 330.625 371.189 334.048C370.671 334.715 370.325 335.155 370.028 335.533C369.307 336.45 368.88 336.993 367 339.5C349.079 362.386 334.007 372.501 325.919 377.223L325.7 377L321.427 379.755C321.276 379.84 321.134 379.922 321 380V380.03ZM312.4 96.9998C288.7 74.4998 258.8 59.8998 228 56.0998C223.3 55.4998 216.6 54.8998 213 54.7998C146.7 51.9998 85.1003 94.5998 63.7003 158C59.3003 171 57.3003 180.5 56.0003 195.1C50.3003 261.2 91.7003 326 154.3 349.1C196.8 364.8 243.8 361.1 282.5 338.9C309.5 323.4 332.3 298.8 345.1 271.5C373 211.6 360 142.5 312.4 96.9998Z"
              fill="currentColor"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M362.4 340C347.89 357.059 330.886 370.641 321 377.36L333.477 390.136C340.377 397.136 368.677 426.536 396.477 455.436C442.39 503.189 449.915 511.338 458.252 512.277C460.338 512.513 462.475 512.296 465.277 512.136C473.777 511.636 477.577 510.036 482.877 504.636C488.077 499.436 490.577 493.236 490.577 485.336C490.577 475.536 488.177 471.136 475.477 458.036C434.491 415.684 365.696 343.904 362.4 340Z"
            />
          </svg>
          <input
            className="h-12 flex-1 border-0 bg-transparent text-text shadow-none outline-0 focus:ring-0 dark:text-darkmode-text"
            type="text"
            onChange={handleChange}
            placeholder="Search anything..."
            ref={searchInputRef}
            id="searchInput"
          />
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <span
            className="cursor-pointer rounded-sm border-border font-medium sm:text-lg"
            onClick={() => setSearchModal(false)}
          >
            <span className="hidden rounded border border-light px-1 text-sm text-text dark:border-darkmode-text dark:text-darkmode-text lg:block">
              ESC
            </span>
            <span className="block h-5 w-5 rounded-full border border-darkmode-text text-center text-xs leading-5 text-text dark:text-darkmode-text lg:hidden">
              &#x2715;
            </span>
          </span>
        </div>

        <div className="p-4">
          <SearchTab
            themes={themes}
            blogs={blogs}
            tools={tools}
            searchModal={searchModal}
          />

          {/* initial screen */}
          {themes.length + tools.length + blogs.length === 0 &&
            searchKey === "" && (
              <h4 className="py-5 text-center">
                Search Themes, Tools, And Blogs
              </h4>
            )}

          {searchKey.length > 0 && searchKey.length < 3 && (
            <h4 className="py-5 text-center">
              Type at least 3 characters to search
            </h4>
          )}

          {/* no search found screen */}
          {themes.length + tools.length + blogs.length === 0 &&
            searchKey.length > 2 && (
              <h4 className="py-5 text-center">No Search Found!</h4>
            )}

          {/* search result screen */}
          <div className="flex justify-between">
            {/* themes result */}
            <div
              className={`flex-fill mt-8 min-w-[50%] overflow-hidden ${
                isTheme && themes.length ? "block" : "hidden"
              }`}
            >
              <h4 className="h5 mb-3 pl-2">Themes</h4>
              <div className="scroll-box max-h-[500px]">
                <ThemesCard
                  themes={themes}
                  tools={tools}
                  blogs={blogs}
                  setSearchModal={setSearchModal}
                />
              </div>
            </div>
            {/* tools and blogs results */}
            <div
              className={`flex-fill mt-8 flex min-w-[50%] flex-col pl-3 ${
                (isBlog || isTool) && (blogs.length || tools.length)
                  ? "block"
                  : "hidden"
              }`}
            >
              {/* tool results */}
              <div className={isTool && tools.length ? "mb-4 block" : "hidden"}>
                <h4 className="h5 mb-3 pl-2">Tools</h4>
                <div
                  className={`scroll-box ${
                    blogs.length ? "max-h-[215px]" : "max-h-[500px]"
                  }`}
                >
                  <ToolCard themes={themes} tools={tools} blogs={blogs} />
                </div>
              </div>

              {/* blog results */}
              <div className={isBlog && blogs.length ? "block" : "hidden"}>
                <h4 className="h5 mb-3 pl-2">Blog</h4>
                <div
                  className={`scroll-box ${
                    tools.length ? "max-h-[220px]" : "max-h-[500px]"
                  }`}
                >
                  <BlogCard
                    themes={themes}
                    tools={tools}
                    blogs={blogs}
                    setSearchModal={setSearchModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
