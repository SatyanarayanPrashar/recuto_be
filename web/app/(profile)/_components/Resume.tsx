"use client";

import { FileText } from "lucide-react";

export const Resume = () => {

    return (
        <div className="border rounded-md p-7 flex gap-10">
            <div>
                <h2 className="font-[600] mb-4">Upload your recent resume or CV</h2>
                <p className="text-[14px]">Upload your most up-to-date resume <br /> File types: DOC, DOCX, PDF, TXT</p>
            </div>
            <div className="w-full">
                <p><a>View your resume</a> or upload a new one below</p>
                <div className="h-[7rem] mt-4 w-full border-dotted border border-black p-4 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center" >
                    <FileText color="blue" size="35px" />
                    <p className="text-center text-[blue]">Upload new file</p>
                </div>
            </div>
            </div>
        </div>
    )
} 