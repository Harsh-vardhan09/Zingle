import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets';
import { Section } from 'lucide-react';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';

const Feed = () => {
  const [feed,setFeed]=useState([]);
  const [loading,setLoading]=useState(true)

  const fetchFeed=async()=>{
    setFeed(dummyPostsData);
    setLoading(false);
  }
  useEffect(()=>{
    fetchFeed();
  },[])


  return !loading ? (
    <section className='h-full overflow-x-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories and post list */}
      <div>
        <StoriesBar/>
        <div className='p-4 space-y-6'>
          list of post
        </div>
      </div>
      {/* Right sidebar */}
      <div>
        <div>
          <h1>Sponsored</h1>
        </div>
        <h1>Recent Messages</h1>
      </div>

    </section>
  ):
  <Loading/>
}

export default Feed
