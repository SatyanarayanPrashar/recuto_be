"use client"

import { JobTile } from "@/components/JobTile";
import { Applicants } from "@/components/applicants";
import { Jobs } from "@/lib/jobsobj";
import { Profile } from "@/lib/profileobj";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { profile } from "console";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Candidate {
    job_id: string | null;
    applicant_ids: string | null;
}

const JobIdpage = () => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true);
  const [job, setjobContent] = useState<Jobs | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [profileContent, setProfileContent] = useState<Profile | null>(null);

  useEffect (() => {
      setLoading(true);
      const jobId = pathname.split('/').pop();

      axios.get(`http://127.0.0.1:8000/api/jobs/jobid=${jobId}`)
      .then((response) => {
          setjobContent(response.data as Jobs);
          fetchCandidates(jobId);
      })
      .catch((error) => {
          console.error("Error fetching job data:", error);
          setLoading(false);
      });
  }, []);

  const fetchCandidates = (jobId: string | undefined) => {
      setLoading(true);
        console.log("triggered")
      axios.get(`http://127.0.0.1:8000/api/jobs/jobapplicantIds/${jobId}/`)
      .then((response) => {
          setCandidate(response.data);
          console.log(response.data.applicant_ids);
          CandidateDetails(response.data.applicant_ids, 0);
          console.log("ye wala hai abhi")
          setLoading(false);
      })
      .catch((error) => {
          console.error("Error fetching candidate data:", error);
          setLoading(false);
      });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const CandidateDetails = (userid: string | "", index: number | "") => {
    setLoading(true);
    const userIds = userid.split(',');
    const currentUserId = userIds[currentIndex || 0];
    axios.get(`http://127.0.0.1:8000/api/user/${currentUserId}/`)
        .then((response) => {
          setProfileContent(response.data as Profile);
          console.log(currentIndex);
          console.log(currentUserId)
          setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    );
  };
  const handleNext = () => {
    if (currentIndex < (candidate?.applicant_ids?.split(',')?.length || 0) - 1) {
      new Promise<void>((resolve) => {
        setCurrentIndex(currentIndex + 1);
        resolve();
      }).then(() => {
        console.log("next");
        console.log(currentIndex);
        CandidateDetails(candidate?.applicant_ids || "", currentIndex + 1);
      });
    }else{
      toast.info("No more candidates");
    }
  };

  const handlePrevious = () => {
      if (currentIndex > 0) {
        new Promise<void>((resolve) => {
          setCurrentIndex(currentIndex - 1);
          resolve();
        }).then(() => {
          console.log("next");
          console.log(currentIndex);
          CandidateDetails(candidate?.applicant_ids || "", currentIndex + 1);
        });
      }else{
        toast.info("No more candidates");
      }
  };
  
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start mt-[-60px]">
        <JobTile
            page="applicants"
            job_id={job?.job_id || ""}
            title={job?.title || ""}
            company={job?.company || ""}
            job_type={job?.job_type || ""}
            location={job?.location || ""}
            industry={job?.industry || ""}
            remote_policy={job?.remote_policy || ""}
        />

        <div className="lg:w-[50rem] sm:w-[4rem] flex justify-between">
          <div
            className="flex"
            role="button"
            onClick={ ()=> {handlePrevious()} }
          >
            <ChevronsLeft />
            Previous
          </div>
          <div
            className="flex"
            role="button"
            onClick={ ()=> {handleNext()} }
          >
            Next
            <ChevronsRight />
          </div>
        </div>

        {loading
          ? <div className="w-full flex justify-center"><CircularProgress size="25px" color="secondary" /></div>
          : <Applicants profile={profileContent}/>
        }
        
        <p>Designed and Built by Satya</p>
      </div>
    </div>
  );
}

export default JobIdpage;