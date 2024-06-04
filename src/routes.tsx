import React, { JSX } from "react";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ProfilePage } from "./pages/ProfilePage";

export type RouteType = {
    component: JSX.Element;
    isProtected: boolean;
    isPublic?: boolean;
    path: string;
};

export function getRoutes(): RouteType[] {
    return [
        {
            component: <MainPage />,
            isProtected: false,
            path: '/triptrack'
        },
        {
            component: <LoginPage />,
            isProtected: false,
            isPublic: true,
            path: '/login'
        },
        {
            component: <RegistrationPage />,
            isProtected: false,
            isPublic: true,
            path: '/registration'
        },
        {
            component: <ProfilePage />,
            isProtected: true,
            path: '/profile/:userKey'
        },
    ];
}
