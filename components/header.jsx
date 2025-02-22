"use client"
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Header = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.refresh(); 
    }
  }, [isSignedIn, router]);
  return (
    <header className="fixed top-0 w-full border-b bg-gradient-to-b from-gray-900 to-black z-[1000]">

      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
        <div className='flex justify-center items-center text-xl gap-2'>
          <Image
            src="/logo2.svg"
            alt=""
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          /><strong className='text-white  gradient-title'>MockMeow AI </strong>
          </div>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button className="hover:bg-slate-800">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block text-white"> Dashboard </span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className=" bg-primary text-white hover:bg-black">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "shadow-xl",
              userPreviewMainIdentifier: "font-semibold",
            },
            }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;