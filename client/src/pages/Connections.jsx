import { MessageSquare, UserCheck, UserPlus, UserRoundPen, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/react"
import { fetchConnections } from "../features/connections/connectionSlice"
import toast, {} from 'react-hot-toast'
import api from "../api/axios"
const Connections = () => {

  const [currentTab,setCurrentTab]=useState('followers')
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const {getToken}=useAuth();



  const {connections,pendingConnections,followers,following}=useSelector((state)=>state.connections)
  const dataArray=[
    {label:"followers",value:followers,icon:Users},
    {label:"following",value:following,icon:UserCheck},
    {label:"pending",value:pendingConnections,icon:UserRoundPen},
    {label:"connections",value:connections,icon:UserPlus},
   
  ]

  const handleUnfollow=async (userId) => {
    try {
      const {data}=await api.post('/api/user/unfollow',{id:userId},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success){
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }else{
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const acceptConnection=async (userId) => {
    try {
      const {data}=await api.post('/api/connection/accept',{id:userId},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success){
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getToken().then((token)=>{
      dispatch(fetchConnections(token))
    })
  },[])

  return (
    <section className="min-h-screen md:h-screen overflow-x-scroll no-scrollbar bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">

      {/* Title */}
       <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
            <p className='text-slate-600'>Manage your netwrok and discover new connections</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item,index)=>(
            <div key={index} className="flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white shadow rounded-md">
              <b>{item.value.length}</b>
              <p className="text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
        <div>

          {/* Tab */}
          <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm">
            {
              dataArray.map((tab)=>(
                <button key={tab.label} onClick={()=>setCurrentTab(tab.label)} className={` cursor-pointer flex items-center px-3 py-1 text-sm rounded-md transition-colors ${currentTab===tab.label?'bg-white font-medium text-black':'text-gray-500 hover:text-black'}`}>
                    <tab.icon className="w-4 h-4"/>
                    <span className="ml-1">{tab.label}</span>
                    {tab.count!==undefined && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))
            }
          </div>
        </div>

        {/* Connections */}
        <div className="flex flex-wrap gap-6 mt-6">
            {dataArray.find((item)=>item.label===currentTab).value.map((user)=>(
              <div key={user._id} className="w-full max-w-88 flex gap-5 p-6 bg-white shadow rounded-md">
                <img src={user.profile_picture} alt="" className="rounded-full w-12 h-12 shadow-md mx-auto" />
                <div className="flex-1">
                  <p className="text-slate-700 font-medium">{user.full_name}</p>
                  <p className="text-slate-500">
                    {user.username}
                  </p>
                  <p className=" text-sm text-gray-600">
                    {user.bio.slice(0,30)}...
                  </p>
                  <div className="flex max-sm:flex-col gap-2 mt-4">
                    
                      <button 
                        onClick={()=>navigate(`/profile/${user._id}`)}
                        className="w-full p-2 text-sm rounded bg-linear-to-r from-indigo-500 to-purple-600 hover:to-purple-700 active:scale-95 transition text-shite cursor-pointer">
                        View Profile
                      </button>
                    
                    {
                      currentTab==='following' && (
                        <button onClick={()=>handleUnfollow(user._id)} className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer">
                          unfollow
                        </button>
                      )
                    }

                    {
                      currentTab==='pending' && (
                        <button onClick={()=>acceptConnection(user._id)} className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer">
                          Accept
                        </button>
                      )
                    }
                    {
                      currentTab==='connections' && (
                        <button onClick={()=>navigate(`/message/${user._id}`)} className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer flex justify-center items-center gap-1">
                          <MessageSquare className="w-4 h-4"/>
                          Message 
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  )
}

export default Connections
