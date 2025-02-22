"use client"
import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useState } from 'react';

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);

      // Change state when speech starts and ends
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg space-y-3'>
      {/* Question List */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 md:block'>
        {/* Show all questions on medium & larger screens */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
          {mockInterviewQuestion.map((question, index) => (
            <h2 
              key={index} 
              className={`w-12 h-12 flex justify-center items-center bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${activeQuestionIndex === index ? '!bg-primary text-white' : ''}`
              }
            >
              Q {index + 1}
            </h2>
          ))}
        </div>

        {/* Show only active question index on small screens */}
        <div className="md:hidden flex justify-start">
          <h2 
            className="w-12 h-12 flex justify-center items-center bg-primary text-white rounded-full text-sm"
          >
            Q {activeQuestionIndex + 1}
          </h2>
        </div>
      </div>

      {/* Active Question */}
      <h2 className='text-white'>
        {mockInterviewQuestion[activeQuestionIndex]?.Question}
      </h2>

      {/* Volume Icon */}
      <Volume2 
        className={`cursor-pointer ${isSpeaking ? 'text-blue-500 animate-pulse' : 'text-white'}`} 
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)} 
      />

      {/* Note Section */}
      <div className='border rounded-md bg-primary p-2 !mt-5 max-w-sm sm:max-w-md md:max-w-lg'>
        <h2 className='flex gap-1 items-center text-white text-xs sm:text-sm'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-white text-xs sm:text-sm py-1 sm:py-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
};

export default QuestionSection;

