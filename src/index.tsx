import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App';
import './index.css';
import Recoil from './Recoil';
import RecoilAtom from './RecoilAtom';
import RecoilSelector from './RecoilSelector';
import reportWebVitals from './reportWebVitals';
import Router from './Router';

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "",
        element: <App />,
        index: true,
      },
      {
        path: "/router",
        element: <Router />,
      },
      {
        path: "/recoil",
        children: [
          {
            path: "",
            element: <Recoil />,
            index: true,
          },
          {
            path: "atom",
            element: <RecoilAtom />,
          },
          {
            path: "selector",
            element: <RecoilSelector />,
          },
        ]
      },
    ]
  },
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
