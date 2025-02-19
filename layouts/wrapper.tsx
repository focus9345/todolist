'use client';
import React from 'react';
import {HeroUIProvider} from "@heroui/react";
/**
 * A Primary Wrapper for Pages within the App.
 * 
 * @param {string} props.children - The text to display inside the button.
 */


interface RootLayoutProps {
    children: React.ReactNode;
  }
const PageWrapper: React.FC<RootLayoutProps> = ({ children }) => {

    return (
         <HeroUIProvider>
        <div className="flex flex-col content-start gap-4 items-center justify-between">
            <div className="w-full justify-start ">
                {children}
            </div>
        </div>
        </HeroUIProvider>
    )
}
export default PageWrapper;