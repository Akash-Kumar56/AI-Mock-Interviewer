import React from 'react'
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

const Dashboard = () => {
  return (
    
    <div className='p-10 space-y-3 '>
      <h2 className='font-bold text-2xl text-white'>Dashboard</h2>
      <h2 className='text-gray-500'>Craete and start your AI Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <AddNewInterview />
      </div>
      {/* Interview lists */}
     
      <div>
      <InterviewList />
      </div>
    </div>
   
  )
}

export default Dashboard;