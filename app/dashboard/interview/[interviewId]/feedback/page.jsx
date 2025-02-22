"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from '@/components/ui/button'


const FeedbackPage = () => {
  const params = useParams();
  const interviewId = params?.interviewId;
  const router=useRouter()
  const [feedback, setFeedback]=useState([])
  const [overallRating, setOverallRating] = useState(null);
  useEffect(()=> {
    GetFeedback();
  }, [])

  const GetFeedback=async()=>{
    const result=await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,interviewId))
    .orderBy(UserAnswer.id);

    console.log(result);
    setFeedback(result);

    // calculate the overal rating
  if (result.length > 0) {
    const totalScore = result.reduce((sum, item) => sum + (Number(item.rating) || 0), 0);
    const averageRating = (totalScore / result.length).toFixed(1);
    setOverallRating(averageRating);
  } else {
    setOverallRating(null);
  }

  }

  

  return (
    <div className='p-10'>
      {feedback?.length==0 ? <h2 className='text-white text-xl'>No Interview Feedback Record Found</h2> :
      <>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation</h2>
      <h2 className='text-2xl font-bold text-white'>Here is your interview feedback</h2>
      <h2 className='text-blue-500 text-lg my-3'>Your overall interview rating: <strong className='text-red-500'>{overallRating}/10</strong></h2>

      <h2 className='text-white'>Find below interview questions with correct answer, your answer and feedback for improvement</h2>
      {feedback&&feedback.map((item,index) => (
        <Collapsible key={index}>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg text-left my-3'>{item.question}</CollapsibleTrigger>
        <CollapsibleContent>
        <div className='flex flex-col gap-2'>
          <h2 className='p-2 border rounded-lg text-red-500'>
            <strong>Rating:</strong>
            {item.rating}
          </h2>
          <h2 className='p-2 border rounded-lg text-sm bg-red-50 text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
          <h2 className='p-2 border rounded-lg text-sm bg-green-50 text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
          <h2 className='p-2 border rounded-lg text-sm bg-blue-50 text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
        </div>
        </CollapsibleContent>
      </Collapsible>
      
      ))}
         </>
    }
      <Button onClick={()=>router.replace('/dashboard')} className="flex justify-end items-end">Go Home</Button>
   
    </div>
  )
}

export default FeedbackPage;