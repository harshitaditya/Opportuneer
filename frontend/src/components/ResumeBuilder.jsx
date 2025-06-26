import React, { useState } from "react";
import { saveAs } from "file-saver";
import { toPng, toBlob } from "html-to-image";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = async () => {
    const resumeElement = document.getElementById("resume");
    if (resumeElement) {
      try {
        const blob = await toBlob(resumeElement);
        saveAs(blob, "resume.png");
      } catch (error) {
        console.error("Error downloading resume:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF5FF] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#176B87] text-center mb-8">
          Simple Resume Builder
        </h1>

        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-[#176B87] mb-6">
            Enter Your Details
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
            />
            <textarea
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
              rows="3"
            />
            <textarea
              name="experience"
              placeholder="Work Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
              rows="3"
            />
            <textarea
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-3 border border-[#B4D4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86B6F6]"
              rows="3"
            />
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#176B87] mb-6">
            Resume Preview
          </h2>
          <div id="resume" className="p-6 border border-[#B4D4FF] rounded-lg">
            <h2 className="text-3xl font-bold text-[#176B87] mb-4">
              {formData.name || "Your Name"}
            </h2>
            <div className="text-[#34495e] space-y-2">
              <p>{formData.email || "Email"}</p>
              <p>{formData.phone || "Phone Number"}</p>
              <p>{formData.address || "Address"}</p>
            </div>

            <hr className="my-6 border-[#B4D4FF]" />

            <h3 className="text-2xl font-semibold text-[#176B87] mb-4">
              Education
            </h3>
            <p className="text-[#34495e] whitespace-pre-line">
              {formData.education || "Enter your education details"}
            </p>

            <hr className="my-6 border-[#B4D4FF]" />

            <h3 className="text-2xl font-semibold text-[#176B87] mb-4">
              Experience
            </h3>
            <p className="text-[#34495e] whitespace-pre-line">
              {formData.experience || "Enter your work experience"}
            </p>

            <hr className="my-6 border-[#B4D4FF]" />

            <h3 className="text-2xl font-semibold text-[#176B87] mb-4">
              Skills
            </h3>
            <p className="text-[#34495e] whitespace-pre-line">
              {formData.skills || "Enter your skills"}
            </p>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="mt-6 bg-[#176B87] text-white px-6 py-3 rounded-lg hover:bg-[#86B6F6] transition-colors"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;