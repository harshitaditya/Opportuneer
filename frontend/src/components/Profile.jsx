import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Download } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileBox from "./UpdateProfileBox";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const [avatarHover, setAvatarHover] = useState(false);

  // New color definitions
  const colors = {
    primary: "rgb(14, 116, 144)",       // Deep teal
    secondary: "rgb(224, 242, 254)",    // Light sky
    accent: "rgb(56, 189, 248)",        // Bright sky
    text: "rgb(3, 44, 56)",            // Dark teal
    hover: "rgba(14, 116, 144, 0.1)"   // Subtle hover
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary }}>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Column - Profile Section */}
          <section 
            className="w-full md:w-1/3 lg:w-1/4 h-fit sticky top-8"
            style={{
              backgroundColor: "white",
              border: `2px solid ${colors.primary}`,
              borderRadius: "1rem",
              boxShadow: `0 4px 20px -10px ${colors.accent}`
            }}
          >
            <div className="p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col items-center">
                <div 
                  className="relative cursor-pointer mb-4"
                  onMouseEnter={() => setAvatarHover(true)}
                  onMouseLeave={() => setAvatarHover(false)}
                  onClick={() => setOpen(true)}
                >
                  <Avatar className="h-32 w-32 transition-transform duration-300 hover:scale-105 border-2 border-primary">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                      className={`transition-opacity duration-300 ${avatarHover ? "opacity-80" : ""}`}
                    />
                  </Avatar>
                  <div 
                    className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-b from-primary/40 to-primary/60 transition-opacity duration-300 ${avatarHover ? "opacity-100" : "opacity-0"}`}
                  >
                    <Pen className="text-white" size={28} />
                  </div>
                </div>
                <h1 
                  className="text-2xl font-bold text-center mb-2"
                  style={{ color: colors.primary }}
                >
                  {user.fullname}
                </h1>
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-primary/10 border-primary"
                  style={{ color: colors.primary }}
                  onClick={() => setOpen(true)}
                >
                  <Pen size={18} className="mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-primary/5">
                  <Mail size={20} style={{ color: colors.primary }} />
                  <span style={{ color: colors.text }}>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-primary/5">
                  <Contact size={20} style={{ color: colors.primary }} />
                  <span style={{ color: colors.text }}>
                    {user.phoneNumber || "Not provided"}
                  </span>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills?.length ? (
                    user.profile.skills.map((skill, index) => (
                      <Badge 
                        key={index}
                        className="px-3 py-1.5 text-sm border-primary/30"
                        style={{
                          backgroundColor: colors.secondary,
                          color: colors.primary
                        }}
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm" style={{ color: colors.text }}>
                      No skills added
                    </p>
                  )}
                </div>
              </div>

              {/* Resume Section */}
              <div className="space-y-3">
                <Label className="font-semibold" style={{ color: colors.primary }}>
                  Resume
                </Label>
                <div>
                  {user?.profile?.resume ? (
                    <a
                      href={user.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 group"
                      style={{ color: colors.text }}
                    >
                      <div className="p-2 rounded-full transition-all duration-300 group-hover:bg-primary/5">
                        <Download 
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-y-1"
                          style={{ color: colors.primary }}
                        />
                      </div>
                      <span className="text-sm underline-offset-4 group-hover:underline">
                        View Resume
                      </span>
                    </a>
                  ) : (
                    <p className="text-sm" style={{ color: colors.text }}>
                      No resume uploaded
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Right Column - Job Applications */}
          <section 
            className="flex-1 bg-white"
            style={{
              border: `2px solid ${colors.primary}`,
              borderRadius: "1rem",
              boxShadow: `0 4px 20px -10px ${colors.accent}`
            }}
          >
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  Job Applications
                </h2>
                <p className="text-sm mt-1" style={{ color: colors.text }}>
                  Track your job applications and their status
                </p>
              </div>
              <AppliedJobTable 
                accentColor={colors.primary}
                textColor={colors.text}
                hoverColor={colors.hover}
              />
            </div>
          </section>
        </div>
      </main>

      <UpdateProfileBox open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;