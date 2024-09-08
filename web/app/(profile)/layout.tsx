"use client";

import { Navbar } from "@/components/navbar";
import { auth } from "@/providers/auth-provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect } from "next/dist/client/components/navigation";

const MainLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [user] = useAuthState(auth);
    return (
        <div className="">
            <Navbar />
            <main className="h-full pt-[5rem] lg:mx-[20rem] md:mx-[10rem] sm:mx-[20px]">
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout; 