import { Input } from '@nextui-org/react';
import { usePhotoDataContext } from '../data/images';
import { SearchResults } from '../components/search-results';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { StickyHeaderLayout } from '../layouts/sticky-header';
import { useState } from 'react';
import { Modal } from '../components/modal';
import { PhotoWheel } from '../components/photo-wheel';

function HomePage() {
  const navigate = useNavigate();

  const {
    loading,
    wheelPhoto,
    likedPhotos,
    resetSearch,
    setWheelPhoto,
    activeSearchData,
    updateSearchByTerm,
  } = usePhotoDataContext();

  const [searchValue, setSearchValue] = useState<string | undefined>(
    activeSearchData.query ?? undefined,
  );

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const newValue: string = e.target.value;
    setSearchValue(newValue);
    updateSearchByTerm(newValue);
  };

  const hasLikedPhoto = Object.keys(likedPhotos).some(
    (key) => likedPhotos[key].length > 0,
  );

  return (
    <>
      <StickyHeaderLayout
        headerContent={
          <>
            <div className="text-center space-y-2 py-6 max-w-sm px-4 w-full mx-auto">
              <h1 className="text-2xl font-bold">
                Welcome to{' '}
                <span className="text-primary-500">Tindergram 🔥</span>
              </h1>
              <p>The refinement tool for your creative vision</p>
              <Input
                placeholder="Enter your search term..."
                onChange={handleSearchInputChange}
                value={searchValue}
              />
            </div>
            {hasLikedPhoto && (
              <div
                className="fixed top-4 right-4 fade-in-up cursor-pointer"
                onClick={() => navigate(routes.liked)}
              >
                <p>Liked photos</p>
              </div>
            )}
          </>
        }
      >
        <div className="max-w-2xl mx-auto px-4 relative">
          {(loading || activeSearchData.query) && <SearchResults />}
        </div>
      </StickyHeaderLayout>
      {wheelPhoto && (
        <Modal show onClose={() => setWheelPhoto(null)}>
          <PhotoWheel
            onComplete={() => {
              resetSearch();
              setSearchValue('');
              setWheelPhoto(null);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
