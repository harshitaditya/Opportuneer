import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const generateAIText = (job) => {
  const skills = job.requiredSkills?.slice(0, 3) || [];
  const experience = job.experience || "0";
  
  return {
    highlight: `Urgent opening for ${job.role || 'this position'} (${experience}+ years)`,
    tip: skills.length > 0 
      ? `Key skills: ${skills.join(', ')}` 
      : "Highlight problem-solving skills in applications"
  };
};

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#EEF5FF]">
      <h1 className="text-4xl font-bold mb-12 text-center">
        <span className="text-[#050C9C]">Latest</span> 
        <span className="text-[#3572EF] mx-4">&</span> 
        <span className="text-[#3ABEF9]">Trending</span> Opportunities
      </h1>

      {!allJobs || allJobs.length === 0 ? (
        <div className="text-center p-8 rounded-xl bg-[#C9EEFF] animate-pulse">
          <p className="text-[#050C9C] text-lg font-medium">
            🕒 Loading exciting opportunities...
          </p>
        </div>
      ) : (
        <Carousel 
          className="w-full relative"
          onSlideChange={setActiveIndex}
        >
          <CarouselContent>
            {allJobs.slice(0, 6).map((job, index) => {
              const aiContent = generateAIText(job);
              return (
                <CarouselItem key={job._id || index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="m-4 p-6 rounded-xl transition-all duration-300 bg-gradient-to-br from-[#3ABEF9] to-[#41C9E2] hover:shadow-xl hover:scale-105">
                    <div className="mb-4 border-b-2 border-[#3572EF] pb-4">
                      <JobCard job={job} />
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-[#050C9C]">
                        {aiContent.highlight}
                      </p>
                      <p className="text-xs font-medium text-[#3572EF] bg-[#ACE2E1]/30 p-2 rounded">
                        {aiContent.tip}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <CarouselPrevious className="bg-[#3572EF] text-white hover:bg-[#050C9C]" />
          <CarouselNext className="bg-[#3572EF] text-white hover:bg-[#050C9C]" />
          
          <div className="flex justify-center mt-6 space-x-2">
            {allJobs.slice(0, 6).map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-2 rounded-full transition-all ${
                  activeIndex === idx 
                    ? 'bg-[#3572EF] w-12' 
                    : 'bg-[#C9EEFF]'
                }`}
              />
            ))}
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default LatestJobs;