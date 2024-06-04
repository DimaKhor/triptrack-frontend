import React from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { getRoutes } from "./routes";

const App = () => {
    const routes = getRoutes();

    return (
        <Router>
            <Routes>
                {routes.map((route) => (
                    route.isProtected ? (
                        <Route element={<ProtectedRoute route={route} />} key={route.path} path={route.path} />
                    ) : route.isPublic ? (
                        <Route element={<PublicRoute route={route} />} key={route.path} path={route.path} />
                    ) : (
                        <Route element={route.component} key={route.path} path={route.path} />
                    )
                ))}
                <Route element={<NotFoundPage />} path='*' />
            </Routes>
        </Router>
    );
};

export default App;
