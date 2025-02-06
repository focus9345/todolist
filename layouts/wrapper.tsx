import React from 'react';
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
        <main className="flex flex-col content-start gap-4 px-10 py-12 items-center justify-between">
            <div className="w-full justify-start max-w-[1024px]">
                {children}
            </div>
        </main>
    )
}
export default PageWrapper;