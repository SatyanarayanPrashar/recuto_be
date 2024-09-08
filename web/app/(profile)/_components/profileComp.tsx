"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import { Profile } from "@/lib/profileobj";
import axios from "axios";
import { toast } from "react-toastify";

export const ProfileComp = ({ user, profile }: { user: User, profile: Profile | null }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        g_token: user.uid,
        full_name: profile?.full_name,
        profile_photo: profile?.profile_photo,
        location: profile?.location,
        preferred_roles: profile?.preferred_roles,
        bio: profile?.bio,
        skills: profile?.skills,
        exp_title: profile?.exp_title,
        exp_company: profile?.exp_company,
        exp_description: profile?.exp_description,
        project_title: profile?.project_title,
        project_link: profile?.project_link,
        project_description: profile?.project_description,
        portfolio_link: profile?.portfolio_link,
        linkedin_link: profile?.linkedin_link,
        github_link: '',
        anyother_link: '',
    });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.stringify(formData);
            console.log(jsonData);
            await axios.put(`http://127.0.0.1:8000/api/user/${user?.uid}/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                ()=>{
				    toast.info("Saved :)");
                    window.location.reload();
                }
            );
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    if (loading) {
        return <div className="w-full flex justify-center"><CircularProgress size="25px" color="secondary" /></div>;
    }

    if (!profile) {
        return (
            <div className="border rounded-md p-7 flex flex-col gap-y-5">
                Create Profile first!
            </div>
        );
    }

    return (
        <div>
            <div className="border rounded-md p-7 flex flex-col gap-y-5">
                <div>
                    <p className="font-[600] text-[15px]">Your Name*</p>
                    <input
                        className="border rounded-lg px-4 max-w-[20rem] h-[40px] focus:outline-none"
                        placeholder="Your full name"
                        onChange={handleChange}
                        defaultValue={profile?.full_name || ""}
                        name="full_name"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <img className="rounded-[99rem] w-[60px] h-[60px] border" src={profile?.profile_photo !== "" && profile?.profile_photo !== null && profile?.profile_photo !== "NA"
                        ? profile?.profile_photo
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdpsO7bCr_BQtPvuwa58mo9hCZ5ebZqhVow&usqp=CAU"} alt=""
                    />
                    <div className="border rounded-lg px-4 py-[7px] hover:cursor-pointer hover:bg-slate-100"
                        role="button"
                        onClick={()=>{}}
                    >
                        Upload a new photo
                    </div>
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Where are you based?*</p>
                    <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                        placeholder="Place where you reside"
                        defaultValue={profile?.location || ""}
                        onChange={handleChange}
                        name="location"
                    />
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Select Prefered Role</p>
                    <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                        placeholder="Role you are looking for"
                        defaultValue={profile?.preferred_roles || ""}
                        onChange={handleChange}
                        name="preferred_roles"
                    />
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Bio</p>
                    <textarea
                        className="border rounded-lg px-4 py-2 w-full resize-y h-[100px] focus:outline-none"
                        placeholder="Tell more bout yourself"
                        defaultValue={profile?.bio || ""}
                        onChange={handleChange}
                        name="bio"
                    />
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Skills</p>
                    <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none"
                        placeholder="Role you are looking for"
                        defaultValue={profile?.skills || ""}
                        onChange={handleChange}
                        name="skills"
                    />                 
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Experience</p>
                    <div className="flex gap-3 justify-center items-center">
                        <p className="w-[7rem]">Title</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Title of the position"
                            defaultValue={profile?.exp_title || ""}
                            onChange={handleChange}
                            name="exp_title"
                        /> 
                    </div>
                    <div className="flex gap-3 justify-center items-center mt-2">
                        <p className="w-[7rem]" >Company</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Company name"
                            defaultValue={profile?.exp_company || ""}
                            onChange={handleChange}
                            name="exp_company"
                        /> 
                    </div>
                    <div className="flex gap-3 items-start mt-2">
                        <p className="w-[7rem]">Description</p>
                        <textarea className="border rounded-lg px-4 py-2 w-full resize-y h-[100px] focus:outline-none "
                            placeholder="Details"
                            defaultValue={profile?.exp_description || ""}
                            onChange={handleChange}
                            name="exp_description"
                        /> 
                    </div>
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Project</p>
                    <div className="flex gap-3 justify-center items-center">
                        <p className="w-[7rem]">Title</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Title of the project"
                            defaultValue={profile?.project_title || ""}
                            onChange={handleChange}
                            name="project_title"
                        /> 
                    </div>
                    <div className="flex gap-3 justify-center items-center mt-2">
                        <p className="w-[7rem]" >Link</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Link for the project"
                            defaultValue={profile.project_link || ""}
                            onChange={handleChange}
                            name="project_link"
                        /> 
                    </div>
                    <div className="flex gap-3 items-start mt-2">
                        <p className="w-[7rem]">Description</p>
                        <textarea className="border rounded-lg px-4 py-2 w-full resize-y h-[100px] focus:outline-none " 
                            placeholder="Details"
                            defaultValue={profile?.project_description || ""}
                            onChange={handleChange}
                            name="project_description"
                        /> 
                    </div>
                </div>
                <div>
                    <p className="font-[600] text-[15px]">Links</p>
                    <div className="flex gap-3 justify-center items-center">
                        <p className="w-[7rem]">Portfolio</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Title of the project"
                            defaultValue={profile?.portfolio_link || ""}
                            onChange={handleChange}
                            name="portfolio_link"
                        /> 
                    </div>
                    <div className="flex gap-3 justify-center items-center mt-2">
                        <p className="w-[7rem]" >LinkedIn</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Link for the project"
                            defaultValue={profile.linkedin_link || ""}
                            onChange={handleChange}
                            name="linkedin_link"
                        /> 
                    </div>
                    <div className="flex gap-3 items-start mt-2">
                        <p className="w-[7rem]">Github</p>
                        <input className="border rounded-lg px-4 w-full h-[40px] focus:outline-none "
                            placeholder="Details"
                            defaultValue={profile?.github_link || ""}
                            onChange={handleChange}
                            name="github_link"
                        /> 
                    </div>
                </div>
                <div className="border rounded-lg w-[7rem] text-[white] flex justify-center px-4 py-[7px] hover:cursor-pointer bg-blue-400 hover:bg-blue-500 mt-2"
                    role="button"
                    onClick={handleSubmit}
                >Save</div>
            </div>
        </div>
    )
}