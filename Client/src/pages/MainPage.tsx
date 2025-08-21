import ChatPage from "../components/ChatPage"
import FileUpload from "../components/FileUpload"

function MainPage() {
  return (
    <div className='min-h-screen w-screen bg-slate-800 flex overflow-hidden '>
        <div className='min-h-screen w-[35vw] flex items-center justify-center text-white p-4'>
            <FileUpload/>
        </div>
        <div className='min-h-screen w-[65vw]  text-white border-l-1 px-4 py-4 bg-slate-800'>
          <ChatPage/>
        </div>
        
    </div>
  )
}

export default MainPage