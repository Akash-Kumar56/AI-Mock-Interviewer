"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

import Link from "next/link";
import { useParams } from "next/navigation";

const Interview = () => {
  const params = useParams();
  const interviewId = params?.interviewId;
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState();

  useEffect(() => {
  
      GetInterviewDetails();
  
  }, []); 

  // Fetch interview details
  const GetInterviewDetails = async () => {
   
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.warn("No interview data found!");
      }
    
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mt-5 text-white">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-5">

      {/* Display Interview Data */}
      <div className="flex flex-col gap-5 ">
        {interviewData ? (
          <>
          <div className="flex flex-col p-5 rounded-lg border gap-5 border-primary bg-slate-200">
          <h2><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
          <h2><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
          <h2><strong>Years of experience:</strong> {interviewData.jobExperience}</h2>
          </div>
          <div className="p-5 border-2 rounded-lg border-primary bg-gray-800">
            <h2 className="flex gap-2 items-center text-primary-foreground"><Lightbulb /><strong>Informations</strong></h2>
            <h2 className="mt-3 text-primary-foreground">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
          </>
        ) : (
          <p className="text-blue-300">Loading interview details...</p>
        )}
      </div>

      {/* Webcam Toggle */}
      <div>
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{ height: 300, width: 300 }}
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-full p-16 bg-gray-800 text-cyan-300 rounded-lg border " />
            <Button className="mt-5 w-full bg-slate-200 text-black hover:text-primary-foreground" onClick={() => setWebCamEnabled(true)}>
              Enable webcam & microphone
            </Button>
          </>
        )}
      </div>

      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
        <Button>Start</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
