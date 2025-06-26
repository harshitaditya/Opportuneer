import React from "react";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const jobCards = [
  {
    title: "Frontend Developer",
    desc: "Build responsive interfaces with modern web technologies",
    skills: ["React", "JavaScript", "HTML5", "CSS3"],
    color: "bg-[#B4D4FF]"
  },
  {
    title: "Backend Developer",
    desc: "Develop server-side logic and databases",
    skills: ["Node.js", "Python", "SQL", "APIs"],
    color: "bg-[#A7E6FF]"
  },
  {
    title: "Data Scientist",
    desc: "Analyze data and build ML models",
    skills: ["Python", "Pandas", "TensorFlow", "SQL"],
    color: "bg-[#97DEFF]"
  },
  {
    title: "UI/UX Designer",
    desc: "Create user-friendly interfaces",
    skills: ["Figma", "User Research", "Wireframing"],
    color: "bg-[#86B6F6]"
  }
];

const JobSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#050C9C] mb-2">
          Career Opportunities
        </h2>
        <p className="text-[#3572EF]">Explore trending roles in tech</p>
      </div>

      <Carousel>
        <CarouselContent>
          {jobCards.map((job, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <div className={`p-6 m-2 rounded-xl ${job.color} text-[#050C9C] min-h-[250px] flex flex-col transition-shadow hover:shadow-md`}>
                <h3 className="text-xl font-semibold mb-3">{job.title}</h3>
                <p className="mb-4 text-sm text-[#050C9C]/90 flex-grow">
                  {job.desc}
                </p>
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-white text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={() => searchJobHandler(job.title)}
                  className="w-full bg-white text-[#050C9C] hover:bg-[#050C9C] hover:text-white"
                >
                  View Jobs
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="text-[#050C9C] border-[#050C9C] hover:bg-[#050C9C]/10" />
        <CarouselNext className="text-[#050C9C] border-[#050C9C] hover:bg-[#050C9C]/10" />
      </Carousel>
    </div>
  );
};

export default JobSlider;