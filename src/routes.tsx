import React, { JSX } from "react";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";

export type RouteType = {
    component: JSX.Element
    isProtected: boolean
    path: string
};
export function getRoutes(): RouteType[] {
    return [
        {
            component: <MainPage />,
            isProtected: true,
            path: '/triptrack'
        },

        {
            component: <LoginPage />,
            isProtected: false,
            path: '/login'
        },
    ];
}
