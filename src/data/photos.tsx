import debounce from 'lodash.debounce';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { createClient, Photo } from 'pexels';

const PAGE_SIZE = 20;
const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_PK);

interface SearchData {
  query: string | null;
  results: Photo[];
  offset: number;
}

interface PhotoDataContextType {
  loading: boolean;
  activeSearchData: SearchData;
  wheelPhoto: Photo | null;
  resetSearch: () => void;
  likedPhotos: Record<string, Photo[]>;
  togglePhotoLike: (photo: Photo, category: string | null) => void;
  updateSearchByTerm: (term: string) => void;
  setWheelPhoto: (photo: Photo | null) => void;
  loadMorePhotos: () => void;
}

interface PhotoDataContextProviderProps {
  children: ReactNode;
}

const PhotoDataContext = createContext<PhotoDataContextType | undefined>(
  undefined,
);

const initialPhotoData: SearchData = {
  query: null,
  offset: 0,
  results: [],
};

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
  const [activeSearchData, setActiveSearchData] =
    useState<SearchData>(initialPhotoData);

  const togglePhotoLike = (newPhoto: Photo, category: string | null) => {
    if (!category) {
      return null;
    }

    const existingPhotos = likedPhotos[category];

    // Add category with new photo
    if (!existingPhotos) {
      setLikedPhotos((lis) => ({
        ...lis,
        [category]: [newPhoto],
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
        [category]: newPhotoRecord,
      }));
    } else {
      setLikedPhotos((lis) => ({
        ...lis,
        [category]: [...existingPhotos, newPhoto],
      }));
    }
  };

  const updateSearchByTerm = debounce(async (query: string) => {
    try {
      setLoading(true);
      const resp = await pexelsClient.photos.search({
        query,
        orientation: 'landscape',
        per_page: PAGE_SIZE,
      });

      if ('photos' in resp) {
        setActiveSearchData({ query, results: resp.photos, offset: 0 });
      } else {
        throw new Error(`Error fetching photos for query ${query}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);

  const loadMorePhotos = async () => {
    if (!activeSearchData.query) {
      return;
    }

    try {
      setLoading(true);
      const resp = await pexelsClient.photos.search({
        query: activeSearchData.query,
        orientation: 'landscape',
        per_page: 30,
        offset: activeSearchData.offset + 1,
      });

      if ('photos' in resp) {
        setActiveSearchData((data) => ({
          query: data.query,
          results: [...data.results, ...resp.photos],
          offset: data.offset + 1,
        }));
      } else {
        throw new Error(`Error fetching more photos`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setActiveSearchData(initialPhotoData);
  };

  return (
    <PhotoDataContext.Provider
      value={{
        loading,
        wheelPhoto,
        resetSearch,
        likedPhotos,
        loadMorePhotos,
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
