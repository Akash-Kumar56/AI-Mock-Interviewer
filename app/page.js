import Hero from "@/components/hero";
import { HeartIcon } from "lucide-react";


export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <section className="w-full p-12 md:py-24 bg-gray-500">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-white">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-gray-50">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="text-gray-50">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-gray-50">Success Rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-gray-50">AI Support</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full p-12 md:py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex justify-center items-center">
         <h2 className="flex items-center gap-2 text-white font-bold md:text-xl text-m">Made with <span className="text-red-800"><HeartIcon /></span> by Akash Behera</h2>
        </div>
      </footer>
    </div>
  ) 
}
