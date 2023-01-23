import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
      path: "/",
      element:<App />,
    },
    {
      path: '*',
      element: <NotFoundPage />
    },
  
  ]);

  root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


