import { useState, useEffect } from 'react';
import useTheme from '@/context/theme-hooks';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import CitySearch from './city-search';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure undefined or system default theme defaults to light mode
  const isLight = theme === 'light' || theme === undefined; 

  if (!mounted) return null; // Prevent rendering until theme is determined

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg py-2 supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-gray-800/30 shadow-lg shadow-gray-500/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={'/'}>
          <img
            src={isLight ? '/logo_light.png' : '/logo_dark.png'}
            alt="Nimbus Light"
            className="h-14"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Search */}
          <CitySearch />

          {/* Theme Toggle */}
          <div
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className={`flex items-center cursor-pointer transition-transform duration-500
                ${isLight ? 'rotate-0' : 'rotate-180'}
                `}
          >
            {isLight ? (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            ) : (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
