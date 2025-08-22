import { SignedIn, SignedOut } from "@clerk/clerk-react";

import MainPage from "./pages/MainPage";
import WhisperPDFLanding from "./pages/WhisperPDFLanding";

export default function App() {
  return (
    <div >
      
      <SignedOut>
        <WhisperPDFLanding />
      </SignedOut>


      <SignedIn>
        <MainPage/>
      </SignedIn>
    </div>
  );
}
