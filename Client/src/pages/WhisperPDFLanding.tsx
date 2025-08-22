import { FileUp, MessageCircleDashed, Target } from 'lucide-react';
import React from 'react';
import {SignInButton} from '@clerk/clerk-react'

export default function WhisperPDFLanding() {
  return (
    <div className="h-[100vh] w-full bg-gradient-to-b from-slate-600 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold text-white tracking-wider">
          WhisperPDF
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg border border-white/20 transition-all duration-300 backdrop-blur-sm">
         <SignInButton />
        </button>
      </header>

   
      <main className="flex-1 flex flex-col justify-center items-center px-8 text-center">
        <div className="max-w-4xl mx-auto">
         
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-tight">
              Whisper<span className="text-white/70">PDF</span>
            </h1>
            <p className="text-md md:text2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              Transform your documents into conversations. 
              <br />
              Simple. Elegant. Powerful.
            </p>
          </div>

      
          <div className="grid md:grid-cols-3 gap-8 mb-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="w-12 h-12 rounded-lg mb-4 mx-auto flex justify-center items-center "><FileUp size={152} color="#dbdbe1" strokeWidth={1.75} /></div>
              <h3 className="text-white text-lg font-medium mb-3">Upload</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Drop your PDF and let the magic begin
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-500">
           <div className="w-12 h-12 rounded-lg mb-4 mx-auto flex justify-center items-center "><MessageCircleDashed size={152} color="#dbdbe1" strokeWidth={1.75} /></div>
              <h3 className="text-white text-lg font-medium mb-3">Chat</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Ask questions about your document
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-500">
               <div className="w-12 h-12 rounded-lg mb-4 mx-auto flex justify-center items-center "><Target  size={152} color="#dbdbe1" strokeWidth={1.75} /></div>
              <h3 className="text-white text-lg font-medium mb-3">Discover</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Uncover insights you never knew existed
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <button className="bg-white text-slate-800 px-4 mt-5 py-1 rounded-lg font-medium text-md hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl ">
             <SignInButton   mode="modal" >
                <button className=''>
Get Started
                </button>
                </SignInButton>
            </button>
            <p className="text-white/50 text-sm">
              No credit card required • Free forever
            </p>
          </div>
        </div>
      </main>


      <footer className="px-8 py-6 text-center">
        <div className="text-white/40 text-sm">
          © 2025 WhisperPDF. Crafted with care.
        </div>
      </footer>


      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/3 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
    </div>
  );
}