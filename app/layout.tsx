// app/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

// Helper function to check if the user is logged in using JWT
const checkIfLoggedIn = () => {
  return localStorage.getItem("authToken") !== null; // Check if there's a valid JWT token
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
    const restrictedPages = ["/home", "/form", "/about", "/contact"];

    if (!isLoggedIn && restrictedPages.includes(pathname)) {
      router.push("/login"); // Redirect to Login page if not logged in
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
            <Link href="/constraintsApi">Constraints Form</Link>
            <Link href="/apiTesting">API testing</Link>
            <button
              onClick={() => {
                localStorage.removeItem("authToken"); // Remove JWT token
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
