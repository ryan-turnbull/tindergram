import debounce from 'lodash.debounce';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { createClient, Photo } from 'pexels';

const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_PK);

interface SearchData {
  query: string | null;
  results: Photo[];
}

interface PhotoDataContextType {
  loading: boolean;
  activeSearchData: SearchData;
  wheelPhoto: Photo | null;
  likedPhotos: Record<string, Photo[]>;
  togglePhotoLike: (photo: Photo) => void;
  setWheelPhoto: (photo: Photo | null) => void;
  updateSearchByTerm: (term: string) => void;
}

interface PhotoDataContextProviderProps {
  children: ReactNode;
}

const PhotoDataContext = createContext<PhotoDataContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export const usePhotoDataContext = (): PhotoDataContextType => {
  const context = useContext(PhotoDataContext);
  if (!context) {
    throw new Error(
      'usePhotoDataContext must be used within a PhotoDataContextProvider',
    );
  }
  return context;
};

export const PhotoDataContextProvider: React.FC<
  PhotoDataContextProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wheelPhoto, setWheelPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, Photo[]>>({});
  const [activeSearchData, setActiveSearchData] = useState<SearchData>({
    query: null,
    results: [],
  });

  const togglePhotoLike = (newPhoto: Photo) => {
    const photoQuery = activeSearchData.query;

    if (!photoQuery) {
      return;
    }

    const existingPhotos = likedPhotos[photoQuery];

    // Add category with new photo
    if (!existingPhotos) {
      setLikedPhotos((lis) => ({
        ...lis,
        [photoQuery]: [newPhoto],
      }));
      return;
    }

    const newPhotoRecord: Photo[] = [];
    let photoExistsInRecord = false;

    for (const photo of existingPhotos) {
      if (photo.id === newPhoto.id) {
        photoExistsInRecord = true; // Implicitly removes it
      } else {
        newPhotoRecord.push(photo);
      }
    }

    if (photoExistsInRecord) {
      setLikedPhotos((lis) => ({
        ...lis,
        [photoQuery]: newPhotoRecord,
      }));
    } else {
      setLikedPhotos((lis) => ({
        ...lis,
        [photoQuery]: [...existingPhotos, newPhoto],
      }));
    }
  };

  const updateSearchByTerm = debounce(async (query: string) => {
    try {
      const resp = await pexelsClient.photos.search({
        query,
        orientation: 'landscape',
      });

      if ('photos' in resp) {
        setActiveSearchData({ query, results: resp.photos });
      } else {
        throw new Error(`Error fetching photos for query ${query}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <PhotoDataContext.Provider
      value={{
        loading,
        likedPhotos,
        wheelPhoto,
        togglePhotoLike,
        setWheelPhoto,
        activeSearchData,
        updateSearchByTerm,
      }}
    >
      {children}
    </PhotoDataContext.Provider>
  );
};
