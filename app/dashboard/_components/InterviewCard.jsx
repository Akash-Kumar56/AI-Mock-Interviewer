import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const InterviewCard = ({interview}) => {
  const router=useRouter();
  const onStart=()=>{
    router.push('/dashboard/interview/'+interview?.mockId)
  }
  const onFeedback=()=> {
    router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
  }
  return (
    <div className='border shadow-sm rounded-lg p-3 bg-blue-50 cursor-pointer'>
      <h2 className='font-bold text-blue-500'>{interview?.jobPosition}</h2>
      <h2 className='text-green-600'>{interview?.jobExperience} Years of experience</h2>
      <h2 className='text-gray-500'>Created At: {interview?.createdAt}</h2>
      <div className='flex justify-between gap-4'>
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>Feedback</Button>
        <Button size="sm" className="w-full" onClick={onStart}>Start</Button>
      </div>
    </div>
  )
}

export default InterviewCard;