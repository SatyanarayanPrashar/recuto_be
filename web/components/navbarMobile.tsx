"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

export const NavbarMobile = () => {
    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-white fixed top-0 flex items-center justify-between w-full p-6",
            scrolled && ""
        )}>
            <div>Recruto</div>
            <Menu onClick={()=>{}}/>
        </div>
    )
}