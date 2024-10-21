// app/layout.tsx or form/thankyou/page.tsx (depending on scope)
"use client"; // Ensure this is a client-side component

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutController({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();

  useEffect(() => {
    // Only apply this logic if the user is on the "form/thankyou" page
    if (pathname === "/form/thankyou") {
      const handlePopState = (event: PopStateEvent) => {
        event.preventDefault(); // Prevent the default browser back behavior
        router.replace("/"); // Navigate the user to the homepage
      };

      // Add the event listener
      window.addEventListener("popstate", handlePopState);

      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [pathname, router]); // Re-run effect if the pathname changes

  return <div>{children}</div>;
}
