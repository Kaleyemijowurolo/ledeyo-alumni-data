import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const thankYouPage = "/thankyou";
  const homePage = "/";

  const visitedThankYouPage = req.cookies.get("visitedThankYouPage");

  // If user is trying to navigate to the thankyou page or before
  if (req.nextUrl.pathname !== thankYouPage && visitedThankYouPage) {
    // If they're trying to go back after reaching the thankyou page, redirect to home
    return NextResponse.redirect(new URL(homePage, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/thankyou"],
};
