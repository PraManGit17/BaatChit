import React from 'react'
import { Search } from 'lucide-react'


const ChatList = () => {
  return (
    <div className='h-full w-120 flex flex-col items-center rounded py-2'>
      <div className='w-full bg-white rounded py-2 px-4 shadow-sm shadow-gray-600 flex items-center gap-2'>
        <Search size={17} className='text-gray-400 font-medium' />
        <div className='text-lg text-gray-400'>Search....</div>
      </div>

      <div className='w-full h-full flex flex-col gap-2 mt-8'>
        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>

        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>

        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>

        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>

        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>

        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>

        <div className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1'>
          <div className='p-5 border-2 rounded-full  ml-2'></div>
          <div className='flex items-baseline justify-between w-full px-4'>
            <div className='text-lg font-bold'>John Doe</div>
            <div className='text-sm font-medium text-gray-500'>12:00</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatList
