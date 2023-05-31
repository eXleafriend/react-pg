import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { navigationRoot } from './common';
import './index.css';
import { Layout } from './Layout';
import { convertToRouteObject } from './navigation-router';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  convertToRouteObject(navigationRoot, e => (<Layout>{e}</Layout>)),
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
