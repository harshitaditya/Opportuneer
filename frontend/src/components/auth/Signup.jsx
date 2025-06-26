import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, User, UploadCloud, LogOut } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data.success) {
        navigate("/login");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9EEFF] to-[#97DEFF]">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="relative w-full max-w-4xl">
          {/* Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#62CDFF] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#3572EF] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float-delayed" />

          <form 
            onSubmit={handleSubmit}
            className="relative bg-[#EEF5FF] backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-[#86B6F6]/50 space-y-6 animate-fade-in min-h-[400px]"
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#050C9C] to-[#3572EF]">
                Create Account
              </h1>
              <p className="text-[#176B87] mt-2">
                Join our community in few simple steps
              </p>
            </div>

            {/* Horizontal Layout */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#176B87] font-medium">Full Name</Label>
                  <Input
                    name="fullname"
                    value={input.fullname}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="bg-[#F0F9FF] border-2 border-[#86B6F6] focus:border-[#3572EF] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#176B87] font-medium">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                    placeholder="Example@gmail.com"
                    className="bg-[#F0F9FF] border-2 border-[#86B6F6] focus:border-[#3572EF] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#176B87] font-medium">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={handleInputChange}
                    placeholder="***********"
                    className="bg-[#F0F9FF] border-2 border-[#86B6F6] focus:border-[#3572EF] rounded-xl"
                  />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-[#86B6F6]/50 my-4" />

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#176B87] font-medium">Phone Number</Label>
                  <Input
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="bg-[#F0F9FF] border-2 border-[#86B6F6] focus:border-[#3572EF] rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#176B87] font-medium">Role</Label>
                  <RadioGroup className="grid grid-cols-2 gap-3">
                    {["student", "recruiter"].map((role) => (
                      <div
                        key={role}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          input.role === role
                            ? "border-[#3572EF] bg-[#3572EF]/10"
                            : "border-[#86B6F6] hover:border-[#3572EF]/50 bg-[#F0F9FF]"
                        }`}
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={input.role === role}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <span className={`h-4 w-4 rounded-full border-2 flex items-center justify-center 
                            ${input.role === role ? "border-[#3572EF] bg-[#3572EF]" : "border-[#86B6F6]"}`}
                          >
                            {input.role === role && <span className="w-2 h-2 bg-[#F0F9FF] rounded-full" />}
                          </span>
                          <span className={`text-sm ${input.role === role ? "text-[#050C9C]" : "text-[#176B87]"}`}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#176B87] font-medium">Profile Photo</Label>
                  <label className={`group flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all
                    ${input.file ? "border-[#3572EF] bg-[#3572EF]/10" : "border-[#86B6F6] hover:border-[#3572EF] bg-[#F0F9FF]"}`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <UploadCloud className={`w-6 h-6 mb-1 ${input.file ? "text-[#3572EF]" : "text-[#86B6F6] group-hover:text-[#3572EF]"}`} />
                    <span className={`text-sm text-center ${input.file ? "text-[#050C9C]" : "text-[#176B87]"}`}>
                      {input.file ? input.file.name : "Click to upload"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-2 text-md font-semibold rounded-xl transition-all
                  ${loading 
                    ? "bg-[#86B6F6] cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#3572EF] to-[#050C9C] hover:from-[#050C9C] hover:to-[#3572EF] shadow-lg hover:shadow-[#3572EF]/30"}`}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-[#176B87] mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#050C9C] hover:text-[#3572EF] transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;