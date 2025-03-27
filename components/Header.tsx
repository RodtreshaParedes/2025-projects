import Image from "next/image";
import {IoSearchOutline} from "react-icons/io5";
import {IoMdArrowDropdown} from "react-icons/io";
import {useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {RxHamburgerMenu} from "react-icons/rx";
import {useRouter} from "next/router"
import Link from "next/link";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {logout, user} = useAuth();
    const [selectedImage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-50 transition-all ${isScrolled ? "bg-[#ffffff12] backdrop-blur-lg shadow-md" : ""}`}>
            {/* Left Section: Logo, Burger Menu, and Navigation */}
            <div className="flex items-center space-x-6">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src={"/cinemavault.png"}
                        alt="header-logo"
                        width={100}
                        height={100}
                        className="cursor-pointer object-contain"
                    />
                </Link>

                {/* Burger Menu (Mobile Navigation) */}
                <div
                    className="relative flex items-center lg:hidden"
                    onMouseEnter={() => setIsBurgerOpen(true)}
                    onMouseLeave={() => setIsBurgerOpen(false)}
                >
                    <RxHamburgerMenu className="h-6 w-6 cursor-pointer text-[#364153]"/>
                    {isBurgerOpen && (
                        <div
                            className="absolute left-0 top-full w-48 rounded-lg border border-white/20 bg-white/10 p-3 font-light shadow-lg backdrop-blur-md">
                            <ul className="flex flex-col space-y-2">
                                <li className="cursor-pointer rounded-md p-2 text-black hover:bg-white/20">
                                    <Link href="/" onClick={() => setIsBurgerOpen(false)}>Home</Link>
                                </li>
                                <li className="cursor-pointer rounded-md p-2 text-black hover:bg-white/20">
                                    <Link href="/series" onClick={() => setIsBurgerOpen(false)}>Series</Link>
                                </li>
                                <li className="cursor-pointer rounded-md p-2 text-black hover:bg-white/20">
                                    <Link href="/movies" onClick={() => setIsBurgerOpen(false)}>Movies</Link>
                                </li>
                                <li className="cursor-pointer rounded-md p-2 text-black hover:bg-white/20">
                                    <Link href="/mylist" onClick={() => setIsBurgerOpen(false)}>My List</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Navigation Links (Hidden on Small Screens) */}
                <ul className="hidden space-x-12 lg:flex">
                    <li className="headerLink">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="headerLink">
                        <Link href="/series">Series</Link>
                    </li>
                    <li className="headerLink">
                        <Link href="/movies">Movies</Link>
                    </li>
                    <li className="headerLink">
                        <Link href="/mylist">My List</Link>
                    </li>
                </ul>
            </div>

            {/* Right Section: Search & Profile Dropdown */}
            <div className="flex items-center space-x-6">
                {/* Search Input (Hidden on Small Screens) */}
                <form onSubmit={handleSearch} className="relative hidden items-center xl:flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full bg-[#d1d5dc88] px-3 py-2 pl-10 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute left-3">
                        <IoSearchOutline className="h-6 w-6 text-[#364153]"/>
                    </button>
                </form>

                {/* Profile Dropdown */}
                <div
                    className="relative flex items-center"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <Image
                        src={selectedImage || user?.photoURL || "/avatar.png"}
                        alt="avatar"
                        width={50}
                        height={50}
                        className="cursor-pointer rounded-full"
                    />
                    <IoMdArrowDropdown className="h-6 w-6 cursor-pointer text-[#364153]"/>
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 top-full w-48 rounded-lg border border-white/20 bg-white/10 p-3 font-light shadow-lg backdrop-blur-md">
                            <ul>
                                <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                                    <DialogTrigger asChild>
                                        <li
                                            className="cursor-pointer rounded-md p-2 text-black hover:bg-white/20"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            Profile
                                        </li>
                                    </DialogTrigger>
                                    <DialogContent
                                        className="max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg">
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="profile-image-upload" className="relative cursor-pointer">
                                                <div
                                                    className="relative h-20 w-20 overflow-hidden rounded-full border border-white/20 shadow-lg">
                                                    <Image
                                                        key={selectedImage}
                                                        src={selectedImage || user?.photoURL || "/avatar.png"}
                                                        alt="User Profile"
                                                        width={80}
                                                        height={80}
                                                        className="h-full w-full rounded-full object-cover"
                                                    />
                                                </div>
                                            </label>
                                            <h2 className="text-lg font-semibold text-white">
                                                {user?.displayName || "User"}
                                            </h2>
                                            <p className="text-sm text-gray-300">{user?.email}</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <li className="cursor-pointer rounded-md p-2 text-red-500 hover:bg-white/20"
                                    onClick={logout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
