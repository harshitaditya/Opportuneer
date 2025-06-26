import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from '@/FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        const filteredJobs = allJobs.filter((job) => {
            const lowerQuery = searchedQuery.toLowerCase();
            return (
                (job.title?.toLowerCase().includes(lowerQuery)) ||
                (job.description?.toLowerCase().includes(lowerQuery)) ||
                (job.location?.toLowerCase().includes(lowerQuery))
            );
        });
        setFilterJobs(searchedQuery ? filteredJobs : allJobs);
    }, [allJobs, searchedQuery]);

    return (
        <div className='bg-[#EEF5FF] min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Main Content Container */}
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Filter Card - Left Side */}
                    <div className='lg:w-80 lg:sticky lg:top-8 lg:h-fit'>
                        <FilterCard />
                    </div>

                    {/* Jobs List - Right Side */}
                    <div className='flex-1'>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-bold text-[#050C9C]'>
                                {filterJobs.length} Job{filterJobs.length !== 1 ? 's' : ''} Found
                            </h2>
                        </div>

                        {/* Jobs Grid */}
                        {filterJobs.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full'>
                                {filterJobs.map((job) => (
                                    <Job 
                                        key={job._id} 
                                        job={job}
                                        className='hover:transform hover:scale-[1.02] transition-transform duration-200'
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-12'>
                                <div className='text-6xl mb-4 text-[#3ABEF9]'>🧐</div>
                                <span className='text-xl text-[#050C9C]'>
                                    No jobs match your criteria
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;