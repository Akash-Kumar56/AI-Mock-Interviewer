"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Description } from '@radix-ui/react-dialog'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'



const AddnewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState()
  const [jobDesc, setJobDesc] = useState()
  const [jobExperience, setJobExperience] = useState()
  const [loading, setLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([])
  const router = useRouter()
  const {user}=useUser()

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
  
    const InputPrompt = "Job Position: " +jobPosition+ ", Job Description: " +jobDesc+ ", Years of Experience: " +jobExperience+ ", Depends on Job Position, Job Description & Years of Experience give us " +process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+ " interview question along with Answer in JSON format, Give us Question and Answer as field on JSON";
    
    
      const result = await chatSession.sendMessage(InputPrompt);
      const textResponse = result.response.text();
      const MockJsonResp = textResponse.replace('```json', '').replace('```', '');
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp)
    
      if(MockJsonResp)
      {

        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp, 
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        }).returning({ mockId: MockInterview.mockId });
  
        console.log("Inserted ID:", resp);
        if(resp) {
          setOpenDialog(false)
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
      }
      else{
        console.log("error")
      }
  
    setLoading(false);
  };
  


  return (
    <div className=''>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      onClick={() => setOpenDialog(true)}>
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job</DialogTitle>
            <DialogDescription>
              <form action="" onSubmit={onSubmit}>
              <div>
                <h2>Add details about your job position/role, Job description and years of experience</h2>
              </div>
              <div className='mt-7 my-5'>
                <label htmlFor="">Job Role/Job Position</label>
                <Input placeholder="Ex. Full Stack Developer" required onChange={(e) => setJobPosition(e.target.value)} />
              </div>
              <div className='my-5'>
              <label htmlFor="">Job Description/ Tech Stack (In Short)</label>
              <Textarea placeholder='Ex. React, Angular, NodeJs, MySql, JavaScript, NextJs etc.' required onChange={(e) => setJobDesc(e.target.value)} />
              </div>
              <div className=' my-5'>
                <label htmlFor="">Years of experience</label>
                <Input placeholder="Ex. 5" type="number" max="50" required onChange={(e) => setJobExperience(e.target.value)} />
              </div>

              <div className='flex gap-5 justify-end'>
                <Button type="button" variant="ghost" className="border" onClick={() => setOpenDialog(false)}>Cancle</Button>
                <Button type="submit" disabled={loading}>
                  {
                    loading ?
                    <>
                    <LoaderCircle className='animate-spin'/>'Generating...'</> : 'Start Interview'
                  }
                  </Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddnewInterview;