import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatList from '../components/ChatList'
import ChatContainer from '../components/ChatContainer'

const ChatPage = () => {
  return (
    <div className='bg-[#1C1C1C] h-screen w-full px-3 py-4 flex items-center gap-2'>
      <Sidebar />
      <ChatList />
      <ChatContainer />
    </div>
  )
}

export default ChatPage
