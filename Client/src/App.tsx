import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      
      <SignedOut>
        <div className="flex items-center justify-center w-full h-full">
          <SignIn  />
        </div>
      </SignedOut>


      <SignedIn>
        <MainPage/>
      </SignedIn>
    </div>
  );
}
