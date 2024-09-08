"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
    const scrolled = useScrollTop();
    const [ user, setUser ] = useAuthState(auth);
    const googleAuth = new GoogleAuthProvider();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSignOut = () => {
        auth.signOut();
        setShowDropdown(false);
    };
    const login = async () => {
        const result = await signInWithPopup(auth, googleAuth);
    };
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className={cn(
            "z-50 bg-white fixed top-0 flex items-center justify-between w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <div>Recruto</div>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-[10vh]">
                <div>
                    <Link href="/">
                        For Company
                    </Link>
                </div>
                <div>
                    <Link href="/jobs">
                        Explore Jobs
                    </Link>
                </div>
                
                {!user && (
                    <div role="button" onClick={ login }>
                        Login
                    </div>
                )}
                {user && (
                    <div className="flex items-center justify-end">
                    <div className="relative">
                        <div className="flex items-center cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                            <Link href={`/profile/${user.uid}`} className="mr-2">
                                Profile
                            </Link>
                            {user.photoURL ? <img className="rounded-[9999px] h-8 w-8" src={user.photoURL} alt="User Profile" /> : <div></div> }
                            <ChevronDown  className="w-4 h-4 ml-2 text-gray-500" />
                        </div>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                <div className="py-1">
                                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleSignOut}>
                                        Sign Out
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}