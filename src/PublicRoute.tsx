import React from "react";
import { Navigate } from "react-router-dom";
import { RouteType } from "./routes";
import { authStore } from "./store/AuthStore";

export function PublicRoute({ route }: { route: RouteType }) {
    return (
        <>
            {authStore.isAuthenticated ? (
                <Navigate replace={true} to={`/profile/${authStore.userKey}`} />
            ) : (
                <>{route.component}</>
            )}
        </>
    );
}
