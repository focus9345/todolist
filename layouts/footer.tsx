import React from 'react';
/**
 * A Primary Footer for the App.
 * 
 * 
 */
const Footer: React.FC = () => {
    const date = new Date().toDateString();
    return (
        <footer className="p-10 border border-zinc-700 rounded-md">
            <div className="">
                <p className="text-sm">Current Date: {date} | Note: App Is Just for Demo Purposes!</p>
            </div>
        </footer>
    )
}
export default Footer;