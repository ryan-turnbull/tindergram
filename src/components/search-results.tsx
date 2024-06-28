import { Button, Image, Skeleton } from '@nextui-org/react';
// import { useInView } from 'react-intersection-observer';

import { usePhotoDataContext } from '../data/images';
import heartIcon from '../icons/heart.svg';
import { useReward } from 'react-rewards';
// import { useEffect } from 'react';
// import { throttle } from 'lodash';

const SKELETON_PLACEHOLDERS = new Array(5).fill(null);
const IMAGE_DIMENSIONS_PX = 300;

export const SearchResults = () => {
  const {
    loading,
    likedPhotos,
    activeSearchData,
    togglePhotoLike,
    // loadMorePhotos,
    setWheelPhoto,
  } = usePhotoDataContext();
  const { reward } = useReward('heartEmojiGen', 'emoji', {
    emoji: ['❤️'],
    elementCount: 5,
    startVelocity: 15,
  });

  //   const { ref, inView } = useInView({
  //     /* Optional options */
  //     threshold: 0,
  //   });

  //   const throttledLoadFn = throttle(loadMorePhotos, 1000);

  //   useEffect(() => {
  //     if (inView && !loading) {
  //     //   throttledLoadFn();
  //     }
  //   }, [inView, loading, throttledLoadFn]);

  const likedPhotosForTerm = activeSearchData.query
    ? likedPhotos[activeSearchData.query] ?? []
    : [];

  if (loading && activeSearchData.results.length === 0) {
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
        {activeSearchData.results.map((res, index) => {
          const isLiked = likedPhotosForTerm.find(
            (photo) => photo.id === res.id,
          );

          return (
            <div key={`${res.id}-resp-${index}`} className="relative">
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  height={IMAGE_DIMENSIONS_PX}
                  alt="Image showing query"
                  src={res.src.small}
                  onClick={() => setWheelPhoto(res)}
                />
              </div>

              <Button
                isIconOnly
                size="sm"
                color={isLiked ? 'danger' : 'default'}
                className="absolute bottom-1 right-1 z-10 cursor-pointer"
                onClick={() => {
                  if (!isLiked) {
                    reward();
                  }
                  togglePhotoLike(res);
                }}
              >
                <div className="p-2 h-12 w-12 flex items-center justify-center">
                  <img src={heartIcon} />
                </div>
              </Button>
            </div>
          );
        })}
      </div>
      {/* <div ref={ref} /> */}
    </div>
  );
};
