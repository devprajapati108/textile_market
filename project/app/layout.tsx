import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Textile Marketplace',
  description: 'Connect with manufacturers, agents, traders, and vendors in the textile industry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="text-xl font-bold text-indigo-600">
                    TextileMarket
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <a href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Login
                </a>
                <a href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-3">
                  Register
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}