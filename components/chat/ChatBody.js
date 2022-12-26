import React, { useState, useEffect } from 'react'
import { getUser } from '../../services/chats.service';

const ChatBody = ({ chat, user }) => {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getUserData = async (id) => {
          try {
            const user = await getUser(id);
            setUserData(user);
          } catch (err) {
            console.error(err);
          }
        }
        if (chat?.members?.length === 2) { 
          const userId = chat?.members?.find(id => id !== user?.id);
          console.log(userId);
          if (chat !== null) getUserData(userId); console.log("ran");
        };
      }, [chat, user]);

      useEffect(() => {
        const fetchMsgs = async () => {
            try {
                
            } catch (error) {
                console.error(error);
            }
        }
      }, []);
      

  return (
    <div className="grid grid-rows-[19vh,65vh,16vh] dark:bg-[rgba(255,255,255,0.64)]">
        <div className="flex flex-col py-4 pr-4 pl-0">
            <>
                <div className="p-2 relative hover:bg-[#35caca38] dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center hover:rounded-md">
                <div className="relative flex gap-2">
                    <img src={`https://avatars.dicebear.com/api/adventurer/34.svg`} className="h-12 w-12 rounded-[50%]" />
                    <div className="text-sm flex flex-col items-start justify-center">
                    <span className='font-bold'>{ chat?.name || userData?.name }</span>
                    </div>
                </div>
                </div>
                <hr className='w-4/5 border-solid border-[#d4d2d2] dark:border-gray-400 text-center mx-auto' />
            </>
        </div>

        
    </div>
  )
}

export default ChatBody;