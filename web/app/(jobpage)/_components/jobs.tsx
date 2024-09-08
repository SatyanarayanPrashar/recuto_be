"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { JobTile } from "@/components/JobTile";
import { Key } from "react";
import { Jobs } from "@/lib/jobsobj";

export const JobSection = () => {
    const [loading, setLoading] = useState(true);
    const [jobContent, setJobContent] = useState<Jobs[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchInitialContent(page);
    }, []);

    const fetchInitialContent = async (page: number) => {
        setLoading(true);
        let url = `http://127.0.0.1:8000/api/jobs/`;
        try {
            const response = await axios.get(url);
            console.log(response.data)
            setJobContent(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setLoading(false);
        }
    };
    return (
        <div className="lg:flex sm:block items-start justify-start max-w-[75rem] mt-[-50px] mb-[8rem] gap-10 text-start">
            <div>
                <div className="text-start">
                    <h1 className="text-[1.3rem] font-[600]">   
                        Trending Jobs<span className="text-[#E9357B]">:</span>
                    </h1>
                    {jobContent?.map((job: Jobs, index: Key | null | undefined) => (
                        <div key={index}>
                            <JobTile
                                id={job.id}
                                page="jobs"
                                title={job.title}
                                location={job.location}
                                job_type={job.job_type}
                                experience={job.experience}
                                source_url={job.source_url}
                                expected_salary={job.expected_salary}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:sticky sm:absolute top-[2rem] max-w-[28%]">
                <div className="border rounded-[11px] h-[20rem] px-4 py-4 mt-[3.3rem] shadow-[0px_0px_11.2px_1px_#DDDDDD]">
                    <h1 className="text-[1.3rem] font-[500]">   
                        Level up your job search<span className="text-[#E9357B]">:</span>
                    </h1>
                    <p className="text-[black] opacity-70 mt-5 ">
                        Check your Compatibility with the job with RecrutoAI, and get personalized feedback
                    </p>
                    <p className="text-[black] opacity-70 mt-5 mb-5">
                        Let founders and recruiters reach out to you
                    </p>
                    <div className="">
                        <input type="text" className="border rounded-[7px] w-full h-[35px] pl-[20px] pr-[50px] mb-3" placeholder="Your Email"/>
                        <button className="bg-[#0085FF] w-full rounded-[7px] h-[35px] text-white text-[15px]"> Sign up </button>
                    </div>
                </div>
                <div className="border rounded-[11px] px-4 py-4 mt-4 shadow-[0px_0px_11.2px_1px_#DDDDDD]">
                    <h1 className="text-[1.3rem] font-[500]">   
                        Hire Talent on Auto-Pilot<span className="text-[#E9357B]">:</span>
                    </h1>
                    <div className="">
                        <button className="bg-[#0085FF] w-full rounded-[7px] h-[35px] text-white text-[15px]"> Sign up </button>
                    </div>
                </div>
            </div>
        </div>
    )
}