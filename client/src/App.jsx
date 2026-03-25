import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import { ChatBox, Connections, CreatePost, Discover, Feed, Login, Messages, Profile,Layout } from './pages'
import {useUser, useAuth} from '@clerk/react';
import toast, {Toaster} from 'react-hot-toast'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './features/user/userSlice.js';
import { fetchConnections } from './features/connections/connectionSlice.js';
import { useRef } from 'react';
import { addMessages } from './features/messages/messagesSlice.js';
import Notification from './components/Notification.jsx';


const App = () => {
  const {user} =useUser();
  const {getToken}=useAuth();
  const dispatch=useDispatch()
  const {pathname}=useLocation();

  const pathNameRef=useRef(pathname);


  useEffect(()=>{
    const fetchData=async()=>{
      if(user){
        const token=await getToken()
        // console.log(token);
        dispatch(fetchUser(token))
        dispatch(fetchConnections(token))
      }
    }
    fetchData();
  },[user,getToken,dispatch])
  
  useEffect(()=>{
    pathNameRef.current=pathname
  },[pathNameRef])

  useEffect(()=>{
    if(user){
      const eventSource=new EventSource(import.meta.env.VITE_BASEURTL+'/api/message/'+user._id);
      eventSource.onmessage=(event)=>{
        const message=JSON.parse(event.data)

        if(pathNameRef.current===('/message'+message.from_user_id._id)){
          dispatch(addMessages(message))
        }else{
          toast.custom((t)=>(
            <Notification t={t} message={message}/>
          ),{position:'bottom-right'})
        }
        return ()=>{
          eventSource.close()
        }
      }
    }
  },[])

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={!user?<Login/>:<Layout/>}>
            <Route index element={<Feed/>}/>
            <Route path='messages' element={<Messages/>}/>
            <Route path='messages/:userId' element={<ChatBox/>}/>
            <Route path='connections' element={<Connections/>}/>
            <Route path='discover' element={<Discover/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='profile/:profileId' element={<Profile/>}/>
            <Route path='create-post' element={<CreatePost/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
