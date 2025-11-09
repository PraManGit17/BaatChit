import React, { useEffect, useState, useRef } from 'react';
import mic from '/mic.png';
import send from '/send.png';
import { useSelector, useDispatch } from 'react-redux';
import { getSocket } from '../socket/socket';
import { setMessages, addMessage } from '../redux/MessageSlice';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const messages = useSelector(
    (state) => state.chat.messages[selectedUser?._id] || []
  );

  const [text, setText] = useState('');
  const socketRef = useRef(null);
  const chatEndRef = useRef();

  // console.log("selecteduser", selectedUser);
  // console.log("selecteduser", selectedUser?._id);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    if (!socket || !selectedUser) {

      console.log("Socket Not Connected");
      return;
    };

    socket.emit('fetch-message', { withUserId: selectedUser._id }, (res) => {
      if (res?.ok) {
        dispatch(setMessages({ userId: selectedUser._id, messages: res.message }));
      }

    });


    socket.on('receive-message', (msg) => {
      if (
        msg.sender._id === selectedUser._id ||
        msg.receiver === selectedUser._id
      ) {
        dispatch(addMessage({ userId: selectedUser._id, message: msg }));
      }

    });

    return () => {
      socket.off('receive-message');
    };
  }, [selectedUser, dispatch]);

  const handleSend = () => {
    if (!text.trim()) return;
    const socket = socketRef.current;
    const tempId = Date.now();

    socket.emit(
      'send-message',
      { to: selectedUser._id, text, tempId },
      (res) => {
        if (res?.ok) {
          dispatch(addMessage({ userId: selectedUser._id, message: res.message }));
        }

        // console.log("Message send", text);
        // console.log(res);
      }
    );

    setText('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedUser)
    return (
      <div className='shadow-sm shadow-gray-100 text-xl w-full h-full rounded-2xl bg-[#2B2B2B] flex items-center justify-center text-white poppins-medium'>
        Select a user to start chatting 💬
      </div>
    );

  console.log(messages)


  return (
    <div className='shadow-sm shadow-gray-100 w-full h-full rounded-2xl bg-[#2B2B2B] flex flex-col items-center text-white poppins-medium'>

      <div className='py-4 flex items-center gap-1 w-[95%] border-b-2 border-gray-300'>
        <div className='p-5 border-2 border-white rounded-full ml-2'></div>
        <div className='flex items-baseline justify-between w-full px-4'>
          <div className='text-lg font-bold'>{selectedUser.name}</div>
        </div>
      </div>

      <div className="py-4 px-8 flex flex-col gap-2 w-[95%] h-[550px] overflow-y-auto border-b-2 border-gray-300 scrollbar-hide">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[400px] px-4 py-1 rounded-md poppins-regular font-medium ${(msg.sender?._id || msg.sender) === selectedUser._id
              ? 'bg-[#1C1C1C] self-start'
              : 'bg-[#444444] self-end'} `}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>



      <div className='flex items-center justify-start gap-3 w-[95%] mt-4 mb-4'>
        <input
          className='bg-[#444444] py-2 px-3 rounded-lg w-full outline-none'
          placeholder='Type Something...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className='p-2.5 rounded-full bg-[#444444] flex items-center justify-center'
        >
          <img src={send} className='h-4' />
        </button>
      </div>

    </div>
  );
};

export default ChatContainer;
