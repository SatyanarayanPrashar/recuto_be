"use client";

export const HeroSection = () => {

    return (
        <div className="lg:flex items-center justify-center max-w-[75rem] mt-[-50px] mb-[8rem]">
            <div className="lg:flex sm:block items-center gap-">
                <div className="lg:w-[25rem] sm:w-[15rem]">
                    <img className="" src="hero1.png" alt="" />
                </div>
                <div>
                    <h1 className="text-[1.3rem] text-[#999999]">   
                        Boost your exposure to opportunities <br /> with RecrutoAI
                    </h1>
                    <h1 className="text-[3rem] font-bold mt-2">   
                        Find what’s next<span className="text-[#E9357B]">:</span>
                    </h1>
                </div>
                <div className="lg:w-[25rem] sm:w-[15rem]">
                    <img className="" src="hero2.png" alt="" />
                </div>
            </div>
        </div>
    )
}