import { Button, Image, Skeleton } from '@nextui-org/react';
// import { useInView } from 'react-intersection-observer';

import { usePhotoDataContext } from '../../data/photos';
import heartIcon from '../../icons/heart.svg';
import { useReward } from 'react-rewards';
// import { useEffect } from 'react';
// import { throttle } from 'lodash';

const SKELETON_PLACEHOLDERS = new Array(5).fill(null);

/**
 * FUTURE NOTE (for reviewers):
 * When scrolling down the search results, ideally, you're loading more photos once you reach the bottom.
 *
 * Unfortunately, when passing the offset through to pexels in `data/photos.tsx`, the same photos were being returned regardless of pagination.
 * This resulted in duplicate ID's being stored against liked photos, and used in logic, so i've removed this feature for the time being.
 *
 * This code has been commented in this file, but would function if pexels were to return unique photos
 */

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
            className="rounded-3xl overflow-hidden"
            style={{
              height: 130,
              width: 195,
            }}
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
            <div
              key={`${res.id}-resp-${index}`}
              className="relative fade-in-up"
            >
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  alt="Photo showing query"
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
                  togglePhotoLike(res, activeSearchData.query);
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
