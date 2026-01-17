import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Test Case Migration Tool | Convert Selenium, Cypress, Playwright',
    description: 'Free browser-based tool to convert automated tests between Selenium, Cypress, and Playwright frameworks with Google Gemini AI-powered accuracy. Support for Java, Python, C#, JavaScript, TypeScript.',
    keywords: ['test automation', 'selenium', 'cypress', 'playwright', 'test migration', 'code conversion', 'QA tools', 'SDET', 'Google Gemini'],
    authors: [{ name: 'Test Migration Tool' }],
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#8b5cf6',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
