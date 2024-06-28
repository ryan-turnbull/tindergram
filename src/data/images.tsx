import debounce from 'lodash.debounce';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { createClient, Photos } from 'pexels';

const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_PK);

interface SearchData {
  query: string | null;
  results: Photos['photos'];
}

interface ImageDataContextType {
  loading: boolean;
  activeSearchData: SearchData;
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
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export const ImageDataContextProvider: React.FC<
  ImageDataContextProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeSearchData, setActiveSearchData] = useState<SearchData>({
    query: null,
    results: [],
  });

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
        activeSearchData,
        updateSearchByTerm,
      }}
    >
      {children}
    </ImageDataContext.Provider>
  );
};
