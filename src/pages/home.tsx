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
    <div className="w-full min-h-screen relative">
      <div className="mb-8 border-b sticky top-0 w-full pb-2 bg-white z-50">
        <div className="text-center space-y-2 py-6 max-w-sm px-4 w-full mx-auto">
          <h1 className="text-2xl font-bold">
            Welcome to <span className="text-primary-500">Tindergram 🔥</span>
          </h1>
          <p>The refinement tool for you creative vision</p>
          <Input
            placeholder="Enter your search term..."
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 relative">
        {(loading || activeSearchData.query) && <SearchResults />}
      </div>
    </div>
  );
}

export default HomePage;
