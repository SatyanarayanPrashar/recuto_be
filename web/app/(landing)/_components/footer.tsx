"use client";

import Link from "next/link";

export const Footer = () => {

    return (
        <div className="lg:flex border items-center justify-center max-w-[75rem] gap-10 mb-[3rem]">
            <img src="join.png" alt="" />
            <div className="text-start font-sans ">
                <h1 className="text-5xl">
                    Get Started Today
                </h1>
                <p className="text-[27px] mt-[40px] mb-[40px]">
                    To apply to jobs with one-click and connect with founders and recruiters searching for your skills.
                </p>
                <div className="flex gap-5">
                    <button className="bg-[#0085FF] rounded-[7px] h-[30px] text-white pr-[20px] pl-[20px] text-[14px]">
                        <Link href="/jobs">
                            Explore Jobs 
                        </Link>
                    </button>
                    <button className="border rounded-[7px] h-[30px]  pr-[20px] pl-[20px] text-[14px]"> Create your profile </button>
                </div>
            </div>
        </div>
    )
}