"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from "./context-provider";
import Header from "./header";
import PageWrapper from "./wrapper";
//
import Footer from "./footer";

interface Props {
  children?: React.ReactNode;
  //session?: any;
}

const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <PageWrapper>
          <Header />
          <div className="flex">
            <div className="w-full overflow-x-auto ">{children}</div>
          </div>
          <Footer />
        </PageWrapper>
      </ContextProvider>
    </QueryClientProvider>
  );
};
export default Providers;
