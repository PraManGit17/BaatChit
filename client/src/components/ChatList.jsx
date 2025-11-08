import React, { useEffect } from 'react'
import { Search, User } from 'lucide-react'
import { usersList } from '../api/message.js'
import { setUsers, selectUser } from '../redux/MessageSlice.jsx'
import { useDispatch, useSelector } from 'react-redux'

const ChatList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);
  const loggedUser = useSelector((state) => state.auth.user);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await usersList();
        dispatch(setUsers(res));

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) => user._id !== loggedUser?._id
  );

  // console.log("The Users", users)
  // console.log("The Logged In User: ", loggedUser);
  return (
    <div className='h-full w-120 flex flex-col items-center rounded py-2'>
      <div className='w-full bg-white rounded py-2 px-4 shadow-sm shadow-gray-600 flex items-center gap-2'>
        <Search size={17} className='text-gray-400 font-medium' />
        <div className='text-lg text-gray-400'>Search....</div>
      </div>

      <div className='w-full h-full flex flex-col gap-2 mt-8'>
        {filteredUsers.map(user => (
          <div
            key={user._id}
            className='w-full bg-white rounded py-4 shadow-sm shadow-gray-600 flex gap-1 cursor-pointer hover:bg-gray-100'
            onClick={() => dispatch(selectUser(user))}
          >
            <div className='p-5 border-2 rounded-full ml-2'></div>
            <div className='flex items-baseline justify-between w-full px-4'>
              <div className='text-lg font-bold'>{user.name}</div>
              <div className='text-sm font-medium text-gray-500'>12:00</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
