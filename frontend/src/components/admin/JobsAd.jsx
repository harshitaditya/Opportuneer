import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import JobsAdTable from './JobsAdTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Plus } from 'lucide-react'

const JobsAd = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#A7E6FF]/20 to-[#3ABEF9]/10">
            <Navbar />
            <div className='max-w-6xl mx-auto py-10 px-4'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'>
                    <div className={`relative w-full sm:w-96 transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-[#3572EF] rounded-lg' : ''}`}>
                        <Search 
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearchFocused ? 'text-[#3572EF]' : 'text-[#050C9C]/50'}`} 
                            size={18} 
                        />
                        <Input
                            className="w-full pl-10 border-2 border-[#3ABEF9] focus:border-[#3572EF] focus-visible:ring-0 transition-colors duration-200"
                            placeholder="Filter by job title, role..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        {input && (
                            <button 
                                onClick={() => setInput("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#050C9C]/50 hover:text-[#050C9C] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                    <Button 
                        className="bg-gradient-to-r from-[#050C9C] to-[#3572EF] hover:from-[#3572EF] hover:to-[#3ABEF9] text-white shadow-md hover:shadow-lg transition-all duration-300 group"
                        onClick={() => navigate("/admin/jobs/create")}
                    >
                        <span className="flex items-center gap-2">
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            Add New Job
                        </span>
                    </Button>
                </div>
                
                <div className='bg-white rounded-xl shadow-lg border border-[#3572EF]/20 overflow-hidden'>
                    <JobsAdTable />
                </div>

                {input && (
                    <div className="mt-4 text-center text-sm text-[#050C9C]/70">
                        Showing results for: <span className="font-medium text-[#050C9C]">"{input}"</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobsAd