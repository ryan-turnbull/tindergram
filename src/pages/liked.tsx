import { BreadcrumbItem, Breadcrumbs, Image } from '@nextui-org/react';
import { StickyHeaderLayout } from '../layouts/sticky-header';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { usePhotoDataContext } from '../data/photos';
import { useEffect } from 'react';

const PHOTO_DIMENSIONS_PX = 300;

export const LikedPhotoPage = () => {
  const navigate = useNavigate();
  const { likedPhotos, loading, togglePhotoLike } = usePhotoDataContext();

  const hasLikedPhoto = Object.keys(likedPhotos).some(
    (key) => likedPhotos[key].length > 0,
  );

  useEffect(() => {
    if (!hasLikedPhoto && !loading) {
      navigate(routes.home);
    }
  }, [hasLikedPhoto, navigate, loading]);

  return (
    <StickyHeaderLayout
      isActive
      headerContent={
        <div className="space-y-2 py-6 max-w-sm px-4 w-full mx-auto">
          <Breadcrumbs>
            <BreadcrumbItem onClick={() => navigate(routes.home)}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem>Liked</BreadcrumbItem>
          </Breadcrumbs>
          <h1 className="text-2xl font-bold">
            <span className="text-primary-500">Liked</span> Photos 😍
          </h1>
        </div>
      }
    >
      <div className="space-y-8">
        {Object.keys(likedPhotos).map((likedPhotoCategory) => {
          const photos = likedPhotos[likedPhotoCategory];

          if (!photos || photos.length === 0) {
            return null;
          }

          return (
            <div key={likedPhotoCategory}>
              <p className="mb-2 font-semibold">
                Search term: {likedPhotoCategory}
              </p>
              <ul className="flex flex-wrap gap-4">
                {photos.map((photo) => (
                  <li key={photo.id} className="relative">
                    <Image
                      height={PHOTO_DIMENSIONS_PX}
                      alt="Photo showing query"
                      src={photo.src.small}
                      className="hover:opacity-80"
                    />
                    <div
                      className="bg-primary-500 text-white text-sm rounded-full h-4 w-4 absolute top-0 right-0 z-10 flex items-center justify-center cursor-pointer"
                      onClick={() => togglePhotoLike(photo, likedPhotoCategory)}
                    >
                      ⤫
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </StickyHeaderLayout>
  );
};
