// import { auth } from "@/auth";
import { NextResponse } from "next/server";

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.origin !== "/") {
//     return NextResponse.redirect(new URL("", req.nextUrl.origin));
//   }
// });
export function middleware() {}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|$).*)",
//   ],
// };
