import { ReactNode } from 'react';

const PageWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex flex-col content-start gap-4 px-10 py-12 items-center justify-between">
            <div className="w-full justify-start max-w-[1024px]">
                {children}
            </div>
        </main>
    );
};

export default PageWrapper;