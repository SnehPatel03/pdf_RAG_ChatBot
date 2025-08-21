import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-slat-700">
      
      <SignedOut>
        <div className="flex items-center justify-center w-full h-full bg-slate-800">
          <SignIn  />
        </div>
      </SignedOut>


      <SignedIn>
        <MainPage/>
      </SignedIn>
    </div>
  );
}
