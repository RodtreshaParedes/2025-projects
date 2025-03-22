import Image from "next/image";
// import Link from "next/link";
import {IoSearchOutline} from "react-icons/io5";
import {IoMdArrowDropdown} from "react-icons/io";
import {useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {logout, user} =
        useAuth();
    const [uploading] = useState(false);
    const [selectedImage] = useState<string | null>(null);

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
        <header className={`${isScrolled && "bg-[#ffffff12] backdrop-blur-lg"}`}>
            <div className="flex items-center space-x-0.5 md:space-x-20">
                <Image
                    src={"/cinemavault.png"}
                    alt="header-logo"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                <ul className="hidden space-x-12 lg:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">Series</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">Popular</li>
                    <li className="headerLink">Upcoming</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden items-center xl:flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full bg-[#d1d5dc88] px-3 py-2 pl-10 focus:outline-none"
                    />
                    <IoSearchOutline className="pointer-events-none absolute left-3 h-6 w-6 sm:inline"/>
                </div>

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
                    <div className="relative">
                        <IoMdArrowDropdown className="h-6 w-6 cursor-pointer text-[#364153]"/>
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 top-full mt-3.5 w-48 rounded-lg border border-white/20 bg-white/10 p-3 font-light shadow-lg backdrop-blur-md">
                                <ul>
                                    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                                        <DialogTrigger asChild>
                                            <li
                                                className="cursor-pointer rounded-md p-2 text-black hover:bg-white/20"
                                                onClick={() => setIsProfileOpen(true)}
                                            >
                                                Profile
                                            </li>
                                        </DialogTrigger>
                                        <DialogContent
                                            className="max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg">
                                            <div className="flex flex-col items-center">
                                                <label
                                                    htmlFor="profile-image-upload"
                                                    className="relative cursor-pointer"
                                                >
                                                    {/* Wrapper for circular shape and preventing overflow */}
                                                    <div
                                                        className="relative h-20 w-20 overflow-hidden rounded-full border border-white/20 shadow-lg">
                                                        {/* Profile Image (uses priority loading to ensure updates) */}
                                                        <Image
                                                            key={selectedImage} // Forces re-render when image changes
                                                            src={
                                                                selectedImage || user?.photoURL || "/avatar.png"
                                                            }
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
                                                <div className="relative mt-4 w-full">
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <li
                                        className="cursor-pointer rounded-md p-2 text-red-500 hover:bg-white/20"
                                        onClick={logout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
