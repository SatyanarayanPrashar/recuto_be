"use client";

import { ArrowRight } from "lucide-react";

export const Feature = () => {

    return (
        <div className="justify-center align-center lg:flex lg:w-[75rem] lg:h-[90rem] sm:h-[100rem] bg-[#51619A] rounded-[31px] gap-[7rem] mb-[5rem] py-[6rem]">
            <div className="lg:sticky sm:absolute top-[10rem] lg:h-[24rem] sm:h-auto lg:max-w-[35rem] sm:max-w-[18rem] text-start font-sans text-white">
                <h1 className="text-5xl">
                     Meet <span className="font-bold">Recruto<span className="text-[#E9357B]">AI</span></span>
                </h1>
                <h1 className="text-5xl">
                    Hiring on Auto-Pilot.
                </h1>
                <p className="lg:w-[28rem] sm:w-auto text-[24px] mt-[40px] mb-[40px]">
                    Recruto does all - Generate JD, Set custom screening, Shortlist Candidates,
                    Setup interviews — all in a matter of days.
                    It's that easy.
                </p>
                <button className="flex items-center justify-center gap-2 bg-[#0085FF] rounded-[7px] h-[40px] text-white pr-[20px] pl-[20px] text-[15px] mb-[30px]"> Hire Talent <ArrowRight size={"15px"} /> </button>
            </div>
            <div className="lg:w-[28rem] sm:w-[15rem] h-[104rem]">
                <img className="h-[74rem]" src="total.png" alt="" />
            </div>
        </div>
    )
}