import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useEffect, useState } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && 'bg-white/30 backdrop-blur-lg'}`}>
      <div className="flex items-center space-x-2 md:space-x-24">
        <Image
          src={'/cinemavault.png'}
          alt="header-logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-12 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Series</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">Popular</li>
          <li className="headerLink">Upcoming</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden xl:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-300/60 rounded-4xl pl-10 py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          <IoSearchOutline className="absolute sm:inline left-3 h-6 w-6 pointer-events-none" />
        </div>
        <div className="flex items-center">
          <Link href="/account">
            <Image src={'/avatar.png'} alt="avatar" width={50} height={50} />
          </Link>
          <IoMdArrowDropdown className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;
