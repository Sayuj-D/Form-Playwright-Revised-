"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [signedInUser, setSignedInUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (userData) {
      setSignedInUser(userData);
    }
  }, []);

  return (
    <div className="pl-20 mt-8">
      <div className="flex-col flex gap-4">
        <p className="text-3xl font-bold">This is a Home page!</p>
        <p>
          Welcome to Home page,
          {signedInUser.username}
        </p>
      </div>
    </div>
  );
};

export default Page;
