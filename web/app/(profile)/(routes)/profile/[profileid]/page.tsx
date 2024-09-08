"use client";

import { Overview } from "@/app/(profile)/_components/Overview";
import { ProfileComp } from "@/app/(profile)/_components/profileComp";
import { Resume } from "@/app/(profile)/_components/Resume";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/providers/auth-provider";
import axios from "axios";
import { Profile } from "@/lib/profileobj";
import { CircularProgress } from "@mui/material";

const ProfileIdpage = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [ user ] = useAuthState(auth);
    const [profileContent, setProfileContent] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            axios.get(`http://127.0.0.1:8000/api/user/${user?.uid}/`)
                .then((response) => {
                    console.log("User data:", response.data);
                    setProfileContent(response.data as Profile);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                }
            );
        }
    }, [user?.uid]);

    const onSwitch = (tabName:string) => {
        setActiveTab(tabName);
    }
    
    if (loading) {
        return <div className="w-full flex justify-center"><CircularProgress size="25px" color="secondary" /></div>;
    }
   
    return (
        <div className="">
            <h1 className="text-[27px] font-[600] pb-5">Edit your Recruto profile</h1>
            <div className="flex text-[17px] gap-10 mb-[20px]">
                <div
                    role="button"
                    onClick={() => onSwitch('Overview')}
                    className={`cursor-pointer ${activeTab === 'Overview' ? 'font-[500] text-[black] border-b-2 border-black  py-1' : ' py-1'}`}
                >
                    Overview
                </div>
                <div
                    role="button"
                    onClick={() => onSwitch('Edit')}
                    className={`cursor-pointer ${activeTab === 'Edit' ? 'font-[500] text-[black] border-b-2 border-black  py-1' : ' py-1'}`}
                >
                    Edit
                </div>
                <div
                    role="button"
                    onClick={() => onSwitch('Resume/CV')}
                    className={`cursor-pointer ${activeTab === 'Resume/CV' ? 'font-[500] text-[black] border-b-2 border-black  py-1' : 'py-1'}`}
                >
                    Resume/CV
                </div>
            </div>
            {user !== null && user !== undefined  && (
                <>
                    {activeTab === "Overview" && <Overview user={user} profile={profileContent} />}
                    {activeTab === "Edit" && <ProfileComp user={user} profile={profileContent} />}
                    {activeTab === "Resume/CV" && <Resume />}
                </>
            )}
                <div className="h-[5rem]"></div>
        </div>
    );
}
 
export default ProfileIdpage;