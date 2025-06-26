import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faHouse,
  faBriefcase,
  faUser,
  faSignOutAlt,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { setSearchedQuery } from "@/redux/jobSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = () => {
    dispatch(setSearchedQuery(searchQuery));
    navigate("/browse");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#050C9C] font-bold"
      : "text-[#333] hover:text-[#050C9C]";

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const showSearch = location.pathname === "/" || (user && user.role === "student");

  return (
    <div className="bg-[#EEF5FF] shadow-sm">
      <div className="flex justify-between items-center max-w-10xl h-16 p-4 mx-auto">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#050C9C]">Opportuneer</h1>
            <span className="text-[#050C9C]">
              
            </span>
          </div>
        </Link>

        {/* Navigation Links and Search */}
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li className={`text-sm ${isActive("/admin/companies")}`}>
                  <Link to="/admin/companies">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faHouse} />
                    </span>
                    Companies
                  </Link>
                </li>
                <li className={`text-sm ${isActive("/admin/jobs")}`}>
                  <Link to="/admin/jobs">
                    <span className="mx-1">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </span>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <li className={`text-sm ${isActive("/")}`}>
                <Link to="/">
                  <span className="mx-1">
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  Home
                </Link>
              </li>
            )}
          </ul>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex w-64 shadow-lg border border-[#3ABEF9] pl-6 rounded-full items-center gap-4 bg-white text-black">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none border-none w-full text-gray-700"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="bg-[#3572EF] hover:bg-[#3ABEF9] rounded-e-3xl rounded-s-none text-white"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          )}

          {/* User Profile */}
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer border-2 border-[#050C9C]">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  ) : (
                    <AvatarFallback className="bg-[#050C9C] text-white">
                      {getInitials(user?.fullname)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-[#A7E6FF] border-[#050C9C]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="cursor-pointer">
                      {user?.profile?.profilePhoto ? (
                        <AvatarImage src={user?.profile?.profilePhoto} />
                      ) : (
                        <AvatarFallback className="bg-[#050C9C] text-white">
                          {getInitials(user?.fullname)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-[#050C9C]">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {user.role === "student" && (
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="w-full flex items-center gap-2 text-[#050C9C] hover:bg-[#3572EF] hover:text-white"
                        >
                          <FontAwesomeIcon icon={faUser} />
                          <span>Profile</span>
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="w-full flex items-center gap-2 text-[#050C9C] hover:bg-[#3572EF] hover:text-white"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-[#050C9C] border-[#050C9C] hover:bg-[#3572EF] hover:text-white rounded-full"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#3572EF] hover:bg-[#050C9C] text-white rounded-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;