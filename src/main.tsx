import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/home.tsx';
import './styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>,
);
