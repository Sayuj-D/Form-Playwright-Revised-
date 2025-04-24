"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

// Helper function to check if the user is logged in
const checkIfLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to Login if the user is not logged in and tries to access restricted pages
  useEffect(() => {
    const isLoggedIn = checkIfLoggedIn();
    const restrictedPages = ["/Home", "/Form", "/AboutUs", "ContactUs"];

    if (!isLoggedIn && restrictedPages.includes(pathname)) {
      router.push("/LogIn"); // Redirect to Login page if not logged in
    }
  }, [pathname, router]);

  const hideNavbarRoutes = ["/LogIn", "/SignUp"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(
    pathname.replace(/\/+$/, "")
  );

  return (
    <html lang="en">
      <body>
        {shouldShowNavbar && (
          <header className="flex gap-8 bg-gray-300 p-6 justify-around">
            <Link href="/Home">Home</Link>
            <Link href="/AboutUs">About Us</Link>
            <Link href="/ContactUs">Contact Us</Link>
            <Link href="/Form">Form</Link>
            <button
              onClick={() => {
                localStorage.setItem("isLoggedIn", "false");
                localStorage.removeItem("currentUser");
                router.push("/LogIn");
              }}
              className="text-red-500"
            >
              Logout
            </button>
          </header>
        )}
        <main>{children}</main>
      </body>
    </html>
  );
}
