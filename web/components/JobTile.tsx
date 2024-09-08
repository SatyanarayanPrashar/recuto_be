"use client";

import { auth } from "@/providers/auth-provider";
import axios from "axios";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export const JobTile = ({id, page, title, job_type, location, expected_salary, experience, source_url }:
    {   
        id: string | null;
        page:string | null;
        title:string | null,
        job_type:string | null,
        location:string | null,
        expected_salary:string | null,
        experience:string | null,
        source_url:string | null
    }) => {
    const [ user ] = useAuthState(auth);

    const apply = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/jobs/jobapplicants/`, {
                job_id: id,
                applicant_ids: user?.uid
            }).then(
                ()=>{
                    toast.success("Applied")
                }
            );
        } catch (error) {
            toast.error("Something went wrong!")
            console.error("Error creating profile:", error);
        }
    }

    return (
        <div className=" lg:w-[50rem] sm:w-[4rem] border rounded-[11px] p-5 my-5 shadow-[0px_0px_11.2px_1px_#DDDDDD]">
            <div className="flex gap-5">
                <div className="h-[3rem] w-[3rem] bg-red-600 rounded-lg"></div>
                <div className="">
                    <p className="text-[20px]">{title}</p>
                    <div className="flex gap-4 text-[14px] wrap">
                        <p>{title}</p>
                        <p>{job_type}</p>
                        {/* {industry?.split(', ').map((sector, index) => (
                            <div key={index} >{industry}</div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className="lg:flex sm:block mt-[20px] justify-between items-end">
                <div className="flex  gap-10 ">
                    <div>
                        <p className="text-[14px] font-[600] text-[#4D4D4D]">Location</p>
                        <p className="text-[17px] text-[#4D4D4D]">{location}</p>
                    </div>
                    <div>
                        <p className="text-[14px] font-[600] text-[#4D4D4D]">Job Type</p>
                        <p className="text-[17px] text-[#4D4D4D]">{job_type}</p>
                    </div>
                </div>
                <div className="flex gap-5 lg:mt-0 sm:mt-5">
                    {page=="jobs" ? 
                        <button className="flex-2 px-5 py-1 rounded-[7px] border h-[35px] text-[14px] text-[#4D4D4D] font-[500]">
                            <Link href={`/jobs/${id}`} className="mr-2">
                                View Applicants
                            </Link>
                        </button>
                        : <div></div>
                    }
                    <button className="flex-1 px-5 py-1 bg-[#928CD2] rounded-[7px] h-[35px] text-white text-[14px] font-[500]" onClick={
                        ()=> {apply()}
                    }> Apply </button>
                </div>
            </div>
        </div>
    )
}