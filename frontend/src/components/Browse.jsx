import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Sparkles } from 'lucide-react';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(state => state.job || {});
  const dispatch = useDispatch();

  const Content = {
    welcome: "Discover Your Next Career Move",
    description: "Explore curated tech opportunities matching your skills and ambitions.Our smart matching system helps you find the perfect fit in the digital landscape.",
    tips: [
      "Pro Tip: Use keyword filters to narrow down developer roles",
      "Did you know? Recruiters prioritize profiles with detailed skill listings",
      "Hot Trend: Full-stack roles seeing 30% more applications this month"
    ]
  };

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A7E6FF] to-white">
      <Navbar/>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* AI-Powered Header */}
        <div className='mb-8 p-6 rounded-xl bg-gradient-to-r from-[#3572EF] to-[#3ABEF9] text-white'>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-yellow-400" />
            <h1 className='text-2xl font-bold'>{Content.welcome}</h1>
          </div>
          <p className='text-[#A7E6FF]'>{Content.description}</p>
          
          {/* AI Tips Carousel */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {Content.tips.map((tip, index) => (
              <div key={index} className="flex-shrink-0 px-4 py-2 bg-white/10 rounded-full">
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className='text-2xl font-bold text-[#3572EF]'>
            Matching Opportunities
            <span className="ml-2 text-[#3ABEF9]">({allJobs?.length})</span>
          </h2>
          <div className="text-[#3572EF]">
            <span className="text-sm bg-[#A7E6FF] px-3 py-1 rounded-full">
            Sorted by relevance
            </span>
          </div>
        </div>

        {/* Job Grid */}
        {allJobs?.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allJobs.map((job) => (
              <Job 
                key={job._id} 
                job={job}
                className="hover:border-[#3ABEF9] transition-colors"
                accentColor="#3572EF"
                secondaryColor="#3ABEF9"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 text-[#3ABEF9]">🧐</div>
            <h3 className="text-xl text-[#3572EF] mb-2">
              No matches found - try broadening your search!
            </h3>
            <p className="text-[#3572EF]/80">
            We suggest checking: Full-stack, Remote, or Junior roles…
            </p>
          </div>
        )}

        {/* Loading State */}
        {!allJobs && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#A7E6FF]/20 animate-pulse">
                <div className="h-4 bg-[#3ABEF9]/30 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-[#3ABEF9]/30 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-[#3ABEF9]/30 rounded mb-4 w-2/3"></div>
                <div className="h-8 bg-[#3572EF]/30 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse