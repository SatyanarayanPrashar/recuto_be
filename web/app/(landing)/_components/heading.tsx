"use client";

export const Heading = () => {

    return (
        <div className="lg:flex items-center justify-center max-w-[75rem] mb-[8rem]">
            <div className="lg:text-start">
                <h1 className="text-5xl sm:text-10xl md:text-6xl font-[500]">
                    Find the perfect professional for you
                </h1>
                <p className="text-base sm:text-xl md:text-1xl mt-7 mb-7 text-slate-400">
                    Recruto is your 1-stop solution for hiring dream talent 
                </p>
                <div className="flex">
                    <input type="text" className="border rounded-[7px] max-w-[400px] h-[40px] pl-[20px] pr-[50px]" placeholder="Who are you looking for?"/>
                    <button className="bg-[#0085FF] rounded-[7px] h-[40px] text-white pr-[20px] pl-[20px] ml-[20px] text-[15px]"> Search </button>
                </div>
                <p className="text-base sm:text-l md:text-1l mb-7 text-slate-400">
                    Popular: Web developer, product designer, app developer
                </p>
            </div>
            <img className="lg:w-[35rem] sm:w-[25rem]" src="hero-image.png" alt="" />
        </div>
    )
}