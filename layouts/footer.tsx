'use client';
import React from 'react';
import { CreateDate, FormatDate } from '../utils/dates';
/**
 * A Primary Footer for the App.
 * 
 * 
 */
const Footer: React.FC = () => {
    const date = FormatDate(CreateDate());
    return (
        <footer className="p-10 border-t-3 border-zinc-800">
            <div className="text-xs text-center">
                <p className="text-xs">Current Date: {date} | Note: App Is Just for Demo Purposes!</p>
            </div>
        </footer>
    )
}
export default Footer;