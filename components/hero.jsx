"use client"
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Hero = () => {
  const imageRef = useRef(null);
  const isSignedIn = useUser();
  const router = useRouter();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 100;
    if (scrollPosition > scrollThreshold){
      imageElement.classList.add("scrolled")
    }
    else {
      imageElement.classList.remove("scrolled")
    }
  };
  window.addEventListener("scroll", handleScroll)
  }, [])

  const handleRedirect = () => {
    if(isSignedIn) {
      router.push("/dashboard")
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 text-center bg-gradient-to-b from-gray-900 to-black
 ">
      <div className="max-w-3xl mx-auto px-6">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl gradient-title">
          Get Hired Faster with  
          <br />
          <span className="">AI Mock Interviews</span>
        </h1>

        {/* Subheading */}
        <p className=" mt-6 text-lg md:text-xl text-gray-600">
          Your personal AI-powered interview coach that tailors questions 
          based on your job role, experience, and skills —helping you practice, 
          receive feedback, and improve your performance.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          
          <Button onClick={handleRedirect} className="px-6 py-3 text-lg bg-white text-black animate-pulse hover:text-white">Start Your AI Interview</Button>
        </div>
      </div>
      <div className="hero-image-wrapper">
      <div className="mt-5 p-10 hero-image" ref={imageRef}>
        <Image src="/Aimage.jpg" alt="Logo" width={1180} height={680} className="rounded-lg shadow-2xl border mx-auto "/>
      </div>
      </div>
    </section>
  );
};

export default Hero;

