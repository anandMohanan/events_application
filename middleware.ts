import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { API_AUTH_ROUTE, LOGIN_REDIRECT, PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith(API_AUTH_ROUTE);
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
    const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);
    if (isApiRoute) {
        return null
    }

    if (isPrivateRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {

        return Response.redirect(new URL("/login", nextUrl));
    }
    return null;
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
