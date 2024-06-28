import debounce from 'lodash.debounce';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { createClient, Photo } from 'pexels';

const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_PK);

interface SearchData {
  query: string | null;
  results: Photo[];
}

interface ImageDataContextType {
  loading: boolean;
  activeSearchData: SearchData;
  likedImages: Record<string, number[]>;
  toggleImageLike: (id: number) => void;
  updateSearchByTerm: (term: string) => void;
}

interface ImageDataContextProviderProps {
  children: ReactNode;
}

const ImageDataContext = createContext<ImageDataContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useImageDataContext = (): ImageDataContextType => {
  const context = useContext(ImageDataContext);
  if (!context) {
    throw new Error(
      'useImageDataContext must be used within a ImageDataContextProvider',
    );
  }
  return context;
};

export const ImageDataContextProvider: React.FC<
  ImageDataContextProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [likedImages, setLikedImages] = useState<Record<string, number[]>>({});
  const [activeSearchData, setActiveSearchData] = useState<SearchData>({
    query: null,
    results: [],
  });

  const toggleImageLike = (imageId: number) => {
    const imageQuery = activeSearchData.query;

    if (!imageQuery) {
      return;
    }

    const record = likedImages[imageQuery];

    // Add category with new image
    if (!record) {
      setLikedImages((lis) => ({
        ...lis,
        [imageQuery]: [imageId],
      }));
      return;
    }

    // Remove from category if exists
    if (record.indexOf(imageId) > -1) {
      const updatedImages = record.filter((id) => id !== imageId);

      setLikedImages((lis) => ({
        ...lis,
        [imageQuery]: updatedImages,
      }));
      return;
    }

    // Add to existing category
    const currImages = likedImages[imageQuery];

    setLikedImages((lis) => ({
      ...lis,
      [imageQuery]: [...currImages, imageId],
    }));
  };

  const updateSearchByTerm = debounce(async (query: string) => {
    try {
      const resp = await pexelsClient.photos.search({
        query,
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
    <ImageDataContext.Provider
      value={{
        loading,
        likedImages,
        toggleImageLike,
        activeSearchData,
        updateSearchByTerm,
      }}
    >
      {children}
    </ImageDataContext.Provider>
  );
};
