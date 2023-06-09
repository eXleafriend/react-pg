import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { navigationRoot } from './common';
import './index.css';
import { Layout } from './Layout';
import { convertToRouteObject } from './navigation-router';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  convertToRouteObject(navigationRoot, e => (<Layout>{e}</Layout>)),
], {
  basename: "/react-pg"
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
