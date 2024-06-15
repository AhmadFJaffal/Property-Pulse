import React from "react";
import "@/assets/styles/globals.css"
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Property-pulse | Find Perfect Rental",
  description: "Find Your Dream Rental",
  keywords: "rental,find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
