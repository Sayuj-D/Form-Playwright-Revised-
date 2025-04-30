"use client";

import React, { useState, useEffect } from "react";
// import { useAuthRedirect } from "@/app/lib/hooks/useAuthRedirect";

const Page = () => {
  // useAuthRedirect(); // Protect the route if token is missing/expired

  const [signedInUser, setSignedInUser] = useState<{ username: string } | null>(
    null
  );

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setSignedInUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setSignedInUser(null);
      }
    }
  }, []);

  return (
    <div className="pl-20 mt-8">
      <div className="flex-col flex gap-4">
        <p className="text-3xl font-bold">This is a Home page!</p>
        <p>
          Welcome to Home page,
          {signedInUser?.username || "Guest"}
        </p>
      </div>
    </div>
  );
};

export default Page;
