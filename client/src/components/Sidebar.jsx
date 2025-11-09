import React from 'react'
import baatchit from '/baatchit.png';
import msg from '/msg.png';
import video from '/video.png'
import settings from '/settings.png'

const Sidebar = () => {
  return (
    <div className='bg-[#333333] h-full w-16 flex flex-col items-center justify-between py-4 rounded'>

      <div className='w-full flex flex-col items-center'>
        <img src={baatchit} className='h-5 w-5' alt="Chat Icon" />
        <div className='w-[70%] border-[#6e6e6e] border-1 mt-4'></div>
        <img src={msg} className='h-6 w-6 mt-4' alt="Message Icon" />
        <img src={video} className='h-5 w-5 mt-4' alt="Video Icon" />
      </div>

      <div className='w-full flex flex-col items-center mb-4'>
        <div className='w-[70%] border-[#6e6e6e] border-1 mt-4'></div>
        <div className='p-2.5 border-1 border-white rounded-full mt-4'>

        </div>
        <img src={settings} className='h-6 w-6 mt-4' alt="Video Icon" />
      </div>
    </div>
  )
}

export default Sidebar
