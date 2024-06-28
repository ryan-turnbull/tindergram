import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/home.tsx';
import './styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ImageDataContextProvider } from './data/images.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ImageDataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={HomePage} />
          </Routes>
        </BrowserRouter>
      </ImageDataContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
