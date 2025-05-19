'use client';
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContextProvider from "./context-provider";
import Header from "./header";
import PageWrapper from "./wrapper";
import SidebarRight from "./sidebarright";
import Footer from "./footer";

interface Props {
  children?: React.ReactNode;
  //session?: any;
}

const Providers: React.FC<Props>  = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <PageWrapper>
          <Header />
          <div className="flex">
            <div className="w-full overflow-x-auto ">
              <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
                <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 60px)] overflow-y-auto relative">
                  <div className="w-full md:max-w-6xl">{children}</div>
                </div>
              </div>
            </div>
            <SidebarRight />
          </div>
          <Footer />
        </PageWrapper>
      </ContextProvider>
    </QueryClientProvider>
  );
}
export default Providers;