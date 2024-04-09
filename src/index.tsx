import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/css/style.css';
import {NotFoundPage} from "./pages/NotFoundPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import { getRoutes } from "./routes";

const routes = getRoutes();

localStorage.setItem('isAuthenticated', 'false');
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <StrictMode>
      <Router>
          <Routes>
              {routes.map((route) => (
                  route.isProtected ? <Route element={<ProtectedRoute route={route} />} key={route.path} path={route.path} /> :
                      <Route element={route.component} key={route.path} path={route.path} />
              ))}

              <Route element={<NotFoundPage />} path='*' />
          </Routes>
      </Router>
  </StrictMode>
);

