import { Image, Skeleton } from '@nextui-org/react';
import { useImageDataContext } from '../data/images';

const SKELETON_PLACEHOLDERS = new Array(5).fill(null);
const IMAGE_DIMENSIONS_PX = 200;

export const SearchResults = () => {
  const { activeSearchData, loading } = useImageDataContext();

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
      <p>Results</p>
      <div className="flex flex-wrap gap-4">
        {activeSearchData.results.map((res) => (
          <div>
            <Image
              // width={IMAGE_DIMENSIONS_PX}
              height={IMAGE_DIMENSIONS_PX}
              alt="NextUI hero Image with delay"
              src={res.src.small}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
