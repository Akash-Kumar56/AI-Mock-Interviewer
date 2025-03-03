"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc } from 'drizzle-orm';
import React, { useEffect } from 'react'
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import InterviewCard from './InterviewCard';

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([])
  const {user}=useUser();

  useEffect(()=>{
    user&&GetInterviewList()

  }, [user])

  const GetInterviewList=async () => {
    const result=await db.select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(MockInterview.id))

    console.log(result)
    setInterviewList(result);
  }
  return (
    <div>
      <h2 className='my-5 font-bold'>Previous Mock Interview List</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {interviewList&&interviewList.map((interview, index)=> (
          <InterviewCard 
          interview={interview}
          key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;