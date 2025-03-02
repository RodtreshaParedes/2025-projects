import { PropsWithChildren } from 'react';
import Header from './header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-200 via-purple-300 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full opacity-50 blur-3xl"></div>
      </div>
      {/* header */}
      <Header />
      <main className="relative min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      {/* footer */}
      <footer className="relative -t bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg py-12 supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-gray-800/30 shadow-lg shadow-gray-500/20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 WeatherApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
