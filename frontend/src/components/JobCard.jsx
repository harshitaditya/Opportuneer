import React, { useState } from 'react';
import { Badge } from './ui/badge';

const JobCard = ({ job }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`relative border rounded-xl p-6 transition-all duration-300 cursor-pointer
        bg-[#EEF5FF] hover:bg-[#B4D4FF] group overflow-hidden
        shadow-sm hover:shadow-lg transform hover:-translate-y-1
        border-[#B4D4FF] hover:border-[#86B6F6]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover effect background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#B4D4FF]/20 to-[#86B6F6]/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className='flex items-center gap-4 mb-4 relative z-10'>
        <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-[#86B6F6]'>
          <img 
            src={imageError ? 'https://via.placeholder.com/50' : (job?.company?.logo || 'https://via.placeholder.com/50')} 
            alt={job?.company?.name}
            className='w-full h-full object-cover'
            onError={() => setImageError(true)}
          />
        </div>
        <div>
          <h2 className='text-xl font-semibold text-[#176B87]'>{job?.company?.name}</h2>
          <p className='text-sm text-[#86B6F6]'>{job?.location || 'Location Not Specified'}</p>
        </div>
      </div>

      <div className='mb-4 relative z-10'>
        <h3 className='text-lg font-bold text-[#113f67] mb-2'>{job?.title || 'Open Position'}</h3>
        <p className='text-sm text-[#176B87] line-clamp-3'>
          {job?.description || 'Exciting opportunity at a growing company'}
        </p>
      </div>

      <div className='flex flex-wrap gap-2 relative z-10'>
        <Badge 
          className='bg-[#B4D4FF] text-[#113f67] hover:bg-[#86B6F6] transition-colors'
          variant='secondary'
        >
          {job?.position || 'N/A'} Positions
        </Badge>
        <Badge 
          className='bg-[#FFE4DC] text-[#d61a6e] hover:bg-[#FFD1C4] transition-colors'
          variant='secondary'
        >
          {job?.jobType || 'Full-time'}
        </Badge>
        <Badge 
          className='bg-[#C8E6FF] text-[#176B87] hover:bg-[#B4D4FF] transition-colors'
          variant='secondary'
        >
          {job?.salary || 'Competitive'} LPA
        </Badge>
      </div>

      {/* Quick Apply Button - Appears on Hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-12 bg-[#176B87] 
        flex items-center justify-center transition-all duration-300
        ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
        <button 
          className='text-white font-medium hover:text-[#B4D4FF] transition-colors'
          onClick={(e) => {
            e.stopPropagation();
            // Handle quick apply logic
          }}
        >
          Quick Apply →
        </button>
      </div>
    </div>
  );
};

export default JobCard;