import { Button, Image, Skeleton } from '@nextui-org/react';
import { usePhotoDataContext } from '../data/images';

import heartIcon from '../icons/heart.svg';

const SKELETON_PLACEHOLDERS = new Array(5).fill(null);
const IMAGE_DIMENSIONS_PX = 300;

export const SearchResults = () => {
  const {
    activeSearchData,
    loading,
    togglePhotoLike,
    likedPhotos,
    setWheelPhoto,
  } = usePhotoDataContext();

  const likedPhotosForTerm = activeSearchData.query
    ? likedPhotos[activeSearchData.query] ?? []
    : [];

  if (loading) {
    return (
      <div className="flex flex-wrap gap-4">
        {SKELETON_PLACEHOLDERS.map((_, index) => (
          <div
            key={`skeleton-loader-position-${index}`}
            className={`h-[${IMAGE_DIMENSIONS_PX}px] w-[${IMAGE_DIMENSIONS_PX}px]`}
          >
            <Skeleton isLoaded={false} className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-4">
        {activeSearchData.results.map((res) => {
          const isLiked = likedPhotosForTerm.find(
            (photo) => photo.id === res.id,
          );

          return (
            <div key={res.id} className="relative">
              <Image
                height={IMAGE_DIMENSIONS_PX}
                alt="Image showing query"
                src={res.src.small}
                className="cursor-pointer"
                onClick={() => setWheelPhoto(res)}
              />
              <Button
                isIconOnly
                size="sm"
                color={isLiked ? 'danger' : 'default'}
                className="absolute bottom-1 right-1 z-10 cursor-pointer"
                onClick={() => togglePhotoLike(res)}
              >
                <div className="p-2 h-12 w-12 flex items-center justify-center">
                  <img src={heartIcon} />
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
