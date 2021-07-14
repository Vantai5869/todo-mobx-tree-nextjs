import { AppProvider } from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <main>
                <AppProvider
                    i18n={en}
                    theme={{ colorScheme: "light" }}
                >
                    {children}
                </AppProvider>
            </main>
        </>
    );
}
