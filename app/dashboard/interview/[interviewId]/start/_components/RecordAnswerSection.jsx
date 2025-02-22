"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex, interviewData}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const {user}=useUser();
  const [loading, setloading] = useState()
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) =>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))

  }, [results])

useEffect(()=>{
  if(!isRecording&&userAnswer.length>10)
  {
    UpdateUserAnswer()
  }
}, [userAnswer])

  const StartStopRecording= async ()=> {

    if(isRecording)
    {
      stopSpeechToText()
    }
    else {
      startSpeechToText()
    }
  }

  const UpdateUserAnswer = async()=> {
    console.log(userAnswer)
    setloading(true)
    const feedbackPromt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.Question+", User Answer:"+userAnswer+",Depends on question and user answer for give interview question"+
      "please give us rating for answer and feedback as area of improvement if any"+
      "in just 4 to 6 lines to improve it in JSON format with rating field and feedback field";
      const result = await chatSession.sendMessage(feedbackPromt);
      const mockJsonResp=(result.response.text()).replace('```json', '').replace('```', '');
      console.log(mockJsonResp);
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
      const resp=await db.insert(UserAnswer)
      .values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      })
      if(resp) {
        toast('User Answer recorded successfully')
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
      
      setloading(false);


  }



  return (
    <div className='flex flex-col justify-center items-center p-3'>
    <div className='flex flex-col md:my-10 justify-center items-center bg-secondary-foreground rounded-lg w-full'>
      <Image src={'/webcam1.png'} width={150} height={150} className='bg-secondary-foreground absolute' alt='Webcam' />
      <Webcam className='my-10' mirrored={true} style={{
        height: 300,
        width: '100%',
        zIndex: 10
      }}/>
      
    </div>
    <Button className="bg-slate-300 text-black hover:bg-slate-800 hover:text-white mt-2" onClick={StartStopRecording}>
      {isRecording? <h2 className='text-red-500 flex gap-2 animate-pulse'>
        <StopCircle style={{ width: "20px", height: "20px" }} /> Stop Recording..
      </h2> :
      <h2 className=' flex gap-2'>
      <Mic />Record Answer</h2>}</Button>
    
    </div>
  )
}

export default RecordAnswerSection;