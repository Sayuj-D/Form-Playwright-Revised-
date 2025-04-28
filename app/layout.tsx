"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

// Helper function to check if user is logged in based on JWT token
const checkIfLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // true if token exists
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = checkIfLoggedIn();
    const restrictedPages = ["/home", "/form", "/about", "/contact"];

    if (!isLoggedIn && restrictedPages.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, router]);

  const hideNavbarRoutes = ["", "/login", "/signup"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(
    pathname.replace(/\/+$/, "")
  );

  return (
    <html lang="en">
      <body>
        {shouldShowNavbar && (
          <header className="flex gap-8 bg-gray-300 p-6 justify-around">
            <Link href="/home">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/form">Form</Link>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("currentUser");
                // router.refresh(); // optional if you want instant logout effect
                router.push("/login");
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
