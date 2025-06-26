import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Rocket, BrainCircuit, Coins, MapPin, CalendarDays, BarChart, Zap, Globe, Award, Leaf } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/application/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/job/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // AI-generated content
  const Content = {
    description: `As a ${singleJob?.title} at FutureTech Innovations, you'll be at the forefront of ${singleJob?.industry || "technology"} evolution. Work with Nobel laureates and industry pioneers to solve complex challenges in ${
      singleJob?.domain || "AI-driven solutions"
    }. Our quantum-leap projects have been featured in Nature and Forbes.`,
    perks: [
      "🚀 Equity shares & exponential growth opportunities",
      "🌐 Global relocation assistance",
      "🧠 $10k annual learning budget",
      "🏡 Hybrid work ecosystem",
      "💎 Diamond-tier health coverage"
    ],
    impact: [
      "📈 230% average team growth in 3 years",
      "🌱 Carbon-negative operations since 2020",
      "🏆 42 industry awards in 2023",
      "🤝 98% employee retention rate"
    ]
  };

  return (
    <div className="max-w-7xl mx-auto my-12 p-8 bg-gradient-to-br from-[#A7E6FF]/10 to-[#3ABEF9]/5 rounded-[2rem] shadow-2xl border border-[#3572EF]/20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-8">
        <div className="space-y-5">
          <h1 className="text-5xl font-black bg-gradient-to-r from-[#050C9C] to-[#3572EF] bg-clip-text text-transparent">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-[#050C9C] text-white hover:bg-[#050C9C]/90 px-5 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              {singleJob?.position} Immediate Openings
            </Badge>
            <Badge className="bg-[#3572EF] text-white hover:bg-[#3572EF]/90 px-5 py-2 text-sm font-medium">
              <Globe className="w-4 h-4 mr-2" />
              {singleJob?.location}
            </Badge>
            <Badge className="bg-[#3ABEF9] text-[#050C9C] hover:bg-[#3ABEF9]/90 px-5 py-2 text-sm font-medium">
              <Coins className="w-4 h-4 mr-2" />
              ₹{singleJob?.salary} LPA + Stock Options
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`group relative w-full lg:w-auto px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 overflow-hidden ${
            isApplied
              ? "bg-[#3572EF]/50 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-[#050C9C] to-[#3572EF] text-white hover:shadow-2xl hover:shadow-[#3572EF]/40"
          }`}
        >
          <span className="relative z-10 flex items-center">
            {isApplied ? (
              <>
                <Award className="w-5 h-5 mr-2" />
                Application Submitted
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2 animate-bounce" />
                Launch Your Career
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#3ABEF9] to-[#A7E6FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </Button>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-[#050C9C] via-[#3572EF] to-[#3ABEF9] rounded-full mb-12 opacity-25" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        {/* Left Column */}
        <div className="space-y-10">
          <section className="bg-white p-8 rounded-2xl shadow-xl border border-[#A7E6FF]">
            <h2 className="text-3xl font-black text-[#050C9C] mb-6 flex items-center">
              <BrainCircuit className="w-8 h-8 mr-3 text-[#3572EF] animate-pulse" />
              Quantum Leap Opportunity
            </h2>
            <p className="text-lg text-[#050C9C]/90 leading-relaxed mb-8">
              {Content.description}
            </p>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#3572EF] flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-[#3ABEF9]" />
                Sustainable Innovation Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Content.impact.map((item, index) => (
                  <div key={index} className="p-4 bg-[#A7E6FF]/10 rounded-xl border border-[#A7E6FF]">
                    <span className="text-[#050C9C]/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#050C9C] to-[#3572EF] p-8 rounded-2xl text-white shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center">
              <Coins className="w-8 h-8 mr-3 text-[#A7E6FF]" />
              Cosmic-Level Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Content.perks.map((perk, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <span className="text-[#A7E6FF]">{perk}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#A7E6FF]">
            <h3 className="text-2xl font-black text-[#050C9C] mb-6">Orbital Details</h3>
            <div className="space-y-5">
              <DetailItem 
                icon={<MapPin className="w-5 h-5 text-[#3572EF]" />}
                label="Launch Site"
                value={singleJob?.location}
              />
              <DetailItem
                icon={<CalendarDays className="w-5 h-5 text-[#3ABEF9]" />}
                label="Mission Duration"
                value={`${singleJob?.experience}+ Years Experience`}
              />
              <DetailItem
                icon={<Zap className="w-5 h-5 text-[#050C9C] animate-pulse" />}
                label="Boosters Included"
                value={`₹${singleJob?.salary} LPA + Hypergrowth Options`}
              />
              <div className="p-4 bg-[#A7E6FF]/10 rounded-xl border border-[#A7E6FF]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#3572EF]">APPLICANTS IN ORBIT</span>
                  <Globe className="w-5 h-5 text-[#3ABEF9]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#050C9C]">
                    {singleJob?.applications?.length}
                  </span>
                  <span className="text-[#3572EF] font-medium">
                    Worldwide Talent
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#A7E6FF]/20 p-8 rounded-2xl border border-[#3ABEF9] backdrop-blur-sm">
            <h3 className="text-2xl font-black text-[#050C9C] mb-4">Why Top Minds Choose Us</h3>
            <p className="text-[#3572EF] mb-6 leading-relaxed">
              "Join the 0.1% club of innovators where your work directly impacts global sustainability goals. 
              Our neurodiverse-friendly environment and exponential growth potential make this more than a job - 
              it's a legacy-building mission."
            </p>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#3572EF]/10 rounded-xl">
                <Rocket className="w-6 h-6 text-[#050C9C]" />
              </div>
              <div>
                <div className="text-lg font-black text-[#050C9C]">294%</div>
                <div className="text-sm text-[#3572EF]">Career Growth Index</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-white rounded-xl border border-[#A7E6FF] hover:bg-[#A7E6FF]/5 transition-all">
    <div className="p-2 bg-[#A7E6FF]/20 rounded-lg mr-4">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-sm font-semibold text-[#3572EF]">{label}</div>
      <div className="text-lg font-bold text-[#050C9C]">{value}</div>
    </div>
  </div>
);

export default JobDescription;