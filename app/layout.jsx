import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/main_elements/NavBar";
import Footer from "@/components/main_elements/Footer";
import AuthProvider from "@/components/Providers/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Property-pulse | Find The Perfect Rental",
  description: "Find Your Dream Rental",
  keywords: "rental,find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
