import React from 'react';
import Header from './Header';

interface IProps {
    children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <div className="flex flex-col min-h-screen relative bg-slate-900 text-white">
            <Header />
            <main className="flex-1 flex flex-col p-4">{children}</main>
        </div>
    );
}
