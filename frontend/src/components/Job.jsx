import { Bookmark } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const timeElapsed = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const daysDiff = Math.floor((currentTime - createdAt) / (1000 * 24 * 60 * 60));
    return daysDiff === 0 ? "Fresh" : `${daysDiff}d`;
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className='p-4 bg-white border border-[#B4D4FF] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full flex flex-col'>
      {/* Header Section with Full-size Avatar */}
      <div className='flex justify-between items-start mb-2 gap-2'>
        <div className='flex items-center gap-2 flex-1 min-w-0 overflow-hidden'>
          <Avatar className='flex-shrink-0 w-12 h-12'> {/* Increased size */}
            <AvatarImage 
              src={job?.company?.logo} 
              className='object-cover w-full h-full' // Changed to cover and full size
            />
          </Avatar>
          <div className='flex-1 min-w-0 overflow-hidden'>
            <h1 className='font-bold text-[#113f67] leading-tight truncate text-sm md:text-base'>
              {job?.company?.name}
            </h1>
            <p className='text-xs text-[#86B6F6] font-medium truncate'>
              {job?.location || 'Multiple Locations'}
            </p>
          </div>
        </div>
        {/* Rest of the component remains the same */}
        <div className='flex flex-col items-end gap-1 flex-shrink-0'>
          <span className='text-xs font-medium text-[#86B6F6] text-nowrap'>
            {timeElapsed(job?.createdAt)}
          </span>
          <Button 
            variant="ghost" 
            className={`p-1 hover:bg-[#B4D4FF]/20 ${isBookmarked ? 'text-[#176B87]' : 'text-[#86B6F6]'}`}
            onClick={handleBookmarkClick}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#176B87]' : 'fill-none'}`} />
          </Button>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      {/* Main Content */}
      <div className='mb-2 flex-1 overflow-hidden'>
        <h1 className='font-extrabold text-[#176B87] mb-1 line-clamp-2 leading-tight text-base md:text-lg'>
          {job?.title}
        </h1>
        <p className='text-sm text-[#113f67]/90 line-clamp-3 md:line-clamp-4 leading-snug'>
          {job?.description}
        </p>
      </div>

      {/* Opportunity Highlights */}
      <div className='flex flex-wrap gap-1.5 mb-3'>
        <Badge className="bg-[#EFF8FF] text-[#176B87] px-2 py-1 text-xs">
          👥 {job?.position}
        </Badge>
        <Badge className="bg-[#FFF0ED] text-[#f83002] px-2 py-1 text-xs">
          ⏳ {job?.jobType}
        </Badge>
        <Badge className="bg-[#EFF8FF] text-[#176B87] px-2 py-1 text-xs">
          💰 {job?.salary}LPA
        </Badge>
      </div>

      {/* Action Panel */}
      <div className='border-t border-[#B4D4FF] pt-2'>
        <div className='flex flex-col gap-2'>
          <div className='text-xs text-[#86B6F6] font-medium'>
            Apply: Immediate
          </div>
          <div className='flex flex-col xs:flex-row gap-2'>
            <Button 
              onClick={() => navigate(`/description/${job?._id}`)}
              className="text-xs px-3 py-2 border-[#B4D4FF] hover:bg-[#B4D4FF] flex-1"
            >
              Details
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#176B87] to-[#86B6F6] text-xs px-3 py-2 flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;