import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ContextProvider from "../../layouts/context-provider";
import Header from "../../layouts/header";
import PageWrapper from "../../layouts/wrapper";
import SidebarRight from "../../layouts/sidebarright";
import Footer from "../../layouts/footer";

/**
 * A Primary Layout for the App.
 *
 * @param {string} props.children - The text to display inside the button.
 */

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Single page todo app for demo purposes",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
        <ContextProvider>
         <PageWrapper> 
          <Header />
          <div className="flex">
            <div className="w-full overflow-x-auto ">
              <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
                <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 60px)] overflow-y-auto relative">
                  <div className="w-full md:max-w-6xl">{children}
                  </div>
                </div>
              </div>
            </div>
           <SidebarRight />
          </div>
          
          <Footer /> 
         </PageWrapper> 
        </ContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;



