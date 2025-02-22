"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Start = () => {
  const params = useParams();
  const interviewId = params?.interviewId;
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
 


  useEffect(() => {

      GetInterviewDetails();
    
  }, []);

  // Fetch interview details
  const GetInterviewDetails = async () => {
    try {
      console.log("Fetching details for:", interviewId);

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      console.log("Query Result:", result); 

        const jsonMockResp =JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
          

        setInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
     
    } catch (error) {
      console.error("Error fetching interview details:", error);
      setInterviewData();
      setInterviewQuestion();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
        {/* Questions */}
        <div className="order-2 md:order-1 md:py-12">
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />
        </div>
        {/* Video/audio Recordings */}
        <div className="order-1 md:order-2">
        <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData} />
        </div>
      </div> 
      <div className="flex justify-end gap-3 p-6">
       {activeQuestionIndex>0&&<Button onClick={() => setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
       {activeQuestionIndex!=mockInterviewQuestion?.length-1&& <Button onClick={()=> setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
       {activeQuestionIndex==mockInterviewQuestion?.length-1&&
       <Link href={`/dashboard/interview/${interviewId}/feedback`}>
       <Button>End Interview</Button>
       </Link>}
        </div>     
    </div>
  );
};

export default Start;
