import React, { JSX } from "react";
import { MainPage } from "./pages/MainPage";

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
    ];
}
