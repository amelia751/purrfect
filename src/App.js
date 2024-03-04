import React from 'react';
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomePage from './homepage/HomePage';
import Concept from './Concept';
import Ourcats from './Ourcats';
import Review from './Review';
import FAQ from './FAQ';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/concept", element: <Concept /> },
  { path: "/ourcats", element: <Ourcats /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/review", element: <Review /> },

]);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;

