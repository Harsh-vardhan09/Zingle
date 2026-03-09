import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { ChatBox, Connections, CreatePost, Discover, Feed, Login, Messages, Profile,Layout } from './pages'
import {useUser} from '@clerk/react';


const App = () => {
  const {user} =useUser();
  return (
    <>
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
