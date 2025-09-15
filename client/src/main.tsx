import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';      // If App.tsx exists
import Attend from './Attend'; // If Attend.tsx exists
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/a/:nonce', element: <Attend /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);