import FileUpload from "../components/FileUpload"

function MainPage() {
  return (
    <div className='min-h-screen w-screen bg-slate-800 flex '>
        <div className='min-h-screen w-[35vw] flex items-center justify-center text-white p-4'>
            <FileUpload/>
        </div>
        <div className='min-h-screen w-[65vw] flex items-center justify-center text-white border-l-1 p-4'>2</div>
        
    </div>
  )
}

export default MainPage