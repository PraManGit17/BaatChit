import React from 'react'
import mic from '/mic.png'
import send from '/send.png'

const ChatContainer = () => {
  return (
    <div className=' shadow-sm shadow-gray-600 w-[70%] h-full rounded-2xl bg-white flex flex-col items-center'>

      <div className='py-4 flex items-center gap-1 w-[95%] border-b-2 border-gray-300'>
        <div className='p-5 border-2 rounded-full  ml-2'></div>
        <div className='flex items-baseline justify-between w-full px-4'>
          <div className='text-lg font-bold'>John Doe</div>
        </div>
      </div>

      <div className='py-4 flex flex-col gap-2 w-[95%] h-[550px] border-b-2 border-gray-300'>
          <div className='max-w-[400px] bg-gray-200 px-4 py-2 rounded-tr-xl rounded-br-xl rounded-bl-xl font-medium'>
              Hi Hello
          </div>
      </div>

      <div className='flex items-center justify-center gap-3 w-[95%] mt-4 '>
        <img src={mic} className='h-6 bg-white' />
        <div className='bg-gray-100 border-2 py-1 px-2 rounded-lg w-[90%]'>
          <div className='font-medium text-gray-400'>Type Something....</div>
        </div>
        <div className='p-2 rounded-full bg-black flex items-center justify-center'>
          <img src={send} className='h-4'/>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
