"use client";
import axios from "axios";
import { ExternalLink, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import { Profile } from "@/lib/profileobj";

export const Overview = ({ user, profile }: { user: User, profile: Profile | null }) => {
    const [profileContent, setProfileContent] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");

    const handleCreateProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/api/user/", {
                g_token: user?.uid,
                full_name: fullName,
            });
            console.log("Profile created:", response.data);
            setProfileContent(response.data);
        } catch (error) {
            console.error("Error creating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="w-full flex justify-center"><CircularProgress size="25px" color="secondary" /></div>;
    }

    if (!profile) {
        return (
            <div className="border rounded-md p-7 flex flex-col gap-y-5">
                <p>By Creating your profile on Recruto you agree with our <span><a className="text-[blue] hover:underline" href="http://example.com" target="_blank" rel="noopener noreferrer">terms and conditions</a></span></p>
                <div className="flex gap-5 items-center">
                    <input className="border rounded-lg px-4 w-full py-1 focus:outline-none "
                        placeholder="Enter your Full name"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div role="button"  onClick={handleCreateProfile} className="border rounded-md py-1 px-10 bg-blue-100 hover:bg-blue-300"> Create </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <p>What recruiters will see</p>
            <div className="border rounded-lg p-7 flex flex-col gap-y-5">
                <div className="flex gap-3">
                    <img className="rounded-[99rem] w-[60px] h-[60px] border" src={profile?.profile_photo !== "" && profile?.profile_photo !== null && profile?.profile_photo !== "NA"
                        ? profile?.profile_photo
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdpsO7bCr_BQtPvuwa58mo9hCZ5ebZqhVow&usqp=CAU"} alt=""
                    />
                    <div>
                        <h1 className="font-[600] text-[20px]">{profile?.full_name}</h1>
                        <div className="flex items-center">
                            <p>{profile?.location}</p>
                            <div className="flex gap-5 hover:cursor-pointer ml-10">
                                <a href={profile?.linkedin_link || ""} target="_blank" rel="noopener noreferrer"><Linkedin size="18px" color="grey"/></a>
                                <a href={profile?.github_link || ""} target="_blank" rel="noopener noreferrer"><Github size="18px" color="grey"/></a>
                                <a href={profile?.portfolio_link || ""} target="_blank" rel="noopener noreferrer"><ExternalLink size="18px" color="grey"/></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-[14px] text-[#9A9A9A] mb-[10px]">Bio</p>
                    <p className="ml-[15px]">{profile?.bio}</p>
                </div>
                <div>
                    <p className="text-[14px] text-[#9A9A9A] mb-[10px]">Skills</p>
                    <p className="ml-[15px] flex gap-3 flex-wrap">
                        {profile?.skills?.split(', ').map((skill, index) => (
                            <div key={index} className="rounded-lg bg-slate-200 py-[4px] px-[15px]">{skill}</div>
                        ))}
                    </p>
                </div>
                <div>
                    <p className="text-[14px] text-[#9A9A9A] mb-[10px]">Experience</p>
                    <div className="flex ml-[15px]">
                        <img className="rounded-lg w-[50px] h-[50px] border" src="https://cdn.vectorstock.com/i/1000x1000/31/74/company-icon-simple-element-vector-27083174.webp" alt="" />
                        <div className="ml-[15px]">
                            <p className="font-[500]">{profile?.exp_title}</p>
                            <p className="text-[14px]">{profile?.exp_company}</p>
                            <p className="text-[14px]">{profile?.exp_description}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-[14px] text-[#9A9A9A] mb-[10px]">Project</p>
                    <div className="flex ml-[15px]">
                        <img className="rounded-lg w-[50px] h-[50px] border" src="https://www4.instagantt.com/assets/63c5e29f1b5bc83fe0af2489/6424d753f8eb7a9e69c372fc_Gantt%20Chart%20Online%20Software%20Instagantt%20Ideation%202.webp" alt="" />
                        <div className="ml-[15px]">
                            <p className="font-[500]">{profile?.project_title}</p>
                            <p className="text-[14px] hover:cursor-pointer hover:text-[blue]"><a href={profile?.project_link || ""} target="_blank" rel="noopener noreferrer">Visit</a></p>
                            <p className="ml-[15px] mt-[15px]">{profile?.project_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
