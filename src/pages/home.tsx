import { Input } from '@nextui-org/react';
import { useImageDataContext } from '../data/images';
import { SearchResults } from '../components/search-results';

function HomePage() {
  const { loading, activeSearchData, updateSearchByTerm } =
    useImageDataContext();

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const newValue: string = e.target.value;
    updateSearchByTerm(newValue);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-2xl px-4">
        <div className="text-center space-y-2 mb-8 max-w-sm px-4 w-full mx-auto">
          <h1 className="text-2xl font-bold">
            Welcome to <span className="text-primary-500">Tindergram 🔥</span>
          </h1>
          <p>The refinement tool for you creative vision</p>
          <Input
            placeholder="Enter your search term..."
            onChange={handleSearchInputChange}
          />
        </div>
        {(loading || activeSearchData.query) && <SearchResults />}
      </div>
    </div>
  );
}

export default HomePage;
