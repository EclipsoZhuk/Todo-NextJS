import '@/styles/globals.css';
import { Playfair_Display } from '@next/font/google';
import type { AppProps } from 'next/app';

import AuthProvider from '@/context/AuthContext';
import Layout from '@/components/Layout';

const raleway = Playfair_Display({
    subsets: ['latin'],
    variable: '--play-display-font',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                :root {
                    --play-display-font: ${raleway.style.fontFamily};
                }
            `}</style>

            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    );
}
