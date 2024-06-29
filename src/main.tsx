import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PhotoDataContextProvider } from './data/photos.tsx';

import { HomePage } from './pages/home';
import { LikedPhotoPage } from './pages/liked';
import { routes } from './utils/routes.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <PhotoDataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} Component={HomePage} />
            <Route path={routes.liked} Component={LikedPhotoPage} />
          </Routes>
        </BrowserRouter>
      </PhotoDataContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
