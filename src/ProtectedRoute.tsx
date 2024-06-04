import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteType } from "./routes";
import { authStore } from "./store/AuthStore";

export function ProtectedRoute({ route }: { route: RouteType }) {
    const location = useLocation();
    const userKeyFromPath = location.pathname.split('/').pop();

    return (
        <>
            {authStore.isAuthenticated && authStore.userKey === userKeyFromPath ? (
                <>{route.component}</>
            ) : (
                <Navigate replace={true} to="/login" />
            )}
        </>
    );
}
